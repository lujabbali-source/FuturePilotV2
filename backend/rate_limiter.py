"""Limitador de tasa en memoria, por proceso, ventana deslizante.

Pensado para el deployment actual: un solo proceso de uvicorn. Si el
proyecto escala a multiples workers o multiples maquinas, este limitador
deja de ser efectivo (cada proceso cuenta sus propios intentos por
separado) y hay que reemplazarlo por un backend compartido - Redis con
`INCR`+`EXPIRE` es el reemplazo estandar, sin cambiar la forma de
`RateLimiter.check()` que usan las rutas.
"""

from __future__ import annotations

import time
from collections import defaultdict, deque
from threading import Lock

from fastapi import HTTPException, Request, status


class RateLimiter:
    def __init__(self, max_requests: int, window_seconds: int):
        self.max_requests = max_requests
        self.window_seconds = window_seconds
        self._hits: dict[str, deque] = defaultdict(deque)
        self._lock = Lock()

    def check(self, key: str) -> None:
        now = time.monotonic()
        with self._lock:
            hits = self._hits[key]
            while hits and now - hits[0] > self.window_seconds:
                hits.popleft()
            if len(hits) >= self.max_requests:
                retry_after = int(self.window_seconds - (now - hits[0])) + 1
                raise HTTPException(
                    status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                    detail="Demasiados intentos. Intenta de nuevo en unos minutos.",
                    headers={"Retry-After": str(retry_after)},
                )
            hits.append(now)


def client_ip(request: Request) -> str:
    # X-Forwarded-For solo es confiable detras de un proxy/load balancer
    # propio que lo establezca (nginx, un ALB) - si el deployment no tiene
    # eso, cualquiera podria falsificarlo para evadir el limite. Ajustar
    # esta funcion si el proxy real usa otro header (ej. X-Real-IP).
    forwarded = request.headers.get("x-forwarded-for")
    if forwarded:
        return forwarded.split(",")[0].strip()
    return request.client.host if request.client else "unknown"

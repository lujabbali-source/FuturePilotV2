"""Registro, login, sesiones, rate limiting y recuperacion de contraseña."""


def test_register_and_login(client):
    r = client.post(
        "/api/v1/auth/register",
        json={"is_minor": False, "accepted_terms": True, "email": "auth-basic@example.com", "password": "password123", "name": "Ana"},
    )
    assert r.status_code == 201
    body = r.json()
    assert body["success"] is True
    assert body["user"]["is_admin"] is False
    assert "token" in body

    r = client.post("/api/v1/auth/login", json={"email": "auth-basic@example.com", "password": "password123"})
    assert r.status_code == 200
    assert r.json()["token"]


def test_duplicate_email_rejected(client):
    client.post("/api/v1/auth/register", json={"is_minor": False, "accepted_terms": True, "email": "dup@example.com", "password": "password123"})
    r = client.post("/api/v1/auth/register", json={"is_minor": False, "accepted_terms": True, "email": "dup@example.com", "password": "password123"})
    assert r.status_code == 409


def test_wrong_password_rejected(client):
    client.post("/api/v1/auth/register", json={"is_minor": False, "accepted_terms": True, "email": "wrongpw@example.com", "password": "password123"})
    r = client.post("/api/v1/auth/login", json={"email": "wrongpw@example.com", "password": "nope12345"})
    assert r.status_code == 401


def test_me_requires_valid_token(client, register_and_login):
    user, headers = register_and_login()
    r = client.get("/api/v1/auth/me", headers=headers)
    assert r.status_code == 200
    assert r.json()["user"]["id"] == user["id"]

    r = client.get("/api/v1/auth/me")
    assert r.status_code == 401

    r = client.get("/api/v1/auth/me", headers={"Authorization": "Bearer not-a-real-token"})
    assert r.status_code == 401


def test_logout_invalidates_session(client, register_and_login):
    _, headers = register_and_login()
    r = client.post("/api/v1/auth/logout", headers=headers)
    assert r.status_code == 200

    r = client.get("/api/v1/auth/me", headers=headers)
    assert r.status_code == 401


def test_login_rate_limit_blocks_after_threshold(client):
    email = "rate-limit-target@example.com"
    codes = []
    for _ in range(15):
        r = client.post("/api/v1/auth/login", json={"email": email, "password": "wrong"})
        codes.append(r.status_code)
    assert 429 in codes
    assert codes.count(401) <= 10


def test_forgot_password_never_reveals_account_existence(client, monkeypatch, app_module):
    client.post("/api/v1/auth/register", json={"is_minor": False, "accepted_terms": True, "email": "reset-target@example.com", "password": "OldPass123"})

    captured = {}

    def fake_send_email(to_email, subject, body):
        captured["body"] = body
        return False

    monkeypatch.setattr(app_module.mailer, "send_email", fake_send_email)

    r1 = client.post("/api/v1/auth/forgot-password", json={"email": "nobody-here@example.com"})
    r2 = client.post("/api/v1/auth/forgot-password", json={"email": "reset-target@example.com"})
    assert r1.status_code == r2.status_code == 200
    assert r1.json()["detail"] == r2.json()["detail"]
    assert "body" in captured


def test_reset_password_full_cycle(client, monkeypatch, app_module):
    import re

    client.post("/api/v1/auth/register", json={"is_minor": False, "accepted_terms": True, "email": "reset-cycle@example.com", "password": "OldPass123"})

    captured = {}
    monkeypatch.setattr(
        app_module.mailer, "send_email",
        lambda to_email, subject, body: captured.update(body=body) or False,
    )
    client.post("/api/v1/auth/forgot-password", json={"email": "reset-cycle@example.com"})
    token = re.search(r"token=([\w-]+)", captured["body"]).group(1)

    # token invalido no funciona
    r = client.post("/api/v1/auth/reset-password", json={"token": "bad-token", "new_password": "NewPass456"})
    assert r.status_code == 400

    # token real funciona
    r = client.post("/api/v1/auth/reset-password", json={"token": token, "new_password": "NewPass456"})
    assert r.status_code == 200

    # password vieja ya no sirve, la nueva si
    assert client.post("/api/v1/auth/login", json={"email": "reset-cycle@example.com", "password": "OldPass123"}).status_code == 401
    assert client.post("/api/v1/auth/login", json={"email": "reset-cycle@example.com", "password": "NewPass456"}).status_code == 200

    # el token es de un solo uso
    r = client.post("/api/v1/auth/reset-password", json={"token": token, "new_password": "AnotherPass789"})
    assert r.status_code == 400

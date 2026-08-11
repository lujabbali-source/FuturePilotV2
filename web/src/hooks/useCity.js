import { useEffect, useMemo, useState } from "react";
import { getCitySummary, loadCity } from "../services/cityService";

export default function useCity(cityId) {
    const summary = useMemo(
        () => (cityId ? getCitySummary(cityId) : null),
        [cityId]
    );
    const [result, setResult] = useState({ cityId: null, city: null, error: null });

    useEffect(() => {
        if (!cityId) return undefined;

        let isCurrent = true;

        loadCity(cityId)
            .then((city) => {
                if (isCurrent) setResult({ cityId, city, error: null });
            })
            .catch((error) => {
                if (isCurrent) setResult({ cityId, city: null, error });
            });

        return () => { isCurrent = false; };
    }, [cityId]);

    const hasLoadedCity = result.cityId === cityId;

    return {
        city: hasLoadedCity ? result.city : summary,
        isLoading: Boolean(cityId) && !hasLoadedCity,
        error: hasLoadedCity ? result.error : null
    };
}

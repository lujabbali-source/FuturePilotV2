import { getCities, getCitySummary, loadCity } from "../cityService";
import colombia from "../../database/countries/colombia/country";

export function getCountry(id) {
    return id === colombia.id ? colombia : null;
}

export { getCities, getCitySummary, loadCity };

export function getCity(cityId) {
    return getCitySummary(cityId);
}

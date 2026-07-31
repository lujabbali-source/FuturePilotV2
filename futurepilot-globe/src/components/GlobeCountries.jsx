import countries from "../../public/geo/countries-110m.json";
import LocationPoint from "./LocationPoint";

export default function GlobeCountries() {

  console.log(countries);

  const cities = [
    {
      name: "Bogotá",
      lat: 4.711,
      lng: -74.0721,
    },
    {
      name: "New York",
      lat: 40.7128,
      lng: -74.0060,
    },
    {
      name: "Tokyo",
      lat: 35.6762,
      lng: 139.6503,
    },
    {
      name: "Sydney",
      lat: -33.8688,
      lng: 151.2093,
    },
  ];

  return (
    <>
      {cities.map((city) => (
        <LocationPoint
          key={city.name}
          lat={city.lat}
          lng={city.lng}
        />
      ))}
    </>
  );
}
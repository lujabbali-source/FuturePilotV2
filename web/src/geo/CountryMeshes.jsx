import { world } from "../geo/world";
import CountryMesh from "./CountryMesh";

export default function CountryMeshes({

    selectedCountry,
    onSelect,
    hoveredCountry,
    onHover

}) {

    return (

        <>

            {world.features.map((country, index) => (

                <CountryMesh

                    key={country.id || index}

                    country={country}

                    index={index}

                    selectedCountry={selectedCountry}

                    onSelect={onSelect}

                    hoveredCountry={hoveredCountry}

                    onHover={onHover}

                />

            ))}

        </>

    );

}
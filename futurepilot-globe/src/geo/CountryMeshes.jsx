import { world } from "../geo/world";
import CountryMesh from "./CountryMesh";

export default function CountryMeshes({

    selectedCountry,
    onSelect

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

                />

            ))}

        </>

    );

}
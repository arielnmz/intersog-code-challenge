import {
  FAVORABLE_MATCHUP_KEY,
  SERVER_URL,
  UnFAVORABLE_MATCHUP_KEY,
} from "@/definitions";
import PokemonDetails from "@/app/ui/pokemon-details";
import PokemonMatchups from "@/app/ui/pokemon-matchups";

async function getPokemonDetails(slug: string) {
  const res = await fetch(`${SERVER_URL}/api/pokemon/${slug}/`);

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch pokemon details");
  }

  return res.json();
}
export default async function Page({ params }: { params: { slug: string } }) {
  const pokemonDetails = await getPokemonDetails(params.slug);

  const pokemonType = pokemonDetails.result.types[0].type.name;

  return (
    <div>
      {(pokemonDetails.errors && (
        <p className="text-red-800">
          Error fetching pokemon! {pokemonDetails.errors}
        </p>
      )) || (
        <div>
          <PokemonDetails details={pokemonDetails.result} />
          <div className="flex flex-row items-start justify-between">
            <PokemonMatchups
              typeName={pokemonType}
              matchupType={FAVORABLE_MATCHUP_KEY}
            />
            <PokemonMatchups
              typeName={pokemonType}
              matchupType={UnFAVORABLE_MATCHUP_KEY}
            />
          </div>
        </div>
      )}
    </div>
  );
}

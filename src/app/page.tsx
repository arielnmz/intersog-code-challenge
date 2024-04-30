import Link from "next/link";
import { PokemonResponse, SERVER_URL } from "@/definitions";

async function getPokemon(): Promise<PokemonResponse> {
  const res = await fetch(`${SERVER_URL}/api/pokemon/`);

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch pokemon");
  }

  return res.json();
}

export default async function Home() {
  const pokemon = await getPokemon();

  return (
    <main className="flex-col space-y-5 items-start">
      <p>Select pokemon from the list below to see its details.</p>

      {(pokemon.errors && (
        <p className="text-red-800">Error fetching pokemon! {pokemon.errors}</p>
      )) || (
        <div>
          <ul>
            {pokemon.result.map((poke: any) => (
              <li key={poke.slug} className="capitalize hover:text-gray-500">
                <Link href={`/pokemon/${poke.slug}/`}>{poke.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}

import { getgen3StartersSlugs, getPokemonDetails } from "@/dal";

export async function GET() {
  // Fetch some starter pokemon
  const starterSlugs = await getgen3StartersSlugs();

  const pokemonInfo = [];

  try {
    for await (const pokemon of getPokemonDetails(starterSlugs)) {
      pokemonInfo.push(pokemon);
    }

    return Response.json({
      errors: null,
      result: pokemonInfo,
    });
  } catch (e) {
    return Response.json({
      errors: [(e as Error).message],
      result: pokemonInfo,
    });
  }
}

import { getPokemonDetails } from "@/dal";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } },
) {
  const pokemonInfo = [];

  try {
    for await (const pokemon of getPokemonDetails([params.slug])) {
      pokemonInfo.push(pokemon);
    }

    return Response.json({
      errors: null,
      result: pokemonInfo[0],
    });
  } catch (e) {
    return Response.json({
      errors: [(e as Error).message],
      result: pokemonInfo,
    });
  }
}

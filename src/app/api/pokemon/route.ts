import { getgen3StartersSlugs, getPokemonDetails } from "@/dal";

export async function GET() {
  try {
    // Fetch some starter pokemon slugs
    const starterPokemon = getgen3StartersSlugs().map((slug) => {
      return { slug: slug, name: slug };
    });

    return Response.json({
      errors: null,
      result: starterPokemon,
    });
  } catch (e) {
    return Response.json({
      errors: [(e as Error).message],
      result: [],
    });
  }
}

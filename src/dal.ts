import { POKEAPI_ENDPOINT } from "@/definitions";

/**
 * Since there is no endpoint to directly get this info this works as a placeholder for a future call
 */
export async function getgen3StartersSlugs(): Promise<Array<string>> {
  return ["torchic", "treecko", "mudkip"];
}

/**
 * Pokeapi does not support fetching several pokemon in one call so we just issue one at a time
 * @param slugs
 */
export async function* getPokemonDetails(slugs: string[]) {
  for (const slug of slugs) {
    const res = await fetch(`${POKEAPI_ENDPOINT}/pokemon/${slug}`);
    if (!res.ok) {
      throw new Error(`Error fetching pokemon details: ${res.status}.`, {
        cause: res,
      });
    }
    yield await res.json();
  }
}

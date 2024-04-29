import { POKEAPI_ENDPOINT } from "@/definitions";
import { off } from "next/dist/client/components/react-dev-overlay/pages/bus";

/**
 * Since there is no endpoint to directly get this info this works as a placeholder for a future call
 */
export function getgen3StartersSlugs(): string[] {
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

/**
 * Fetch and aggregate type details
 * @param names
 */
export async function* getTypeDetails(names: string[]) {
  for (const name of names) {
    const res = await fetch(`${POKEAPI_ENDPOINT}/type/${name}`);
    if (!res.ok) {
      throw new Error(`Error fetching type details: ${res.status}.`, {
        cause: res,
      });
    }
    yield await res.json();
  }
}

/**
 * Get a list of pokemon slugs matched up by the given matchup key
 * @param typeDetails
 * @param matchupTypeKey
 */
export async function* getMatchups(typeDetails: any, matchupTypeKey: string) {
  const matchedUpTypes = typeDetails["damage_relations"][matchupTypeKey].map(
    (typeInfo: any) => typeInfo.name as string,
  );

  // Fetch aggregated matched up types' details
  const typesDetails = getTypeDetails(matchedUpTypes);

  // Return the list of pokemon slugs for this matchup
  for await (const typeDetail of typesDetails) {
    for (const pokemon of typeDetail["pokemon"]) {
      yield pokemon["pokemon"]["name"];
    }
  }
}

/**
 * Simple implementation of the limit-offset pagination technique to fetch more pokemon details
 * @param slugs
 * @param limit
 * @param offset
 */
export function getNextPokemonDetails(
  slugs: string[],
  limit: number,
  offset: number,
) {
  const slugsSlice = slugs.slice(offset, offset + limit);

  return getPokemonDetails(slugsSlice);
}

export const SERVER_URL = "http://localhost:3000";

export const POKEAPI_ENDPOINT = "https://pokeapi.co/api/v2";

export const FAVORABLE_MATCHUP_KEY = "double_damage_to";
export const UnFAVORABLE_MATCHUP_KEY = "double_damage_from";

export type PokemonResponse = {
  errors: Array<String>;
  result: any;
};

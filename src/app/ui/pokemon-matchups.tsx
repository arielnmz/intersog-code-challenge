import { FAVORABLE_MATCHUP_KEY, SERVER_URL } from "@/definitions";

async function getPokemonMatchups(typeName: string, matchupKey: string) {
  const res = await fetch(
    `${SERVER_URL}/api/pokemon/matchups/${typeName}/${matchupKey}/`,
  );

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch pokemon matchups");
  }

  return res.json();
}

export default async function PokemonMatchups(params: {
  typeName: string;
  matchupType: string;
}) {
  const matchups = await getPokemonMatchups(
    params.typeName,
    params.matchupType,
  );

  const matchupTitle =
    params.matchupType === FAVORABLE_MATCHUP_KEY ? "favorable" : "unfavorable";

  return (
    <div>
      <h2 className="capitalize">{matchupTitle}</h2>

      <ul>
        {matchups.result.map((matchup: string) => (
          <li key={matchup} className="capitalize">
            {matchup}
          </li>
        ))}
      </ul>
    </div>
  );
}

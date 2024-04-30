"use client";

import { FAVORABLE_MATCHUP_KEY, SERVER_URL } from "@/definitions";
import { useEffect, useState } from "react";
import { getNextPokemonDetails } from "@/dal";

async function getPokemonMatchups(typeName: string, matchupKey: string) {
  // This is fetched from the server from the client
  const res = await fetch(
    `${SERVER_URL}/api/pokemon/matchups/${typeName}/${matchupKey}/`,
    {
      mode: "cors",
      credentials: "same-origin",
    },
  );

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch pokemon matchups");
  }

  return res.json();
}

export default function PokemonMatchups(params: {
  typeName: string;
  matchupType: string;
}) {
  const [allMatchups, setAllMatchups] = useState(null);
  const [shownMatchups, setMatchups] = useState(null as null | any[]);
  const [matchupPage, setMatchupPage] = useState(0);

  useEffect(() => {
    getPokemonMatchups(params.typeName, params.matchupType).then((matchups) => {
      setAllMatchups(matchups.result);
    });
  }, []);

  useEffect(() => {
    (async () => {
      if (allMatchups === null) return;

      const nextMatchups: any[] = [];
      for await (const match of getNextPokemonDetails(
        allMatchups,
        3,
        matchupPage * 3,
      )) {
        nextMatchups.push(match);
      }

      if (shownMatchups === null) {
        setMatchups(nextMatchups);
      } else {
        setMatchups((currentMatchups) => [
          ...currentMatchups!,
          ...nextMatchups,
        ]);
      }
    })().then();
  }, [matchupPage]);

  const showMore = async () => {
    setMatchupPage((currentPage) => currentPage + 1);
  };

  const matchupTitle =
    params.matchupType === FAVORABLE_MATCHUP_KEY ? "favorable" : "unfavorable";

  return (
    <div>
      <h2 className="capitalize">{matchupTitle}</h2>

      <ul>
        {shownMatchups?.map((matchup) => (
          <li key={matchup.name} className="capitalize">
            {matchup.name}
          </li>
        ))}
      </ul>

      <button className="bg-neutral-800 p-2 rounded" onClick={showMore}>
        Load more...
      </button>
    </div>
  );
}

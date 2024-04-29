import { getMatchups, getTypeDetails } from "@/dal";

export async function GET(
  request: Request,
  { params }: { params: { typeName: string; matchupKey: string } },
) {
  const matchups = [];

  try {
    for await (const typeDetails of getTypeDetails([params.typeName])) {
      for await (const pokemon of getMatchups(typeDetails, params.matchupKey)) {
        matchups.push(pokemon);
      }
    }

    return Response.json({
      errors: null,
      result: matchups,
    });
  } catch (e) {
    return Response.json({
      errors: [(e as Error).message],
      result: matchups,
    });
  }
}

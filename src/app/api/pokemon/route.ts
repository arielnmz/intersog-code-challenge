export async function GET() {
  const pokemon = [{ id: "001", slug: "pokemon-1", name: "Pokemon 1" }];

  return Response.json(pokemon);
}

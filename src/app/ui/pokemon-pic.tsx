export default function PokemonPic(params: { details: any }) {
  return <img alt={params.details.name} src={params.details.name} />;
}

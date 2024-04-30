export default function PokemonPic(params: { details: any }) {
  const imageUrl = `/images/${params.details.name}.png`;
  return (
    <img alt={params.details.name} src={imageUrl} width="400" height="400" />
  );
}

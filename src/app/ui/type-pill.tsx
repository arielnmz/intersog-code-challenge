export default function TypePill(params: { typeSlug: string }) {
  const typeColors = new Map([
    ["water", " text-blue-600"],
    ["fire", "text-red-600"],
    ["grass", "text-green-600"],
  ]);

  const cssColor = typeColors.get(params.typeSlug) || "white";

  return <span className={`capitalize ${cssColor}`}>{params.typeSlug}</span>;
}

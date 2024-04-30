export default function TypePill(params: { typeSlug: string }) {
  const typeColors = new Map([
    ["water", "bg-blue-600"],
    ["fire", "bg-red-600"],
    ["grass", "bg-green-600"],
  ]);

  const cssColor = typeColors.get(params.typeSlug) || "white";

  return (
    <span className={`capitalize ${cssColor} text-neutral-50 p-2 rounded`}>
      {params.typeSlug}
    </span>
  );
}

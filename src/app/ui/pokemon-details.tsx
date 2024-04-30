import TypePill from "@/app/ui/type-pill";
import PokemonPic from "@/app/ui/pokemon-pic";

export default function PokemonDetails(params: { details: any }) {
  return (
    <div className="flex flex-col items-start justify-start space-y-2">
      <p>
        Details for <span className="capitalize">{params.details.name}</span>
      </p>
      <p>
        Types:{" "}
        {params.details.types.map((t: any) => (
          <TypePill key={t.type.name} typeSlug={t.type.name} />
        ))}
      </p>
      <div>
        <PokemonPic details={params.details} />
      </div>
    </div>
  );
}

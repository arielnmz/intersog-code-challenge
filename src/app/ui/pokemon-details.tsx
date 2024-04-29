import TypePill from "@/app/ui/type-pill";
import PokemonPic from "@/app/ui/pokemon-pic";
import PokemonMatchups from "@/app/ui/pokemon-matchups";

export default function PokemonDetails(params: { details: any }) {
  return (
    <div className="flex flex-col items-start justify-start space-y-2">
      <p>
        Details for <span className="capitalize">{params.details.name}</span>
      </p>
      <p>
        Types:{" "}
        {params.details.types.map((t: any) => (
          <TypePill typeSlug={t.type.name} />
        ))}
      </p>
      <div>
        <PokemonPic details={params.details} />
      </div>
    </div>
  );
}

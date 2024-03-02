import { PokemonType } from "../lib/types.ts";

const bgColorVariants: Record<PokemonType, string> = {
  bug: "bg-bug-300",
  dark: "bg-dark-300",
  dragon: "bg-dragon-300",
  electric: "bg-electric-300",
  fairy: "bg-fairy-300",
  fighting: "bg-fighting-300",
  fire: "bg-fire-300",
  flying: "bg-flying-300",
  ghost: "bg-ghost-300",
  normal: "bg-normal-300",
  grass: "bg-grass-300",
  ground: "bg-ground-300",
  ice: "bg-ice-300",
  poison: "bg-poison-300",
  psychic: "bg-psychic-300",
  rock: "bg-rock-300",
  steel: "bg-steel-300",
  water: "bg-water-300",
};
export default function TypeBadge({ type }: { type: string }) {
  return (
    <span
      class={`inline-flex items-center capitalize font-bold tracking-wide   px-2 py-1 text-xs text-white justify-center   rounded-full ${
        bgColorVariants[type as PokemonType]
      }`}
    >
      {type}
    </span>
  );
}

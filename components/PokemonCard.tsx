import { PokemonType } from "../lib/types.ts";

interface PokemonCardProps {
  name: string;
  number: number;
  image: string;
  type: PokemonType;
}

const bgColorVariants: Record<PokemonType, string> = {
  bug: "group-hover:bg-bug-300",
  dark: "group-hover:bg-dark-300",
  dragon: "group-hover:bg-dragon-300",
  electric: "group-hover:bg-electric-300",
  fairy: "group-hover:bg-fairy-300",
  fighting: "group-hover:bg-fighting-300",
  fire: "group-hover:bg-fire-300",
  flying: "group-hover:bg-flying-300",
  ghost: "group-hover:bg-ghost-300",
  normal: "group-hover:bg-normal-300",
  grass: "group-hover:bg-grass-300",
  ground: "group-hover:bg-ground-300",
  ice: "group-hover:bg-ice-300",
  poison: "group-hover:bg-poison-300",
  psychic: "group-hover:bg-psychic-300",
  rock: "group-hover:bg-rock-300",
  steel: "group-hover:bg-steel-300",
  water: "group-hover:bg-water-300",
};

export function PokemonCard({ name, number, image, type }: PokemonCardProps) {
  return (
    <a
      href={"/pokemons/" + name.toLowerCase()}
      class="cursor-pointer relative group hover:translate-y-1.5 transition pb-5 bg-accent-100 flex py-1 flex-col items-center shadow rounded-lg px-4  "
    >
      <span class="text-gray-400  group-hover:text-gray-500 font-semibold text-xs  ">
        #{number.toString().padStart(3, "0")}
      </span>
      <img
        class="mx-auto group-hover:scale-110 transition  z-10 w-20 h-20 object-contain "
        src={image}
        alt={name}
      />

      <div
        class={`absolute rounded-b-lg transition ${bgColorVariants[type]}  
         rounded-t-xl flex items-end justify-center  bottom-0 pb-1.5 h-[40%] bg-accent-200 w-full `}
      >
        <h3 class="text-center transition capitalize text-sm group-hover:text-white  text-accent-400  ">
          {name}
        </h3>
      </div>
    </a>
  );
}

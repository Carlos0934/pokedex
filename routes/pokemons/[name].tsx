import { FreshContext } from "$fresh/server.ts";
import { PokemonTableStats } from "../../components/PokemonTableStats.tsx";
import { ProgressBar } from "../../components/ProgressBar.tsx";

import TypeBadge from "../../components/TypeBadge.tsx";
import { ArrowIcon } from "../../components/icons/ArrowIcon.tsx";
import { BackIcon } from "../../components/icons/BackIcon.tsx";
import { PokeballIcon } from "../../components/icons/PokeballIcon.tsx";
import { RuleIcon } from "../../components/icons/RuleIcon.tsx";
import { WeightIcon } from "../../components/icons/WeightIcon.tsx";
import { getAppContext } from "../../lib/context.ts";
import { PokemonType } from "../../lib/types.ts";

const colorVariants: Record<PokemonType, string> = {
  bug: "text-bug-300",
  dark: "text-dark-300",
  dragon: "text-dragon-300",
  electric: "text-electric-300",
  fairy: "text-fairy-300",
  fighting: "text-fighting-300",
  fire: "text-fire-300",
  flying: "text-flying-300",
  ghost: "text-ghost-300",
  normal: "text-normal-300",
  grass: "text-grass-300",
  ground: "text-ground-300",
  ice: "text-ice-300",
  poison: "text-poison-300",
  psychic: "text-psychic-300",
  rock: "text-rock-300",
  steel: "text-steel-300",
  water: "text-water-300",
};

export default async function PokemonPage(req: Request, ctx: FreshContext) {
  const { pokedexService } = getAppContext(ctx);
  const { name } = ctx.params;
  const pokemon = await pokedexService.getPokemonByName(name);

  if (!pokemon) {
    return (
      <div>
        <h1 class="text-4xl font-bold text-white">Pokemon not found</h1>
        <p class="text-lg text-accent-200">Gotta catch 'em all!</p>
      </div>
    );
  }

  return (
    <div
      class={`${
        colorVariants[pokemon.types[0]]
      } p-2 pb-4 flex flex-col bg-current max-w-sm m-10 rounded-md mx-auto relative`}
    >
      <header class="flex items-center px-4 text-white">
        <a class="grid place-items-center" href="/">
          <BackIcon size={20} />
        </a>

        <h1 class="text-xl font-bold  flex-1  capitalize ml-3">
          {pokemon.name}
        </h1>
        <span class="text-sm font-semibold">
          #{pokemon.id.toString().padStart(3, "0")}
        </span>
      </header>
      <PokeballIcon
        class="text-white absolute right-2 top-2 opacity-15"
        size={180}
      />

      <div class=" flex items-center justify-center mt-4 absolute">
        <ArrowIcon class="transform " size={20} />
        <ArrowIcon class="transform rotate-180" size={20} />
      </div>
      <div class="flex justify-center ">
        <img
          class="mx-auto  w-44 h-44 object-contain z-10"
          src={pokemon.sprite}
          alt={pokemon.name}
        />
      </div>

      <div class="bg-accent-100 rounded-lg shadow-inner p-2 -mt-14 pt-12 ">
        <div class="flex mt-2 gap-4 justify-center text-lg font-bold">
          {pokemon.types.map((type) => <TypeBadge type={type} />)}
        </div>
        <h2 class="text-block text-center text-md font-bold mt-4 text-current ">
          About
        </h2>

        <div class="grid grid-cols-3 text-accent-500 mt-2">
          <div class="text-center grid grid-cols-subgrid items-end ">
            <p class="text-sm  flex items-center justify-center">
              <span>
                <RuleIcon size={18} />
              </span>
              <span class=" ">
                {pokemon.height} m
              </span>
            </p>
            <h3 class="text-xs  text-accent-400">Height</h3>
          </div>
          <div class="text-center grid grid-cols-subgrid items-end">
            <p class="text-sm flex items-center justify-center ">
              <span>
                <WeightIcon size={18} />
              </span>
              <span class="items-end">
                {pokemon.weight} kg
              </span>
            </p>
            <h3 class="text-xs text-accent-400 items-end">Weight</h3>
          </div>
          <div class="text-center grid grid-cols-subgrid  ">
            <p class="text-xs ">
              {pokemon.abilities.map((ability) => (
                <span class="capitalize block">
                  {ability}
                </span>
              ))}
            </p>
            <h3 class="text-xs text-accent-400  items-end ">Abilities</h3>
          </div>
        </div>

        <p class="text-sm text-accent-500 text-pretty  text-center w-full mx-auto block hyphens-auto  mt-4">
          {pokemon.description}
        </p>

        <h2 class="text-block text-center text-md font-bold mt-4 text-current ">
          Base Stats
        </h2>

        <PokemonTableStats pokemon={pokemon} />
      </div>
    </div>
  );
}

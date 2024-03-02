import { PokeballIcon } from "../components/icons/PokeballIcon.tsx";
import { SearchBar } from "../islands/SearchBar.tsx";
import SortSelector from "../islands/SortSelector.tsx";
import { SortBy } from "../lib/types.ts";

import { Handlers, PageProps } from "$fresh/server.ts";

import { getAppContext } from "../lib/context.ts";
import { Pokemon } from "../lib/dtos.ts";
import PokemonList from "../islands/PokemonCardsContainer.tsx";

import { HomeStateProvider } from "../islands/HomeStateProvider.tsx";

type Data = {
  pokemons: Pokemon[];
  query: string;
  sortBy: SortBy;
};
export const handler: Handlers<Data> = {
  async GET(_req, ctx) {
    const { pokedexService } = getAppContext(ctx);
    const query = ctx.url.searchParams.get("query") || "";
    const sortBy = ctx.url.searchParams.get("sortBy") as SortBy ||
      SortBy.Number;

    const pokemons = await pokedexService.searchPokemons({
      size: 20,
      sortBy,
      name: query,
    });

    return ctx.render({ pokemons, query, sortBy });
  },
};

export default function Home({ data }: PageProps<Data>) {
  return (
    <HomeStateProvider initialState={data}>
      <div class=" bg-primary p-2 pb-4 max-w-sm m-10 rounded-md mx-auto ">
        <header class=" text-accent-100 px-2 py-4">
          <div class="flex gap-4 items-center">
            <PokeballIcon />
            <h1 class="text-3xl font-bold">Pokédex</h1>
          </div>
          <div class="flex items-center gap-6 mt-6 w-full">
            <SearchBar />
            <SortSelector />
          </div>
        </header>
        <PokemonList />
      </div>
    </HomeStateProvider>
  );
}

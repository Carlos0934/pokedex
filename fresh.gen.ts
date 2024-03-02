// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_404 from "./routes/_404.tsx";
import * as $_app from "./routes/_app.tsx";
import * as $_middleware from "./routes/_middleware.ts";
import * as $api_pokemons_index from "./routes/api/pokemons/index.ts";
import * as $index from "./routes/index.tsx";
import * as $pokemons_name_ from "./routes/pokemons/[name].tsx";
import * as $HomeStateProvider from "./islands/HomeStateProvider.tsx";
import * as $PokemonCardsContainer from "./islands/PokemonCardsContainer.tsx";
import * as $SearchBar from "./islands/SearchBar.tsx";
import * as $SortSelector from "./islands/SortSelector.tsx";
import { type Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/_404.tsx": $_404,
    "./routes/_app.tsx": $_app,
    "./routes/_middleware.ts": $_middleware,
    "./routes/api/pokemons/index.ts": $api_pokemons_index,
    "./routes/index.tsx": $index,
    "./routes/pokemons/[name].tsx": $pokemons_name_,
  },
  islands: {
    "./islands/HomeStateProvider.tsx": $HomeStateProvider,
    "./islands/PokemonCardsContainer.tsx": $PokemonCardsContainer,
    "./islands/SearchBar.tsx": $SearchBar,
    "./islands/SortSelector.tsx": $SortSelector,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;

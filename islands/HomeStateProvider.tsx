import { ComponentChild } from "preact";
import { homeState } from "../lib/state/home/state.ts";
import { HomeStateContext } from "../lib/state/home/context.ts";
import { SortBy } from "../lib/types.ts";
import { Pokemon } from "../lib/dtos.ts";
import { effect } from "@preact/signals";
import { useEffect } from "preact/hooks";
import { IS_BROWSER } from "$fresh/runtime.ts";

export const HomeStateProvider = (
  { children, initialState }: {
    children: ComponentChild;
    initialState: { pokemons: Pokemon[]; query: string; sortBy: SortBy };
  },
) => {
  homeState.state.pokemonsPages.value = [initialState.pokemons];
  homeState.state.query.value = initialState.query;
  homeState.state.sortBy.value = initialState.sortBy;

  effect(() => {
    if (!IS_BROWSER) return;
    const url = new URL(window.location.href);

    if (homeState.state.query.value === "") url.searchParams.delete("query");
    else {
      url.searchParams.set("query", homeState.state.query.value);
    }

    window.history.pushState({}, "", url.toString());
  });

  effect(() => {
    if (!IS_BROWSER) return;
    const url = new URL(window.location.href);

    if (homeState.state.sortBy.value === SortBy.Number) {
      url.searchParams.delete("sortBy");
    } else {
      url.searchParams.set("sortBy", homeState.state.sortBy.value);
    }

    window.history.pushState({}, "", url.toString());
  });

  return (
    <HomeStateContext.Provider
      value={homeState}
    >
      {children}
    </HomeStateContext.Provider>
  );
};

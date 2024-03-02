import { Signal } from "@preact/signals";
import { Pokemon } from "../../dtos.ts";
import { SortBy } from "../../types.ts";
import { fetchPokemonsPage } from "../../utils/fetchPage.ts";

export const createHomeState = () => {
  const query: Signal<string> = new Signal("");
  const pokemonsPages: Signal<Pokemon[][]> = new Signal([]);
  const status: Signal<{ loading: boolean; error: Error | null }> = new Signal({
    loading: false,
    error: null,
  });
  const sortBy: Signal<SortBy> = new Signal(SortBy.Number);

  const refreshPokemonsPages = async (
    query: string | undefined,
    sortBy: SortBy,
  ) => {
    try {
      status.value = { loading: true, error: null };
      const page = await fetchPokemonsPage(0, query, sortBy);
      status.value = { loading: false, error: null };
      pokemonsPages.value = [page];
    } catch (error) {
      status.value = { loading: false, error };
    }
  };

  const addPokemonsPage = async (
    query: string | undefined,
    sortBy: SortBy,
  ) => {
    try {
      status.value = { loading: true, error: null };

      const page = await fetchPokemonsPage(
        pokemonsPages.value.length,
        query,
        sortBy,
      );
      pokemonsPages.value = [...pokemonsPages.value, page];

      status.value = { loading: false, error: null };
    } catch (error) {
      status.value = { loading: false, error };
    }
  };

  const changeQuery = (newQuery: string) => {
    query.value = newQuery;

    refreshPokemonsPages(newQuery, sortBy.value);
  };

  const toggleSort = () => {
    sortBy.value = sortBy.value === SortBy.Number ? SortBy.Name : SortBy.Number;
    refreshPokemonsPages(query.value, sortBy.value);
  };

  const setInitialData = (initialData: {
    pokemons: Pokemon[];
    query: string;
    sortBy: SortBy;
  }) => {
    pokemonsPages.value = [initialData.pokemons];
    query.value = initialData.query;
    sortBy.value = initialData.sortBy;
  };

  return {
    state: {
      query,
      sortBy,
      status,
      pokemonsPages,
    },
    refreshPokemonsPages,
    addPokemonsPage,
    changeQuery,
    toggleSort,
    setInitialData,
  };
};
export type HomeStateType = ReturnType<typeof createHomeState>;
export const homeState = createHomeState();

import { ReadonlySignal } from "@preact/signals";
import { useCallback, useEffect } from "preact/hooks";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { SortBy } from "../lib/types.ts";
import { useHomeState } from "../lib/state/home/useHomeState.ts";

type UsePokemonLoaderParams = {
  inView: ReadonlySignal<boolean>;
};
export default function usePokemonPageLoader(
  { inView }: UsePokemonLoaderParams,
) {
  const {
    addPokemonsPage,
    state: { pokemonsPages, query, sortBy, status },
  } = useHomeState();
  const fetchData = useCallback((
    {
      query,
      sortBy,
    }: {
      query: string | undefined;
      sortBy: SortBy;
    },
  ) => {
    const hasMore = pokemonsPages.value.at(-1)?.length === 20 ||
      pokemonsPages.value.length === 0;

    if (!hasMore || status.value.loading) return;

    addPokemonsPage(query, sortBy);
  }, [pokemonsPages, status]);

  useEffect(() => {
    if (!inView.value || !IS_BROWSER) return;

    fetchData({
      query: query.value,
      sortBy: sortBy.value,
    });
  }, [inView.value, fetchData]);
}

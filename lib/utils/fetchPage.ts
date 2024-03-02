import { SortBy } from "../types.ts";

export const fetchPokemonsPage = async (
  page: number,
  query?: string | null,
  sortBy?: SortBy | null,
) => {
  const searchParams = new URLSearchParams();
  searchParams.set("page", String(page + 1));

  if (query) searchParams.set("query", query);
  if (sortBy) searchParams.set("sortBy", sortBy);

  const url = `/api/pokemons?${searchParams.toString()}`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Failed to fetch");
    }

    const data = await res.json();

    return data;
  } catch (_error) {
    throw new Error("Failed to fetch");
  }
};

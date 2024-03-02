import { useCallback, useEffect, useRef } from "preact/hooks";
import { useHomeState } from "../lib/state/home/useHomeState.ts";
import { effect } from "@preact/signals";
import { IS_BROWSER } from "$fresh/runtime.ts";

export function SearchBar() {
  const { changeQuery, state: { query } } = useHomeState();
  const inputRef = useRef<HTMLInputElement>(null);
  const onSubmit = useCallback((e: Event) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget as HTMLFormElement);
    const query = data.get("query") as string;

    return changeQuery(query);
  }, []);

  useEffect(() => {
    if (query && inputRef.current) inputRef.current.value = query.value;
  }, [query]);

  return (
    <form
      class="relative group flex-1  text-accent-400  focus-within:text-gray-900 "
      onSubmit={onSubmit}
    >
      <span class="sr-only">Search Pokémon</span>
      <span class="absolute inset-y-0 left-0 flex items-center pl-2">
        <button
          type="button"
          class="p-1 focus:outline-none focus:shadow-outline"
        >
          <svg
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            class="w-5 h-5 transition group-focus-within:text-primary "
          >
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </button>
      </span>
      <input
        type="search"
        name="query"
        ref={inputRef}
        class="py-2 pr-2  text-sm w-full transition shadow-md bg-accent-100 rounded-full  pl-10 focus:outline-1 focus:outline-accent-200 "
        placeholder="Search..."
        autocomplete="off"
      />
    </form>
  );
}

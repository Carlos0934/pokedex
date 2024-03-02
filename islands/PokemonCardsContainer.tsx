import { effect } from "@preact/signals";

import { PokemonCard } from "../components/PokemonCard.tsx";

import useIntersectionObserver from "../hooks/useIntersectionObserver.ts";
import { useHomeState } from "../lib/state/home/useHomeState.ts";
import usePokemonPageLoader from "../hooks/usePokemonLoader.ts";

export default function PokemonCardsContainer() {
  const { state } = useHomeState();
  const [ref, inView] = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.5,
    rootMargin: "0px 0px 0px 0px",
  });

  usePokemonPageLoader({ inView });

  return (
    <main class="bg-accent-100  gap-x-3 gap-y-6 grid grid-cols-3 shadow-md rounded-lg mx-2 p-4 max-h-[70vh] overflow-auto">
      {state.pokemonsPages.value.flat().map((pokemon) => (
        <PokemonCard
          key={pokemon.id}
          name={pokemon.name}
          number={pokemon.id}
          type={pokemon.types[0]}
          image={pokemon.sprite}
        />
      ))}
      <div ref={ref} class="flex justify-center items-center col-span-3">
        {state.status.value.loading && (
          <div
            class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          >
            <span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        )}

        {state.status.value.error && (
          <div class="text-red-500">{state.status.value.error.message}</div>
        )}
      </div>
    </main>
  );
}

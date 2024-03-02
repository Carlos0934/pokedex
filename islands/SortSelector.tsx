import { useHomeState } from "../lib/state/home/useHomeState.ts";
import { SortBy } from "../lib/types.ts";

function SortSelector() {
  const { toggleSort, state } = useHomeState();
  return (
    <div>
      <button
        onClick={toggleSort}
        class="rounded-full bg-accent-100 min-h-8 min-w-8 font-bold text-xl shadow-inner transition-colors  text-gray-500 hover:text-primary  "
      >
        {state.sortBy.value === SortBy.Number ? "#" : "A"}
      </button>
    </div>
  );
}

export default SortSelector;

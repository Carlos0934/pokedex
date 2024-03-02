import { PokemonStats } from "../lib/dtos.ts";
import { Pokemon } from "../lib/dtos.ts";
import { ProgressBar } from "./ProgressBar.tsx";

export const PokemonTableStats = ({ pokemon }: { pokemon: Pokemon }) => {
  const renderTableStats = (stat: keyof PokemonStats) => {
    const labels = {
      hp: "HP",
      attack: "ATK",
      defense: "DEF",
      specialAttack: "STAK",
      specialDefense: "SDEF",
      speed: "SPD",
    };

    return (
      <tr class=" text-sm tracking-wide">
        <th class="text-right border-r-2  text-sm pr-4 text-current">
          {labels[stat]}
        </th>
        <th class="text-sm text-accent-500 ">
          <span class="text-right font-light pl-3">
            {pokemon?.stats[stat] || 0}
          </span>
        </th>
        <td class="w-full  pl-2">
          <div class="flex items-center justify-start">
            <ProgressBar
              class="text-current"
              value={pokemon?.stats[stat] || 0}
              max={255}
            />
          </div>
        </td>
      </tr>
    );
  };

  return (
    <table class={`  w-full mt-2`}>
      {renderTableStats("hp")}
      {renderTableStats("attack")}
      {renderTableStats("defense")}
      {renderTableStats("specialAttack")}
      {renderTableStats("specialDefense")}
      {renderTableStats("speed")}
    </table>
  );
};

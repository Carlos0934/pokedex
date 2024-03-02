import { PokemonSpeciesApiResponse } from "./types.ts";
import { PokemonApiResponse } from "./types.ts";
import { PokemonType } from "./types.ts";

export type PokemonStats = {
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
};
export class Pokemon {
  readonly name: string;
  readonly id: number;
  readonly height: number;
  readonly weight: number;
  readonly types: PokemonType[];
  readonly order: number;
  readonly abilities: string[];
  readonly cry: string;
  readonly sprite: string;
  readonly description: string;
  readonly stats: PokemonStats 

  constructor(data: {
    name: string;
    id: number;
    height: number;
    weight: number;
    types: PokemonType[];
    order: number;
    abilities: string[];
    cry: string;
    sprite: string;
    stats: {
      hp: number;
      attack: number;
      defense: number;
      specialAttack: number;
      specialDefense: number;
      speed: number;
    };
    description: string;
  }) {
    this.name = data.name;
    this.id = data.id;
    this.height = data.height;
    this.weight = data.weight;
    this.types = data.types;
    this.order = data.order;
    this.abilities = data.abilities;
    this.cry = data.cry;
    this.sprite = data.sprite;
    this.stats = data.stats;
    this.description = data.description;
  }

  static fromJSON(pokemon: PokemonApiResponse,specie?: PokemonSpeciesApiResponse | null): Pokemon {
    return new Pokemon({
      name: pokemon.name,
      id: pokemon.id,
      height: pokemon.height,
      weight: pokemon.weight,
      types: pokemon.types.map((type) => type.type.name as PokemonType),
      order: pokemon.order,
      abilities: pokemon.abilities.map((ability) => ability.ability.name),
      cry: pokemon.cries.latest,
      sprite: pokemon.sprites.other?.["official-artwork"]?.["front_default"] || pokemon.sprites.front_default,
      description: specie?.flavor_text_entries.findLast((entry) => entry.language.name === "en")?.flavor_text || "",
      stats: {
        hp: pokemon.stats[0].base_stat,
        attack: pokemon.stats[1].base_stat,
        defense: pokemon.stats[2].base_stat,
        specialAttack: pokemon.stats[3].base_stat,
        specialDefense: pokemon.stats[4].base_stat,
        speed: pokemon.stats[5].base_stat,
      },
    });
  }
}

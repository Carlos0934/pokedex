import {
  PokemonItemApiResponse,
  PokemonSpeciesApiResponse,
  SortBy,
} from "./types.ts";
import { Cache } from "./cache.ts";
import { Pokemon } from "./dtos.ts";
import { PokemonApiResponse } from "./types.ts";

type SearchPokemonOptions = {
  name?: string;
  sortBy?: SortBy;
  page?: number;
  size?: number;
};

export class PokedexService {
  readonly maxCount = 1008; // 1008 includes all pokemons from the first generation to the eighth
  private readonly baseUrl = "https://pokeapi.co/api/v2";

  static readonly keys = {
    POKEMONS: "pokemons",
    POKEMON: (name: string) => ["pokemon", name],
  };

  constructor(private readonly cache: Cache) {}

  async searchPokemons(
    options?: SearchPokemonOptions,
  ) {
    const names = await this.fetchPokemons();
    const filteredPokemons = this.filterPokemons(names, options?.name);

    const sortedPokemons = this.sortPokemons(
      filteredPokemons,
      options?.sortBy || SortBy.Number,
    );
    
    const pokemons = await this.fetchPokemonsPage(
      sortedPokemons,
      options?.page || 1,
      options?.size || 20,
    );


  
    return pokemons;
  }

  async getPokemonByName(name: string): Promise<Pokemon | null> {
    const pokemonCached = await this.cache.get<Pokemon>(
      PokedexService.keys.POKEMON(name),
    );

    if (pokemonCached) {
      return pokemonCached;
    }

    const [data, speciesData] = await Promise.all([
      this.fetchPokemonByName(name),
      this.fetchPokemonSpeciesByName(name),
    ]);

    if (!data) {
      console.error(`Pokemon ${name} not found`);
      return null;
    }

    const pokemon = Pokemon.fromJSON(data, speciesData);
    await this.cache.set(PokedexService.keys.POKEMON(name), pokemon);

    return pokemon;
  }

  private async fetchPokemons(): Promise<string[]> {
    const cacheKey = PokedexService.keys.POKEMONS;
    const pokemons = await this.cache.get<string[]>(
      cacheKey,
    );
    if (pokemons) {
      return pokemons;
    }

    const response = await fetch(
      `${this.baseUrl}/pokemon?limit=${this.maxCount}`,
    );
    const data = await response.json() as { results: PokemonItemApiResponse[] };
    const names = data.results.map((pokemon) => pokemon.name);
    await this.cache.set(cacheKey, names);

    return names;
  }

  private async fetchPokemonByName(
    name: string,
  ): Promise<PokemonApiResponse | null> {
    const response = await fetch(`${this.baseUrl}/pokemon/${name}`);

    if (!response.ok) {
      await response.body?.cancel();
      return null;
    }

    return response.json() as Promise<PokemonApiResponse>;
  }

  private async fetchPokemonSpeciesByName(
    name: string,
  ): Promise<PokemonSpeciesApiResponse | null> {
    const response = await fetch(`${this.baseUrl}/pokemon-species/${name}`);

    if (!response.ok) {
      await response.body?.cancel();
      return null;
    }

    return response.json() as Promise<PokemonSpeciesApiResponse>;
  }
  private async fetchPokemonsPage(
    items: string[],
    page: number,
    size: number,
  ): Promise<Pokemon[]> {

    

    const itemsPage = items.slice(
      (page - 1) * size,
      page * size,
    );

    const pokemons = await Promise.all(
      itemsPage.map((item) => this.getPokemonByName(item)),
    );
  
    return pokemons.filter((pokemon) => pokemon !== null) as Pokemon[];
  }

  private filterPokemons(
    pokemons: string[],
    name: string | undefined,
  ) {
    if (!name) {
      return pokemons;
    }

    return pokemons.filter((pokemon) =>
      pokemon.toLowerCase().includes(name.toLowerCase())
    );
  }

  private sortPokemons(pokemons: string[], sortBy: SortBy) {
    if (sortBy === SortBy.Number) {
      return pokemons;
    }

    return pokemons.toSorted((a, b) => a.localeCompare(b));
  }
}

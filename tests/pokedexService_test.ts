import { assertEquals } from "$std/assert/assert_equals.ts";
import { SortBy } from "../lib/types.ts";
import { MemoryCache } from "../lib/cache.ts";
import { PokedexService } from "../lib/pokedexService.ts";

Deno.test("PokedexService", async (t) => {
  const pokedexService = new PokedexService(new MemoryCache());

  await t.step(
    "searchPokemons should return the page of pokemons",
    async () => {
      const size = 10;
      const pokemons = await pokedexService.searchPokemons({ size });

      assertEquals(pokemons.length, size);
    },
  );

  await t.step(
    "searchPokemons should return pokemons sorted by name",
    async () => {
      const pokemons = await pokedexService.searchPokemons({
        sortBy: SortBy.Name,
      });
      const sortedPokemons = pokemons.slice().sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      assertEquals(pokemons, sortedPokemons);
    },
  );

  await t.step(
    "searchPokemons should return pokemons filtered by name",
    async () => {
      const pokemons = await pokedexService.searchPokemons({ name: "pikachu" });
      const filteredPokemons = pokemons.filter((pokemon) =>
        pokemon.name.toLocaleLowerCase().includes("pikachu")
      );
      const expectedName = "pikachu";
      const name = filteredPokemons[0].name;
      assertEquals(
        name,
        expectedName,
      );
    },
  );

  await t.step(
    "searchPokemons should return pokemons filtered by name case-insensitive",
    async () => {
      const pokemons = await pokedexService.searchPokemons({ name: "PiKaChU" });
      const filteredPokemons = pokemons.filter((pokemon) =>
        pokemon.name.toLocaleLowerCase().includes("pikachu")
      );
      const expectedName = "pikachu";
      const name = filteredPokemons[0].name;
      assertEquals(name, expectedName);
    },
  );

  await t.step(
    "searchPokemons should return a page of pokemons filtered by name",
    async () => {
  
      const pokemons = await pokedexService.searchPokemons({
        size : 10,
        name: "pikac",
      });

      assertEquals(pokemons.length, 1);
    },
  );

  await t.step(
    "searchPokemons should return a page of pokemons sorted by name",
    async () => {
      const size = 10;
      const pokemons = await pokedexService.searchPokemons({
        sortBy: SortBy.Name,
        size,
      });

      assertEquals(pokemons.length, size);
  
    },
  );

  await t.step(
    "searchPokemons should return a page of pokemons sorted by number",
    async () => {
      const size = 10;
      const pokemons = await pokedexService.searchPokemons({
        sortBy: SortBy.Number,
        size,
      });

      assertEquals(pokemons.length, size);
    },
  );

  await t.step(
    "searchPokemons should return a page of pokemons sorted by name and filtered by name",
    async () => {
      const size = 10;
      const pokemons = await pokedexService.searchPokemons({
        sortBy: SortBy.Name,
        size,
        name: "pikac",
      });

      assertEquals(pokemons.length, 1);
    },
  );
  await t.step("getPokemonByName should return a pokemon", async () => {
    const pokemon = await pokedexService.getPokemonByName("pikachu");
    assertEquals(pokemon?.name, "pikachu");
  });

  await t.step(
    "getPokemonByName should return null if the pokemon does not exist",
    async () => {
      const pokemon = await pokedexService.getPokemonByName("not-a-pokemon");
      assertEquals(pokemon, null);
    },
  );
});

import { FreshContext } from "$fresh/server.ts";
import { Cache, KvCache } from "./cache.ts";
import { PokedexService } from "./pokedexService.ts";

export type AppContext = {
  cache: Cache;
  pokedexService: PokedexService;
};
const kv = await Deno.openKv(".cache/cache");

const cache = new KvCache(kv);
const pokedexService = new PokedexService(cache);

export const context: AppContext = {
  cache,
  pokedexService,
};

export function getAppContext(ctx: FreshContext) {
  return ctx.state.context as AppContext;
}

import { FreshContext, Handlers } from "$fresh/server.ts";
import { getAppContext } from "../../../lib/context.ts";
import { SortBy } from "../../../lib/types.ts";

export const handler: Handlers = {
  async GET(_req: Request, _ctx: FreshContext) {
    const { pokedexService } = getAppContext(_ctx);
    const page = parseInt(_ctx.url.searchParams.get("page") || "1");
    const query = _ctx.url.searchParams.get("query") || undefined
    const sortBy = _ctx.url.searchParams.get("sortBy") as SortBy || SortBy.Number;
  
    const pokemons = await pokedexService.searchPokemons({ size: 20, page,name: query ,sortBy});

    return Response.json(pokemons);
  },
};

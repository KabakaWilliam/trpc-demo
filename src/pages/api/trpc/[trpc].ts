import { AppRouter, appRouter } from "@/backend/router";
import { inferProcedureOutput } from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => null,
});

// will give an infer helper that yanks the type of a thing out of the router e.g
// type PokemonFromServer = inferQueryResponse<"get-pokemon-by-id">
export type inferQueryResponse<
  TRouteKey extends keyof AppRouter["_def"]["queries"]
> = inferProcedureOutput<AppRouter["_def"]["queries"][TRouteKey]>;

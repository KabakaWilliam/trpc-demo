import { getOptionsForVote } from "@/utils/getRandomPokemon";
import { trpc } from "@/utils/trpc";
import type { NextPage } from "next";
import { useEffect, useMemo, useState } from "react";

const Home: NextPage = () => {
  const [ids, updateIds] = useState(() => getOptionsForVote());
  const [first, second] = ids;
  const firstPokemon = trpc.useQuery(["get-pokemon-by-id", { id: first }]);
  const secondPokemon = trpc.useQuery(["get-pokemon-by-id", { id: second }]);
  if (firstPokemon.isLoading || secondPokemon.isLoading) return null;

  // const [firstPokemon, secondPokemon] = useMemo(() => getOptionsForVote(), []);
  // const first = trpc.useQuery(["get-pokemon-by-id", { id: firstPokemon }]);
  // console.log(first.data);
  // if (firstPokemon.data && secondPokemon.data)
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center text-white">
      <div className="text-2xl text-center">Which Pokemon is softer</div>
      <div className="p-2" />
      <div className="border rounded p-8 flex justify-between items-center max-w-2xl">
        <div className="w-64 h-64 flex flex-col items-center justify-center">
          <img
            style={{ imageRendering: "pixelated" }}
            src={
              firstPokemon.data?.sprites.front_default
                ? firstPokemon.data?.sprites.front_default
                : ""
            }
            alt=""
            className="w-full render"
          />
          <div>{firstPokemon.data?.name}</div>
        </div>
        <div className="p-8">vs</div>
        <div className="w-64 h-64 flex flex-col items-center justify-center">
          <img
            style={{ imageRendering: "pixelated" }}
            src={
              secondPokemon.data?.sprites.front_default
                ? secondPokemon.data?.sprites.front_default
                : ""
            }
            alt=""
            className="w-full"
          />
          <div>{secondPokemon.data?.name}</div>
        </div>
      </div>
    </div>
  );
};

export default Home;

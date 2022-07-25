import { getOptionsForVote } from "@/utils/getRandomPokemon";
import { trpc } from "@/utils/trpc";
import type { NextPage } from "next";
import { useEffect, useMemo, useState } from "react";

const buttonClasses =
  "inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm font-medium rounded-full text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500";

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
  const voteForRoundest = (selected: number) => {
    updateIds(getOptionsForVote());
  };
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center text-white">
      <div className="text-2xl text-center">Which Pokemon is softer</div>
      <div className="p-2" />
      <div className="border rounded p-8 flex justify-between items-center max-w-2xl">
        <div className="w-64 h-64 flex flex-col items-center justify-center ">
          <img
            style={{ imageRendering: "pixelated" }}
            src={
              firstPokemon.data?.sprites.front_default
                ? firstPokemon.data?.sprites.front_default
                : ""
            }
            alt=""
            className="w-full "
          />
          <div className="text-xl capitalize text-center mt-[-2rem]">
            {firstPokemon.data?.name}
          </div>
          <button
            onClick={() => {
              voteForRoundest(first);
            }}
            className={buttonClasses}
          >
            Rounder
          </button>
        </div>
        <div className="p-8">vs</div>
        <div className="w-64 h-64 flex flex-col items-center justify-center ">
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
          <div className="text-xl capitalize text-center mt-[-2rem]">
            {secondPokemon.data?.name}
          </div>
          <button
            onClick={() => {
              voteForRoundest(second);
            }}
            className={buttonClasses}
          >
            Rounder
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;

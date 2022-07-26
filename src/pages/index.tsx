import { getOptionsForVote } from "@/utils/getRandomPokemon";
import { trpc } from "@/utils/trpc";
import type { NextPage } from "next";
import { useEffect, useMemo, useState } from "react";
import { inferQueryResponse } from "./api/trpc/[trpc]";

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
    <div className="h-screen w-screen flex flex-col justify-center items-center text-white">
      <div className="text-2xl text-center">Which Pokemon is softer</div>
      <div className="p-2" />
      <div className="border rounded p-8 flex justify-between items-center max-w-2xl">
        {!firstPokemon.isLoading &&
          firstPokemon.data &&
          !secondPokemon.isLoading &&
          secondPokemon.data && (
            <>
              <PokemonListing
                pokemon={firstPokemon.data}
                vote={() => voteForRoundest(first)}
              />
              <div className="p-8">vs</div>
              <PokemonListing
                pokemon={secondPokemon.data}
                vote={() => voteForRoundest(second)}
              />
            </>
          )}
        <div className="p-2" />
      </div>
    </div>
  );
};

export default Home;

type PokemonFromServer = inferQueryResponse<"get-pokemon-by-id">;
// react.fc is a way to declare the type for a functional component that comes
// with expectation of: 1.it having children, 2.returning valid jsx
const PokemonListing: React.FC<{
  pokemon: PokemonFromServer;
  vote: () => void;
}> = (props) => {
  return (
    <div className=" flex flex-col items-center  ">
      <img
        style={{ imageRendering: "pixelated" }}
        src={
          props.pokemon.sprites.front_default
            ? props.pokemon.sprites.front_default
            : ""
        }
        alt=""
        className="w-64 h-64"
      />
      <div className="text-xl capitalize text-center mt-[-0.5rem]">
        {props.pokemon.name}
      </div>
      <button
        onClick={() => {
          props.vote();
        }}
        className={buttonClasses}
      >
        Softer
      </button>
    </div>
  );
};

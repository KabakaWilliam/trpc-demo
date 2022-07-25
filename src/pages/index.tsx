import { trpc } from "@/utils/trpc";
import type { NextPage } from "next";

const Home: NextPage = () => {
  const { data, isLoading } = trpc.useQuery(["hello", { text: "willbo" }]);
  if (isLoading) return <div>Loading...</div>;
  if (data) return <div>{data.greeting}</div>;
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center text-white">
      <div className="text-2xl text-center">Which Pokemon is rounder</div>
      <div className="p-2" />
      <div className="border rounded p-8 flex justify-between items-center max-w-2xl">
        <div className="w-16 h-16 bg-red-200"></div>
        <div className="p-8">vs</div>
        <div className="w-16 h-16 bg-red-200"></div>
      </div>
    </div>
  );
};

export default Home;

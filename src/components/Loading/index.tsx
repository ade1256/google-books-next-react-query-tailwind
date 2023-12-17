import { Spinner } from "@phosphor-icons/react/dist/ssr";
import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center">
      <Spinner size={32} color="black" />
      <p className="pl-4 text-md font-bold">Loading...</p>
    </div>
  );
};

export default Loading;

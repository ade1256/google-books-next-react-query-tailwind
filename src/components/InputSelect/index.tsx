import { CaretDown } from "@phosphor-icons/react/dist/ssr";
import React from "react";

const InputSelect = ({ options, ...props }: any) => {
  return (
    <div className="relative">
      <select
        className="appearance-none w-full px-3 py-1 pr-8 text-gray-700 rounded-lg focus:outline-none focus:bg-white w-auto"
        {...props}
      >
        {options.map((option: any, index: number) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none ml-2">
        <CaretDown size={24} />
      </div>
    </div>
  );
};

export default InputSelect;

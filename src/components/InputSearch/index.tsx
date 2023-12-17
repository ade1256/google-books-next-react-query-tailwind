import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";
import React from "react";

interface InputSearchProps {
  value: string;
  onChange: (value: string) => void;
}

const InputSearch: React.FC<InputSearchProps> = ({ value, onChange }) => {
  return (
    <div className="flex items-center border rounded overflow-hidden w-full bg-white">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="px-3 py-2 w-full outline-none"
      />
      <div className="px-3 py-2 bg-gray-200">
        <MagnifyingGlass size={32} />
      </div>
    </div>
  );
};

export default InputSearch;

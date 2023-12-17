import { useRouter } from "next/navigation";
import React from "react";

const Navbar: React.FC = () => {
  const router = useRouter();
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div
          className="text-white text-lg font-bold cursor-pointer"
          onClick={() => router.push("/")}
        >
          Book App
        </div>
        <div>
          <a
            className="text-white px-4 cursor-pointer"
            onClick={() => router.push("/")}
          >
            Discover
          </a>
          <a
            className="text-white px-4 cursor-pointer"
            onClick={() => router.push("/bookmark")}
          >
            My Bookmark
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

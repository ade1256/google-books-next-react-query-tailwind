import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Pagination from "@/components/Pagination";

describe("Pagination", () => {
  it("renders without crashing", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={1}
        maxResults={1}
        onPageChange={() => null}
      />
    );
    expect(screen.getByText("Next")).toBeInTheDocument();
  });
});

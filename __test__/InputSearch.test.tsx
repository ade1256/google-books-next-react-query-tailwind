import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import InputSearch from "@/components/InputSearch";

describe("Input Search", () => {
  it("renders without crashing", () => {
    render(<InputSearch value="test" onChange={() => null} />);
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toBeInTheDocument();
  });
});

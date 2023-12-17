import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import InputSelect from "@/components/InputSelect";

describe("Input Select", () => {
  it("renders without crashing", () => {
    render(<InputSelect options={[{ value: "test", label: "test" }]} />);
    const selectElement = screen.getByRole("combobox");
    expect(selectElement).toBeInTheDocument();
  });
});

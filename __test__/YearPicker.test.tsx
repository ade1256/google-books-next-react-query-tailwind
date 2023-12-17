import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import YearPicker from "@/components/YearPicker";

describe("YearPicker", () => {
  it("renders without crashing", () => {
    render(<YearPicker value={new Date()} />);
    const selectElement = screen.getByRole("textbox");
    expect(selectElement).toBeInTheDocument();
  });
});

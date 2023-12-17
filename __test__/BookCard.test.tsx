import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import BookCard from "@/components/BookCard";

describe("BookCard", () => {
  const mockOnClick = jest.fn();
  const mockOnBookmarkClick = jest.fn();

  it("renders without crashing", () => {
    render(
      <BookCard
        variant="grid"
        imageUrl="test.jpg"
        title="Title"
        author="test"
        key={1}
        publishedDate="123"
        publisher="test"
        onBookmarkClick={mockOnBookmarkClick}
      />
    );
    expect(screen.getByText("Title")).toBeInTheDocument();
  });
});

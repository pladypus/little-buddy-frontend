import { render, screen } from "@testing-library/react";
import Card from "./Card";

describe("Card", () => {
  test("renders without error", () => {
    render(<Card />);
    const cardElement = screen.getByTestId(/card-test/i);
    expect(cardElement).toBeInTheDocument;
  });

  test("renders children", () => {
    render(<Card>Test Data</Card>);
    const childElement = screen.getByText(/Test Data/);
    expect(childElement).toBeInTheDocument;
  });
});

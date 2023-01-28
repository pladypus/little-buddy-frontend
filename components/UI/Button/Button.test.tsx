import { render, screen } from "@testing-library/react";
import Button from "./Button";

describe("Button", () => {
  test("renders without error", () => {
    render(<Button>Apple</Button>);
    const buttonElement = screen.getByText(/apple/i);
    expect(buttonElement).toBeInTheDocument;
  });
});

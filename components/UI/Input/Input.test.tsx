import { render, screen } from "@testing-library/react";
import Input from "./Input";

describe("Input", () => {
  test("renders without error", () => {
    render(<Input />);
    const inputElement = screen.getByTestId(/input-test/i);
    expect(inputElement).toBeInTheDocument;
  });
});

import { fireEvent, render, screen } from "@testing-library/react";
import Input from "./Input";

describe("Input", () => {
  test("renders without error", () => {
    render(<Input />);
    const inputElement = screen.getByTestId(/input-test/i);
    expect(inputElement).toBeInTheDocument;
  });

  test("sets read-only value", () => {
    render(<Input value="test-value" readOnly />);

    const inputElement = screen.getByTestId(/input-test/i);

    expect(inputElement).toHaveAttribute("value", "test-value");
  });

  test("should call onChange prop and update value", () => {
    const mockFn = jest.fn();
    render(<Input onChange={mockFn} />);

    const inputElement = screen.getByTestId(/input-test/i);
    fireEvent.change(inputElement, { target: { value: "new-value" } });

    expect(mockFn).toBeCalledTimes(1);
    expect(inputElement).toHaveValue("new-value");
  });
});

import { fireEvent, render, screen } from "@testing-library/react";
import Button from "./Button";

describe("Button", () => {
  test("renders without error", () => {
    render(<Button />);
    const buttonElement = screen.getByTestId(/button-test/i);
    expect(buttonElement).toBeInTheDocument;
  });

  test("renders children", () => {
    render(<Button>Test Data</Button>);
    const childElement = screen.getByText(/Test Data/);
    expect(childElement).toBeInTheDocument;
  });

  test("should call onClick prop", () => {
    const mockFn = jest.fn();
    render(<Button onClick={mockFn} />);

    const buttonElement = screen.getByTestId(/button-test/i);
    fireEvent.click(buttonElement);

    expect(mockFn).toBeCalledTimes(1);
  });

  test("should set button type", () => {
    render(<Button type="button" />);
    const buttonElement = screen.getByTestId(/button-test/i);
    expect(buttonElement).toHaveAttribute("type", "button");
  });
});

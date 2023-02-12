import { fireEvent, render, screen } from "@testing-library/react";
import Toggle from "./Toggle";

describe("Toggle", () => {
  test("renders without error", () => {
    render(<Toggle />);
    const toggleElement = screen.getByTestId(/toggle-test/i);
    expect(toggleElement).toBeInTheDocument;
  });

  test("renders label", () => {
    render(<Toggle label="test-label" />);
    const toggleElement = screen.getByText(/test-label/i);
    expect(toggleElement).toBeInTheDocument;
  });

  test("calls onChange prop", () => {
    const mockFn = jest.fn();
    render(<Toggle onChange={mockFn} />);

    const toggleElement = screen.getByTestId(/toggle-test/i);
    fireEvent.click(toggleElement);

    expect(mockFn).toBeCalledTimes(1);
  });

  test("applies checked props status", () => {
    render(<Toggle checked={true} />);

    const toggleElement = screen.getByTestId(/toggle-test/i);

    expect(toggleElement).toHaveAttribute("checked");
  });
});

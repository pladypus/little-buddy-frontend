import { render, screen } from "@testing-library/react";
import H4 from "./H4";

describe("H4", () => {
  test("renders without error", () => {
    render(<H4 />);
    const h4Element = screen.getByTestId(/h4-test/i);
    expect(h4Element).toBeInTheDocument;
  });

  test("renders children", () => {
    render(<H4>Test Data</H4>);
    const childElement = screen.getByText(/Test Data/);
    expect(childElement).toBeInTheDocument;
  });

  test("applies general properties", () => {
    render(<H4 test-attr="test-data" />);
    const h4Element = screen.getByTestId(/h4-test/i);

    expect(h4Element).toBeInTheDocument;
    expect(h4Element).toHaveAttribute("test-attr", "test-data");
  });
});

import { render, screen } from "@testing-library/react";
import H6 from "./H6";

describe("H6", () => {
  test("renders without error", () => {
    render(<H6 />);
    const h6Element = screen.getByTestId(/h6-test/i);
    expect(h6Element).toBeInTheDocument;
  });

  test("renders children", () => {
    render(<H6>Test Data</H6>);
    const childElement = screen.getByText(/Test Data/);
    expect(childElement).toBeInTheDocument;
  });

  test("applies general properties", () => {
    render(<H6 test-attr="test-data" />);
    const h6Element = screen.getByTestId(/h6-test/i);

    expect(h6Element).toBeInTheDocument;
    expect(h6Element).toHaveAttribute("test-attr", "test-data");
  });
});

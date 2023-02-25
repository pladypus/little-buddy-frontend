import { render, screen } from "@testing-library/react";
import H3 from "./H3";

describe("H3", () => {
  test("renders without error", () => {
    render(<H3 />);
    const h3Element = screen.getByTestId(/h3-test/i);
    expect(h3Element).toBeInTheDocument;
  });

  test("renders children", () => {
    render(<H3>Test Data</H3>);
    const childElement = screen.getByText(/Test Data/);
    expect(childElement).toBeInTheDocument;
  });

  test("applies general properties", () => {
    render(<H3 test-attr="test-data" />);
    const h3Element = screen.getByTestId(/h3-test/i);

    expect(h3Element).toBeInTheDocument;
    expect(h3Element).toHaveAttribute("test-attr", "test-data");
  });
});

import { render, screen } from "@testing-library/react";
import H2 from "./H2";

describe("H2", () => {
  test("renders without error", () => {
    render(<H2 />);
    const h2Element = screen.getByTestId(/h2-test/i);
    expect(h2Element).toBeInTheDocument;
  });

  test("renders children", () => {
    render(<H2>Test Data</H2>);
    const childElement = screen.getByText(/Test Data/);
    expect(childElement).toBeInTheDocument;
  });

  test("applies general properties", () => {
    render(<H2 test-attr="test-data" />);
    const h2Element = screen.getByTestId(/h2-test/i);

    expect(h2Element).toBeInTheDocument;
    expect(h2Element).toHaveAttribute("test-attr", "test-data");
  });
});

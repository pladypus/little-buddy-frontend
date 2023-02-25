import { render, screen } from "@testing-library/react";
import H1 from "./H1";

describe("H1", () => {
  test("renders without error", () => {
    render(<H1 />);
    const h1Element = screen.getByTestId(/h1-test/i);
    expect(h1Element).toBeInTheDocument;
  });

  test("renders children", () => {
    render(<H1>Test Data</H1>);
    const childElement = screen.getByText(/Test Data/);
    expect(childElement).toBeInTheDocument;
  });

  test("applies general properties", () => {
    render(<H1 test-attr="test-data" />);
    const h1Element = screen.getByTestId(/h1-test/i);

    expect(h1Element).toBeInTheDocument;
    expect(h1Element).toHaveAttribute("test-attr", "test-data");
  });
});

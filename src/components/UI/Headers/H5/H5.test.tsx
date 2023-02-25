import { render, screen } from "@testing-library/react";
import H5 from "./H5";

describe("H5", () => {
  test("renders without error", () => {
    render(<H5 />);
    const h5Element = screen.getByTestId(/h5-test/i);
    expect(h5Element).toBeInTheDocument;
  });

  test("renders children", () => {
    render(<H5>Test Data</H5>);
    const childElement = screen.getByText(/Test Data/);
    expect(childElement).toBeInTheDocument;
  });

  test("applies general properties", () => {
    render(<H5 test-attr="test-data" />);
    const h5Element = screen.getByTestId(/h5-test/i);

    expect(h5Element).toBeInTheDocument;
    expect(h5Element).toHaveAttribute("test-attr", "test-data");
  });
});

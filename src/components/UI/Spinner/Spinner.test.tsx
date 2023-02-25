import { render, screen } from "@testing-library/react";
import Spinner from "./Spinner";

describe("Spinner", () => {
  test("renders without error", () => {
    render(<Spinner />);
    const spinnerElement = screen.getByTestId(/spinner-test/i);
    expect(spinnerElement).toBeInTheDocument;
  });
});

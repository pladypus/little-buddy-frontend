import { render, screen } from "@testing-library/react";
import MinMaxQuestion from "./min-max-question";

describe("Min Max Question", () => {
  test("renders without error", () => {
    const register = jest.fn();
    render(<MinMaxQuestion category="height" register={register} />);

    const qElement = screen.getAllByTestId(/alg-q-test/i);
    expect(qElement).toBeInTheDocument;
  });

  test("renders 2 inputs", () => {
    const register = jest.fn();
    render(<MinMaxQuestion category="height" register={register} />);

    const inputElements = screen.getAllByTestId(/input-test/i);
    expect(inputElements).toHaveLength(2);
  });
});

import { fireEvent, render, screen } from "@testing-library/react";
import { ReactNode } from "react";
import Offcanvas from "./Offcanvas";

jest.mock("react-dom", () => ({
  ...jest.requireActual("react-dom"),
  createPortal: (node: ReactNode) => node,
}));

describe("Offcanvas", () => {
  test("renders without error", () => {
    render(<Offcanvas onClose={() => {}} show />);
    const offcanvasElement = screen.getByTestId(/offcanvas-test/i);
    expect(offcanvasElement).toBeInTheDocument;
  });
});

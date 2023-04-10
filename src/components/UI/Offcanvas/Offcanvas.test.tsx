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

  test("renders children", () => {
    render(
      <Offcanvas onClose={() => {}} show>
        <p>This is a test</p>
      </Offcanvas>
    );
    const childElement = screen.getByText(/this is a test/i);
    expect(childElement).toBeInTheDocument;
  });
});

import { fireEvent, render, screen } from "@testing-library/react";
import { ReactNode } from "react";
import Modal from "./Modal";

jest.mock("react-dom", () => ({
  ...jest.requireActual("react-dom"),
  createPortal: (node: ReactNode) => node,
}));

describe("Modal", () => {
  test("renders without error", () => {
    render(<Modal onClose={() => {}} show />);
    const modalElement = screen.getByTestId(/modal-test/i);
    expect(modalElement).toBeInTheDocument;
  });

  test("renders children", () => {
    render(
      <Modal onClose={() => {}} show>
        <p>This is a test</p>
      </Modal>
    );
    const childElement = screen.getByText(/this is a test/i);
    expect(childElement).toBeInTheDocument;
  });
});

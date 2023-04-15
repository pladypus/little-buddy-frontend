import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ReactNode } from "react";
import AddFamilyMemberBtn from "./add-family-member-btn";

jest.mock("react-dom", () => ({
  ...jest.requireActual("react-dom"),
  createPortal: (node: ReactNode) => node,
}));

jest.mock("react-hook-form", () => ({
  ...jest.requireActual("react-hook-form"),
  createPortal: (node: ReactNode) => node,
}));

describe("Add Family Member Button", () => {
  test("renders without error", () => {
    render(
      <AddFamilyMemberBtn
        btnLable="test button"
        formLable="test form"
        createFn={jest.fn()}
      />
    );

    const btnElement = screen.getByTestId(/button-test/i);
    expect(btnElement).toBeInTheDocument;
  });

  test("render member data input modal", () => {
    render(
      <AddFamilyMemberBtn
        btnLable="test button"
        formLable="test form"
        createFn={jest.fn()}
      />
    );

    const btnElement = screen.getByTestId(/button-test/i);
    expect(btnElement).toBeInTheDocument;

    fireEvent.click(btnElement);

    const modalElement = screen.getByTestId(/modal-test/i);
    expect(modalElement).toBeInTheDocument;
  });

  test("input has set value", async () => {
    const mockFn = jest.fn();

    render(
      <AddFamilyMemberBtn
        btnLable="test button"
        formLable="test form"
        createFn={mockFn}
      />
    );

    const btnElement = screen.getByTestId(/button-test/i);
    expect(btnElement).toBeInTheDocument;

    fireEvent.click(btnElement);

    const formInput = screen.getByTestId(/input-test/i);
    expect(formInput).toBeInTheDocument;

    fireEvent.input(formInput, {
      target: {
        value: "test",
      },
    });
    expect(formInput).toHaveValue("test");
  });
});

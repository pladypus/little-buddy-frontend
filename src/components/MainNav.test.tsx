import { fireEvent, render, screen } from "@testing-library/react";
import { ReactNode } from "react";
import MainNav from "./MainNav";

jest.mock("react-dom", () => ({
  ...jest.requireActual("react-dom"),
  createPortal: (node: ReactNode) => node,
}));

jest.mock("~/hooks/useFetchFirstDog", () => {
  return { useFetchFirstDog: jest.fn(() => "test") };
});

describe("Main Nav", () => {
  // todo: move open menu logic to before each method

  test("renders menu", () => {
    render(<MainNav />);
    const buttonElement = screen.getByTestId("menu-btn");
    expect(buttonElement).toBeInTheDocument;

    fireEvent.click(buttonElement);

    const menuElement = screen.getByTestId("menu-nav");
    expect(menuElement).toBeInTheDocument;
  });

  test("calls sign out function", () => {
    const mockFn = jest.fn();

    render(<MainNav signOut={mockFn} />);
    const buttonElement = screen.getByTestId("menu-btn");

    fireEvent.click(buttonElement);

    const signOutElement = screen.getByTestId("sign-out-btn");
    expect(signOutElement).toBeInTheDocument;

    fireEvent.click(signOutElement);
    expect(mockFn).toBeCalledTimes(1);
  });

  test("renders nav links", () => {
    render(<MainNav />);
    const buttonElement = screen.getByTestId("menu-btn");

    fireEvent.click(buttonElement);

    const navElements = screen.getAllByTestId(/\w-link/i);
    expect(navElements).toBeInTheDocument;
  });
});

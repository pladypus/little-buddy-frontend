import { faDroplet } from "@fortawesome/free-solid-svg-icons";
import { render, screen } from "@testing-library/react";
import EventBtn from "./event-btn";

jest.mock("next/router", () => require("next-router-mock"));

describe("Event Button", () => {
  test("renders icon", () => {
    const mockFn = jest.fn();

    render(<EventBtn icon={faDroplet} type="pee" setEvents={mockFn} />);
    const buttonElement = screen.getByTestId("event-btn");
    const iconElement = screen.getByTestId("event-btn-icon");

    expect(buttonElement).toBeInTheDocument;
    expect(buttonElement).toContainElement(iconElement);
    expect(iconElement).toHaveAttribute("data-icon", "droplet");
  });

  test("renders type prop", () => {
    const mockFn = jest.fn();

    render(<EventBtn icon={faDroplet} type="pee" setEvents={mockFn} />);
    const buttonElement = screen.getByText("pee");

    expect(buttonElement).toBeInTheDocument;
  });

  // test("calls setEvnets prop", () => {
  //   const mockFn = jest.fn();

  //   render(<EventBtn icon={faDroplet} type="pee" setEvents={mockFn} />);
  //   const buttonElement = screen.getByTestId("event-btn");
  //   fireEvent.click(buttonElement);

  //   expect(buttonElement).toBeInTheDocument;
  //   expect(mockFn).toBeCalledTimes(1);
  // });
});

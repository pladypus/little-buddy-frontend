import { render, screen } from "@testing-library/react";
import Drawer from "./Drawer";

describe("Drawer", () => {
  test("renders without error", () => {
    render(<Drawer />);
    const drawerElement = screen.getByTestId(/drawer-test/i);
    expect(drawerElement).toBeInTheDocument;
  });

  test("renders children", () => {
    render(<Drawer>Test Data</Drawer>);
    const childElement = screen.getByText(/Test Data/);
    expect(childElement).toBeInTheDocument;
  });

  // test portal function works
});

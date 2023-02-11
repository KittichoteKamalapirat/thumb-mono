import React from "react";
import { render, screen } from "@testing-library/react";
import SubHeading from "../SubHeading";

describe("SubHeading", () => {
  test("renders the default heading", () => {
    const heading = "Heading 1";
    render(<SubHeading heading={heading} />);

    const headingElement = screen.getByRole("heading", { name: heading });
    expect(headingElement).toBeInTheDocument();
  });

  test("renders the heading with attributes", () => {
    const heading = "Heading 1";
    render(
      <SubHeading
        heading={heading}
        fontColor="color"
        fontSize="size"
        fontStyle="style"
        extraClass="class"
      />
    );

    const headingElement = screen.getByRole("heading", { name: heading });
    expect(headingElement).toBeInTheDocument();
    expect(headingElement).toHaveClass("color size style class");
  });
});

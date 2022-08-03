import React from "react";
import { render, screen } from "@testing-library/react";
import FlashMessage from "../components/FlashMessage";
import { act } from "react-dom/test-utils";

test("flash message shows up and fade out after specified time", () => {
  const flashMessageProps = {
    message: "Test Message",
    duration: 3,
    fadeOut: 3,
  };

  act(() => {
    render(<FlashMessage {...flashMessageProps} />);
  });

  const flashMessageDiv = screen.getByText(flashMessageProps.message);
  expect(flashMessageDiv).toBeInTheDocument();

  setTimeout(() => {
    expect(flashMessageDiv).not.toBeInTheDocument();
  }, flashMessageProps.duration + flashMessageProps.fadeOut);
});

/* eslint-disable @typescript-eslint/no-empty-function */
import React from "react";
import { act, render, screen } from "@testing-library/react";
import Menu from "../components/Menu";

test("renders on screen", () => {
  render(<Menu handleMenuRender={() => {}} />);
  const moviesLink = screen.getByText(/movies/i);
  const theatersLink = screen.getByText(/theaters/i);
  expect(moviesLink).toBeInTheDocument();
  expect(theatersLink).toBeInTheDocument();
});

test("exits from dom", async () => {
  const menuComponent = render(<Menu handleMenuRender={() => {}} />);
  const closeIcon = await menuComponent.findByTestId("menu-close-icon");
  act(() => closeIcon.click());
  setTimeout(() => {
    expect(document).not.toContain("movies");
  }, 1000);
});

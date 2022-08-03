import React from "react";
import { render } from "@testing-library/react";
import Seat from "../components/Seat";
import { act } from "react-dom/test-utils";

test("renders seat selection", async () => {
  const seat = render(
    <Seat
      name="A0"
      isFull={false}
      isSelected={false}
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      liftSelectionChangeUp={() => {}}
    />
  );
  const seatDiv = await seat.findByTestId("A0");
  act(() => seatDiv.click());

  expect(seatDiv.className).toContain("selected");
  expect(seatDiv.className).not.toContain("vacant");

  act(() => seatDiv.click());
  expect(seatDiv.className).toContain("vacant");
  expect(seatDiv.className).not.toContain("selected");
});

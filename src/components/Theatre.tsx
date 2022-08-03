import React, { FunctionComponent, useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { loadSeats, saveSeats } from "../api/seatsAPI";
import Seat from "./Seat";
import ISeatLayout from "../types/ISeatLayout";
import FlashMessage from "./FlashMessage";
import "../styles/Theatre.css";

interface IStatus {
  seats: "loading" | "loaded";
  flashMessage: "shown" | "hidden";
}

const Theatre: FunctionComponent = () => {
  const [status, setStatus] = useState<IStatus>({
    seats: "loading",
    flashMessage: "hidden",
  });
  const [seats, setSeats] = useState<ISeatLayout>([]);

  useEffect(() => {
    getSeats();

    async function getSeats() {
      const data = await loadSeats();
      setSeats(data);
      setStatus({ ...status, seats: "loaded" });
    }
  }, []);

  function onSelectionChange(name: string) {
    const tempSeats = seats;
    for (let i = 0; i < tempSeats.length; i++) {
      for (let j = 0; j < tempSeats[i].length; j++) {
        const seat = tempSeats[i][j];
        if (seat.name == name) {
          seat.isSelected = !seat.isSelected;
        }
      }
    }
    setSeats(tempSeats);
  }

  async function handleConfirmSelections() {
    let isSelectedAtLeastOneSeat = false;

    const tempSeats = seats;
    for (let i = 0; i < tempSeats.length; i++) {
      for (let j = 0; j < tempSeats[i].length; j++) {
        const seat = tempSeats[i][j];
        if (seat.isSelected) {
          isSelectedAtLeastOneSeat = true;
          seat.isSelected = false;
          seat.isFull = true;
        }
      }
    }

    if (isSelectedAtLeastOneSeat) {
      setStatus({ ...status, seats: "loading" });
      await saveSeats(tempSeats);
      setSeats(await loadSeats());
      setStatus({ ...status, seats: "loaded" });
    } else {
      if (status.flashMessage == "hidden") {
        setStatus({ ...status, flashMessage: "shown" });
        setTimeout(() => {
          setStatus({ ...status, flashMessage: "hidden" });
        }, 3000);
      }
    }
  }

  return (
    <div className="Theatre">
      <div className="Theatre--screen">
        <h1>Screen</h1>
      </div>
      <div className="Theatre--seats">
        {status.seats == "loading" ? (
          <TailSpin
            color="white"
            ariaLabel="three-dots-loading"
          />
        ) : (
          seats.map((row, index) => {
            return (
              <div
                key={index}
                className="Theatre--row"
              >
                {row.map((seat, index) => {
                  return (
                    <Seat
                      key={index}
                      {...seat}
                      liftSelectionChangeUp={onSelectionChange}
                    />
                  );
                })}
              </div>
            );
          })
        )}
      </div>
      <hr />
      <button
        onClick={handleConfirmSelections}
        className="Theatre--confirm-button"
      >
        Confirm
      </button>
      {status.flashMessage == "shown" ? (
        <FlashMessage
          message="You need to select at least one seat"
          duration={2}
          fadeOut={1}
        />
      ) : null}
    </div>
  );
};

export default Theatre;

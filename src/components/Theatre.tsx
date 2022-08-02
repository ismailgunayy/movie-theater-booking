import React, { FunctionComponent, useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { loadSeats, saveSeats } from "../api/seatsAPI";
import Seat from "./Seat";
import ISeatLayout from "../types/ISeatLayout";
import "../styles/Theatre.css";

type IStatus = "loading" | "loaded";

const Theatre: FunctionComponent = () => {
  const [status, setStatus] = useState<IStatus>("loading");
  const [seats, setSeats] = useState<ISeatLayout>([]);

  useEffect(() => {
    setStatus("loading");
    getSeats();

    async function getSeats() {
      const data = await loadSeats();
      setSeats(data);
      setStatus("loaded");
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
    let flag = false;

    const tempSeats = seats;
    for (let i = 0; i < tempSeats.length; i++) {
      for (let j = 0; j < tempSeats[i].length; j++) {
        const seat = tempSeats[i][j];
        if (seat.isSelected) {
          flag = true;
          seat.isSelected = false;
          seat.isFull = true;
        }
      }
    }

    if (flag) {
      console.log("DEBUG");
      saveSeats(tempSeats);
      setSeats(await loadSeats());
    }
  }

  return (
    <div className="Theatre">
      <div className="Theatre--screen">
        <h1>Screen</h1>
      </div>
      <div className="Theatre--seats">
        {status == "loading" ? (
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
    </div>
  );
};

export default Theatre;

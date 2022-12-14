import React, { FunctionComponent, useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { loadSeats, saveSeats } from "../api/seatsAPI";
import Seat from "../components/Seat";
import FlashMessage from "../components/FlashMessage";
import ISeatAPIResponse from "../types/ISeatAPIResponse";
import { useParams } from "react-router-dom";
import "../assets/styles/Theater.css";

interface IStatus {
  seats: "loading" | "loaded";
  flashMessage: "shown" | "hidden";
}

const Theater: FunctionComponent = () => {
  const [status, setStatus] = useState<IStatus>({
    seats: "loading",
    flashMessage: "hidden",
  });
  const [seats, setSeats] = useState<ISeatAPIResponse>({});

  const { id } = useParams();

  useEffect(() => {
    getSeats();

    async function getSeats() {
      const data = await loadSeats();
      setSeats(data);
      setStatus({ ...status, seats: "loaded" });
    }
  }, []);

  function onSelectionChange(name: string) {
    console.log(seats);
    const tempSeats = seats.data;
    if (tempSeats != undefined) {
      for (let i = 0; i < tempSeats.length; i++) {
        for (let j = 0; j < tempSeats[i].length; j++) {
          const seat = tempSeats[i][j];
          if (seat.name == name) {
            seat.isSelected = !seat.isSelected;
          }
        }
      }
    }
    setSeats({ isFull: seats.isFull, data: tempSeats });
  }

  async function handleConfirmSelections() {
    let isSelectedAtLeastOneSeat = false;
    let isFull = true;

    const tempSeats = seats.data;
    if (tempSeats != undefined) {
      for (let i = 0; i < tempSeats.length; i++) {
        for (let j = 0; j < tempSeats[i].length; j++) {
          const seat = tempSeats[i][j];
          if (seat.isSelected) {
            isSelectedAtLeastOneSeat = true;
            seat.isSelected = false;
            seat.isFull = true;
          } else if (!(seat.isFull || seat.isSelected)) {
            isFull = false;
          }
        }
      }
    }

    if (isSelectedAtLeastOneSeat) {
      setStatus({ ...status, seats: "loading" });
      await saveSeats({ isFull: isFull, data: tempSeats });
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
    <div className="Theater">
      <div className="Theater--screen">
        <h1>Screen {id}</h1>
      </div>
      <div className="Theater--seats">
        {status.seats == "loading" ? (
          <TailSpin
            color="white"
            ariaLabel="three-dots-loading"
          />
        ) : seats.data !== undefined ? (
          seats.data.map((row, index) => {
            return (
              <div
                key={index}
                className="Theater--row"
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
        ) : null}
      </div>
      <div className="Theater--hr" />
      <button
        onClick={handleConfirmSelections}
        className="Theater--confirm-button"
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

export default Theater;

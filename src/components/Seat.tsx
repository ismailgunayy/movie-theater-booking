import React, { FunctionComponent, useState } from "react";
import ISeat from "../types/ISeat";
import "../assets/styles/Seat.css";

const Seat: FunctionComponent<
  ISeat & { liftSelectionChangeUp: (name: string) => void }
> = (props) => {
  const { name, isFull, liftSelectionChangeUp } = props;
  const [isSelected, setIsSelected] = useState(props.isSelected);

  const handleSelectionChange = () => {
    if (!isFull) {
      setIsSelected(!isSelected);
      liftSelectionChangeUp(name);
    }
  };

  return (
    <div
      className={`Seat ${
        isFull ? "Seat--full" : isSelected ? "Seat--selected" : "Seat--vacant"
      }`}
      onClick={handleSelectionChange}
      data-testid={name}
    >
      {name}
    </div>
  );
};

export default Seat;

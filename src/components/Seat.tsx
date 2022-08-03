import React, { FunctionComponent, useState } from "react";
import ISeat from "../types/ISeat";
import "../styles/Seat.css";

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
      className={`Seat ${isFull ? "full" : isSelected ? "selected" : "vacant"}`}
      onClick={handleSelectionChange}
    >
      {name}
    </div>
  );
};

export default Seat;
import React, { FunctionComponent, useEffect, useState } from "react";
import "../assets/styles/FlashMessage.css";

interface IProps {
  /**
   * `message` => text that you want to flash
   */
  message: string;

  /**
   * `duration` => time to display the message
   */
  duration: number;

  /**
   * `fadeOut` => time of the message to fade out (will be added to `duration`)
   */
  fadeOut: number;
}

type IStatus = "shown" | "hidden";

const FlashMessage: FunctionComponent<IProps> = ({
  message,
  duration,
  fadeOut,
}) => {
  const [status, setStatus] = useState<IStatus>("shown");

  useEffect(() => {
    setTimeout(() => setStatus("hidden"), (duration + fadeOut) * 1000);
  }, []);

  return status == "shown" ? (
    <div
      style={{
        animation: `fadeOut ${fadeOut}s linear ${duration}s forwards`,
      }}
      className="FlashMessage"
      data-testid="flash-message"
    >
      {message}
    </div>
  ) : null;
};

export default FlashMessage;

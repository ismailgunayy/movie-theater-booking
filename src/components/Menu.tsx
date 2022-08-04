import React, { FunctionComponent, useState } from "react";
import { Link } from "react-router-dom";
import "../assets/styles/Menu.css";

interface IProps {
  handleMenuRender: (flag: boolean) => void;
}

const Menu: FunctionComponent<IProps> = (props) => {
  const [isMenuShown, setIsMenuShown] = useState(true);

  return (
    <div
      className={`Menu ${
        isMenuShown ? "slide-in-animation" : "slide-out-animation"
      }`}
    >
      <div
        onClick={() => {
          setIsMenuShown(false);
          setTimeout(() => props.handleMenuRender(false), 500);
        }}
        data-testid="menu-close-icon"
        className="Menu--close-icon"
      ></div>
      <Link to="/movies">
        <h1>Movies</h1>
      </Link>
      <Link to="/theaters">
        <h1>Theaters</h1>
      </Link>
    </div>
  );
};

export default Menu;

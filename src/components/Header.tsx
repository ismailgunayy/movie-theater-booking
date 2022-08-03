import React, { FunctionComponent, useState } from "react";
import logo from "../assets/film.png";
import Menu from "./Menu";
import "../styles/Header.css";

const Header: FunctionComponent = () => {
  const [isMenuShown, setIsMenuShown] = useState(false);

  function handleMenuRender(flag: boolean) {
    setIsMenuShown(flag);
  }

  return (
    <header className="Header">
      <div className="Header--left">
        <img
          src={logo}
          alt="film-logo"
        />
        <h1>Cineflix</h1>
      </div>
      <div
        onClick={() => handleMenuRender(true)}
        className="Header--right"
      >
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
      {isMenuShown ? <Menu handleMenuRender={handleMenuRender} /> : null}
    </header>
  );
};

export default Header;

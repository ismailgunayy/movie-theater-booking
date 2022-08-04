import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Movies from "./pages/Movies";
import Theater from "./pages/Theater";
import Theaters from "./pages/Theaters";
import "./assets/styles/index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Theater />}
        />
        <Route
          path="/movies"
          element={<Movies />}
        />
        <Route
          path="/theaters"
          element={<Theaters />}
        />
        <Route
          path="/theaters/:id"
          element={<Theater />}
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

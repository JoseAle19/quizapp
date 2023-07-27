// Dependencies: react, react-dom,
import React from "react";
import ReactDOM from "react-dom/client";
// Mis dependencias
import { QuizApp } from "./QuizApp";
// Dependencias externas
import { BrowserRouter, HashRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      <QuizApp />
    </HashRouter>
  </React.StrictMode>
);

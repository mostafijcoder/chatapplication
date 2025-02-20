import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

const element = document.getElementById("root");
createRoot(element).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

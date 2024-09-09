import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./Components/App/App.tsx";
import "./index.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
    <ToastContainer/>
      <App />
      </BrowserRouter>
  </StrictMode>
);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import UserContext from "./context/UserContext.jsx";
import CaptainContext from "./context/CaptainContext.jsx"; // Ensure correct spelling and casing

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserContext>
      {" "}
      {/* Wrap UserContext first if CaptainContext doesn't depend on it */}
      <CaptainContext>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CaptainContext>
    </UserContext>
  </StrictMode>
);

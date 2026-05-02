import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { WeatherProvider } from "./context/WeatherState.jsx";
import { HashRouter } from "react-router-dom";
import { SearchContextProvider } from "./context/SearchContext.jsx";
import ProfileContextProvider from "./context/ProfileContext.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <WeatherProvider>
      <SearchContextProvider>
        <ProfileContextProvider>
          <HashRouter>
            <App />
          </HashRouter>
        </ProfileContextProvider>
      </SearchContextProvider>
    </WeatherProvider>
  </StrictMode>,
);

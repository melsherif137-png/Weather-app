import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { WeatherProvider } from "./context/WeatherState.jsx";
import { HashRouter } from "react-router-dom";
import { SearchContextProvider } from "./context/SearchContext.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <WeatherProvider>
      <SearchContextProvider>
        <HashRouter>
          <App />
        </HashRouter>
      </SearchContextProvider>
    </WeatherProvider>
  </StrictMode>,
);

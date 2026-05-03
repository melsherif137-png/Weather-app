import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { WeatherProvider } from "./context/WeatherState.jsx";
import { HashRouter } from "react-router-dom";
import { SearchContextProvider } from "./context/SearchContext.jsx";
import ProfileContextProvider from "./context/ProfileContext.jsx";
import AuthProvider from "./context/LoginContext.jsx";
import { NotificationProvider } from "./context/NotificationContext.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HashRouter>
      <WeatherProvider>
        <NotificationProvider>
          <SearchContextProvider>
            <AuthProvider>
              <ProfileContextProvider>
                <App />
              </ProfileContextProvider>
            </AuthProvider>
          </SearchContextProvider>
        </NotificationProvider>
      </WeatherProvider>
    </HashRouter>
  </StrictMode>,
);

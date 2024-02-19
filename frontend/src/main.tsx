import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import WorkoutContextProvider from "./context/WorkoutContext.tsx";
import AuthContextProvider from "./context/AuthContext.tsx";
import ScreenContextProvider from "./context/ScreenContext.tsx";
import RecordContextProvider from "./context/RecordContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <ScreenContextProvider>
          <RecordContextProvider>
            <WorkoutContextProvider>
              <App />
            </WorkoutContextProvider>
          </RecordContextProvider>
        </ScreenContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);

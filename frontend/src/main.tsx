import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import FoodContextProvider from "./context/FoodContext.tsx";
import AuthContextProvider from "./context/AuthContext.tsx";
import ScreenContextProvider from "./context/ScreenContext.tsx";
import RecordContextProvider from "./context/RecordContext.tsx";
import ItemContextProvider from "./context/ItemContext.tsx";
import AppContextProvider from "./context/AppContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <AppContextProvider>
          <ScreenContextProvider>
            <ItemContextProvider>
              <RecordContextProvider>
                <FoodContextProvider>
                  <App />
                </FoodContextProvider>
              </RecordContextProvider>
            </ItemContextProvider>
          </ScreenContextProvider>
        </AppContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);

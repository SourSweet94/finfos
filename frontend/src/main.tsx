import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "react-bootstrap";
import FoodContextProvider from "./context/FoodContext.tsx";
import AuthContextProvider from "./context/AuthContext.tsx";
import ScreenContextProvider from "./context/ScreenContext.tsx";
import RecordContextProvider from "./context/RecordContext.tsx";
import ItemContextProvider from "./context/ItemContext.tsx";
import AppContextProvider from "./context/AppContext.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <AppContextProvider>
          <ThemeProvider
            breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]}
            minBreakpoint="xxs"
          >
            <ScreenContextProvider>
              <ItemContextProvider>
                <RecordContextProvider>
                  <FoodContextProvider>
                    <App />
                  </FoodContextProvider>
                </RecordContextProvider>
              </ItemContextProvider>
            </ScreenContextProvider>
          </ThemeProvider>
        </AppContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);

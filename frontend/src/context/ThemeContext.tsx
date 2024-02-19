import { ReactNode, createContext } from "react";

interface ThemeContextProps {
  children: ReactNode;
}

interface ThemeProps {
  isLightTheme: boolean;
  light: { syntax: string; ui: string; bg: string };
  dark: { syntax: string; ui: string; bg: string };
}

const theme: ThemeProps = {
  isLightTheme: false,
  light: { syntax: "#555", ui: "black", bg: "#eee" },
  dark: { syntax: "rgb(86, 167, 184)", ui: "rgb(242, 242, 242)", bg: "rgb(41, 42, 43)" },
};

export const ThemeContext = createContext(theme);

const ThemeContextProvider = ({ children }: ThemeContextProps) => {

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

export default ThemeContextProvider;

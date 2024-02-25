import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

interface ScreenContextProps {
  children: ReactNode;
}

export interface ScreenContextValue {
  screenType: "" | "Browse" | "Action";
  setScreenType: Dispatch<SetStateAction<"" | "Browse" | "Action">>;
  action: "" | "N" | "E" | "D" | "V";
  setAction: Dispatch<SetStateAction<"" | "N" | "E" | "D" | "V">>;
}

export const ScreenContext = createContext<ScreenContextValue>({
  screenType: "",
  setScreenType: () => {},
  action: "",
  setAction: () => {},
});

const ScreenContextProvider = ({ children }: ScreenContextProps) => {
  const [screenType, setScreenType] = useState<"" | "Browse" | "Action">(
    "Browse"
  );
  const [action, setAction] = useState<"" | "N" | "E" | "D" | "V">("");

  return (
    <ScreenContext.Provider
      value={{
        screenType,
        setScreenType,
        action,
        setAction,
      }}
    >
      {children}
    </ScreenContext.Provider>
  );
};

export default ScreenContextProvider;

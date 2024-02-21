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
  record_id: string | null;
  setRecordID: Dispatch<SetStateAction<string | null>>;
}

export const ScreenContext = createContext<ScreenContextValue>({
  screenType: "",
  setScreenType: () => {},
  action: "",
  setAction: () => {},
  record_id: "",
  setRecordID: () => {},
});

const ScreenContextProvider = ({ children }: ScreenContextProps) => {
  const [screenType, setScreenType] = useState<"" | "Browse" | "Action">(
    "Browse"
  );
  const [action, setAction] = useState<"" | "N" | "E" | "D" | "V">("");

  const [record_id, setRecordID] = useState<string | null>(null);
  console.log(screenType);
  console.log(action);
  console.log(record_id)
  return (
    <ScreenContext.Provider
      value={{
        screenType,
        setScreenType,
        action,
        setAction,
        record_id,
        setRecordID,
      }}
    >
      {children}
    </ScreenContext.Provider>
  );
};

export default ScreenContextProvider;

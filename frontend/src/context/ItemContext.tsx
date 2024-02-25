import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

interface ItemContextProps {
  children: ReactNode;
}

export interface ItemContextValue {
  record_id: string | null;
  setRecordID: Dispatch<SetStateAction<string | null>>;
  workout_id: string[];
  setWorkoutID: Dispatch<SetStateAction<string[]>>;
}

export const ItemContext = createContext<ItemContextValue>({
  record_id: "",
  setRecordID: () => {},
  workout_id: [],
  setWorkoutID: () => {}
});

const ItemContextProvider = ({ children }: ItemContextProps) => {
  const [record_id, setRecordID] = useState<string | null>(null);
  const [workout_id, setWorkoutID] = useState<string[]>([]);

  return (
    <ItemContext.Provider
      value={{
        record_id,
        setRecordID,
        workout_id,
        setWorkoutID
      }}
    >
      {children}
    </ItemContext.Provider>
  );
};

export default ItemContextProvider;

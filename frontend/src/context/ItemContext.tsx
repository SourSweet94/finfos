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
  food_id: string[];
  setFoodID: Dispatch<SetStateAction<string[]>>;
}

export const ItemContext = createContext<ItemContextValue>({
  record_id: "",
  setRecordID: () => {},
  food_id: [],
  setFoodID: () => {}
});

const ItemContextProvider = ({ children }: ItemContextProps) => {
  const [record_id, setRecordID] = useState<string | null>(null);
  const [food_id, setFoodID] = useState<string[]>([]);

  return (
    <ItemContext.Provider
      value={{
        record_id,
        setRecordID,
        food_id,
        setFoodID
      }}
    >
      {children}
    </ItemContext.Provider>
  );
};

export default ItemContextProvider;

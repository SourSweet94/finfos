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

type selectedDateIntervalType = {
  startDate: Date | null;
  endDate: Date | null;
  opened?: boolean;
};

export interface ItemContextValue {
  record_id: string | null;
  setRecordID: Dispatch<SetStateAction<string | null>>;
  food_id: string[];
  setFoodID: Dispatch<SetStateAction<string[]>>;
  selectedDateInterval: selectedDateIntervalType;
  setSelectedDateInterval: Dispatch<
    SetStateAction<{
      startDate: Date | null;
      endDate: Date | null;
      opened?: boolean;
    }>
  >;
}

export const ItemContext = createContext<ItemContextValue>({
  record_id: "",
  setRecordID: () => {},
  food_id: [],
  setFoodID: () => {},
  selectedDateInterval: { startDate: null, endDate: null, opened: false },
  setSelectedDateInterval: () => {},
});

const ItemContextProvider = ({ children }: ItemContextProps) => {
  const [record_id, setRecordID] = useState<string | null>(null);
  const [food_id, setFoodID] = useState<string[]>([]);
  const [selectedDateInterval, setSelectedDateInterval] =
    useState<selectedDateIntervalType>({
      startDate: null,
      endDate: null,
      opened: false,
    });

  return (
    <ItemContext.Provider
      value={{
        record_id,
        setRecordID,
        food_id,
        setFoodID,
        selectedDateInterval,
        setSelectedDateInterval,
      }}
    >
      {children}
    </ItemContext.Provider>
  );
};

export default ItemContextProvider;

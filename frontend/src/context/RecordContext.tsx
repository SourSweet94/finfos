import { ReactNode, createContext, useReducer } from "react";
import Text from "../components/Text";

interface RecordContextProps {
  children: ReactNode;
}

export interface RecordProps {
  startDate: Date;
  endDate: Date;
  opened: boolean;
  _id: string;
}

interface RecordState {
  records: RecordProps[] | null;
}

type RecordAction =
  | { type: "SET_RECORD"; payload: RecordProps[] | null }
  | { type: "CREATE_RECORD"; payload: RecordProps }
  | { type: "DELETE_RECORD"; payload: RecordProps }
  | { type: "UPDATE_RECORD"; payload: RecordProps };

export const RecordContext = createContext<{
  state: RecordState;
  dispatch: React.Dispatch<RecordAction>;
}>({ state: { records: null }, dispatch: () => {} });

const tag = (tag: "open" | "close") => (
  <Text
    style={{
      color: tag === "open" ? "#114232" : "#A0153E",
      backgroundColor: tag === "open" ? "#90D26D" : "#F28585",
      border: "solid",
      borderRadius: "5px",
      padding: "3px",
      minWidth: "100px",
    }}
  >
    {tag === "open" ? "Opened" : "Closed"}
  </Text>
);

const recordReducer = (state: any, action: any) => {
  console.log(state);

  switch (action.type) {
    case "SET_RECORD":
      return {
        records: action.payload.map((record: RecordProps) => ({
          ...record,
          startDate: new Date(record.startDate).toLocaleDateString(),
          endDate: new Date(record.endDate).toLocaleDateString(),
          opened: record.opened ? tag("open") : tag("close"),
        })),
      };
    // return {records: action.payload}
    case "CREATE_RECORD":
      return {
        records: [
          {
            ...action.payload,
            startDate: new Date(action.payload.startDate).toLocaleDateString(),
            endDate: new Date(action.payload.endDate).toLocaleDateString(),
            opened: tag("open"),
          },
          ...state.records,
        ],
      };
    case "UPDATE_RECORD":
      return {
        records: state.records.map((records: any) => {
          return records._id === action.payload._id
            ? {
                ...action.payload,
                startDate: new Date(
                  action.payload.startDate
                ).toLocaleDateString(),
                endDate: new Date(action.payload.endDate).toLocaleDateString(),
                opened: action.payload.opened ? tag("open") : tag("close"),
              }
            : records;
        }),
      };
    case "DELETE_RECORD":
      return {
        records: state.records.filter(
          (records: any) => records._id !== action.payload._id
        ),
      };
    default:
      return state;
  }
};

const RecordContextProvider = ({ children }: RecordContextProps) => {
  const [state, dispatch] = useReducer(recordReducer, { records: null });
  return (
    <RecordContext.Provider value={{ state, dispatch }}>
      {children}
    </RecordContext.Provider>
  );
};

export default RecordContextProvider;

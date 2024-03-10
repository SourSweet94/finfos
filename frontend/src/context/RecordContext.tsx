import { ReactNode, createContext, useReducer } from "react";

interface RecordContextProps {
  children: ReactNode;
}

export interface RecordProps {
  name: string;
  _id: string;
}

interface RecordState {
  records: RecordProps[] | null;
}

type RecordAction =
  | { type: "SET_RECORD"; payload: any[] | null }
  | { type: "CREATE_RECORD"; payload: any }
  | { type: "DELETE_RECORD"; payload: any }
  | { type: "UPDATE_RECORD"; payload: any };

export const RecordContext = createContext<{
  state: RecordState;
  dispatch: React.Dispatch<RecordAction>;
}>({ state: { records: null }, dispatch: () => {} });

const recordReducer = (state: any, action: any) => {
  switch (action.type) {
    case "SET_RECORD":
      return { records: action.payload };
    case "CREATE_RECORD":
      return { records: [action.payload, ...state.records] };
    case "UPDATE_RECORD":
      return {
        records: state.records.map((records: any) => {
          return records._id === action.payload._id ? action.payload : records;
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

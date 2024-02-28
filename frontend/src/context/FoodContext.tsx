import { ReactNode, createContext, useReducer } from "react";
import { FoodProps } from "../components/FoodDetails";

interface FoodContextProps {
  children: ReactNode;
}

interface FoodState {
  food: FoodProps[] | null;
}

type FoodAction =
  | { type: "SET_FOOD"; payload: any[] | null }
  | { type: "CREATE_FOOD"; payload: any }
  | { type: "DELETE_FOOD"; payload: any }
  | { type: "UPDATE_FOOD"; payload: any };

export const FoodContext = createContext<{
  state: FoodState;
  dispatch: React.Dispatch<FoodAction>;
}>({ state: { food: null }, dispatch: () => {} });

const foodReducer = (state: any, action: any) => {
  switch (action.type) {
    case "SET_FOOD":
      return { food: action.payload };
    case "CREATE_FOOD":
      return { food: [action.payload, ...state.food] };
    case "UPDATE_FOOD":
      return {
        food: state.food.map((food: any) => {
          return food._id === action.payload._id ? action.payload : food;
        }),
      };
    case "DELETE_FOOD":
      return {
        food: state.food.filter((food: any) => food._id !== action.payload._id),
      };
    default:
      return state;
  }
};

const FoodContextProvider = ({ children }: FoodContextProps) => {
  const [state, dispatch] = useReducer(foodReducer, { food: null });
  return <FoodContext.Provider value={{ state, dispatch }}>{children}</FoodContext.Provider>;
};

export default FoodContextProvider;

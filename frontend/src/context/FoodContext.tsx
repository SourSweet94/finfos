import { ReactNode, createContext, useReducer } from "react";

interface FoodContextProps {
  children: ReactNode;
}

export interface FoodProps {
  image?: string;
  date: Date;
  _id: string;
  title: string;
  price: number;
  createdAt?: string;
}

interface FoodState {
  food: FoodProps[] | null;
}

type FoodAction =
  | { type: "SET_FOOD"; payload: FoodProps[] | null }
  | { type: "CREATE_FOOD"; payload: FoodProps }
  | { type: "DELETE_FOOD"; payload: string }
  | { type: "UPDATE_FOOD"; payload: FoodProps };

const sortFoodByDate = (foodList: FoodProps[]) => {
  return foodList.sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });
};

export const FoodContext = createContext<{
  state: FoodState;
  dispatch: React.Dispatch<FoodAction>;
}>({ state: { food: null }, dispatch: () => {} });

const foodReducer = (state: any, action: any) => {
  switch (action.type) {
    case "SET_FOOD":
      return {
        food: action.payload
          ?.map((food: FoodProps) => ({
            ...food,
            date: new Date(food.date).toLocaleDateString(),
          }))
          .sort(
            (a: FoodProps, b: FoodProps) =>
              new Date(a.date).getTime() - new Date(b.date).getTime()
          ),
      };
    case "CREATE_FOOD":
      return {
        food: sortFoodByDate([
          {
            ...action.payload,
            date: new Date(action.payload.date).toLocaleDateString(),
          },
          ...state.food,
        ]),
      };
    case "UPDATE_FOOD":
      return {
        food: sortFoodByDate(
          state.food.map((food: FoodProps) => {
            return food._id === action.payload._id
              ? {
                  ...action.payload,
                  date: new Date(action.payload.date).toLocaleDateString(),
                }
              : food;
          })
        ),
      };
    case "DELETE_FOOD":
      return {
        // food: state.food.filter((food: any) => food._id !== action.payload._id),
        food: state.food.filter(
          (food: FoodProps) => food._id !== action.payload
        ),
      };
    default:
      return state;
  }
};

const FoodContextProvider = ({ children }: FoodContextProps) => {
  const [state, dispatch] = useReducer(foodReducer, { food: null });
  return (
    <FoodContext.Provider value={{ state, dispatch }}>
      {children}
    </FoodContext.Provider>
  );
};

export default FoodContextProvider;

import { ReactNode, createContext, useReducer } from "react";
import { WorkoutProps } from "../components/WorkoutDetails";

interface WorkoutContextProps {
  children: ReactNode;
}

interface WorkoutState {
  workouts: WorkoutProps[] | null;
}

type WorkoutAction =
  | { type: "SET_WORKOUT"; payload: any[] | null }
  | { type: "CREATE_WORKOUT"; payload: any }
  | { type: "DELETE_WORKOUT"; payload: any }
  | { type: "UPDATE_WORKOUT"; payload: any };

export const WorkoutContext = createContext<{
  state: WorkoutState;
  dispatch: React.Dispatch<WorkoutAction>;
}>({ state: { workouts: null }, dispatch: () => {} });

const workoutReducer = (state: any, action: any) => {
  switch (action.type) {
    case "SET_WORKOUT":
      return { workouts: action.payload };
    case "CREATE_WORKOUT":
      return { workouts: [action.payload, ...state.workouts] };
    case "UPDATE_WORKOUT":
      return {
        workouts: state.workouts.map((workout: any) => {
          return workout._id === action.payload._id ? action.payload : workout;
        }),
      };
    case "DELETE_WORKOUT":
      return {
        workouts: state.workouts.filter((workout: any) => workout._id !== action.payload._id),
      };
    default:
      return state;
  }
};

const WorkoutContextProvider = ({ children }: WorkoutContextProps) => {
  const [state, dispatch] = useReducer(workoutReducer, { workouts: null });
  return <WorkoutContext.Provider value={{ state, dispatch }}>{children}</WorkoutContext.Provider>;
};

export default WorkoutContextProvider;

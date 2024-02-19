import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { WorkoutContext } from "../context/WorkoutContext";

const useLogout = () => {
  const { dispatch } = useContext(AuthContext);
  const { dispatch: dispatchWorkouts} = useContext(WorkoutContext)

  const logout = () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
    dispatchWorkouts({type: "SET_WORKOUT", payload: null})
  };

  return { logout };
};

export default useLogout

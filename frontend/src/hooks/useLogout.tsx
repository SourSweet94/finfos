import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { FoodContext } from "../context/FoodContext";

const useLogout = () => {
  const { dispatch } = useContext(AuthContext);
  const { dispatch: dispatchFood} = useContext(FoodContext)

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userType");
    localStorage.removeItem("lastLocation");
    dispatch({ type: "LOGOUT" });
    dispatchFood({type: "SET_FOOD", payload: null})
  };

  return { logout };
};

export default useLogout

import { createContext, useEffect, useReducer } from "react";

interface AuthContextProps {
  children: React.ReactNode;
}

interface AuthState {
  user: null | any;
  userType: "admin" | "staff" | null;
}

type AuthAction =
  | {
      type: "LOGIN";
      payload: { user: any; userType: "admin" | "staff" };
    }
  | { type: "LOGOUT" };

interface initAuth {
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
}

export const AuthContext = createContext<initAuth>({
  state: { user: null, userType: null },
  dispatch: () => {},
});

const authReducer = (state: AuthState, action: AuthAction) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload.user, userType: action.payload.userType };
    case "LOGOUT":
      return { user: null, userType: null };
    default:
      return state;
  }
};

const AuthContextProvider = ({ children }: AuthContextProps) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    userType: null,
  });
  useEffect(() => {
    if (localStorage.getItem("user") !== null) {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const userType = JSON.parse(localStorage.getItem("userType") || "{}");
      dispatch({
        type: "LOGIN",
        payload: { user, userType },
      });
      console.log(user);
    }
  }, []);

  console.log("AuthContext: ", state);
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

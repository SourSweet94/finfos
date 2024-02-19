import { createContext, useEffect, useReducer } from "react";

interface AuthContextProps {
  children: React.ReactNode;
}

interface AuthState {
  user: null | any;
}

type AuthAction = { type: "LOGIN"; payload: any } | { type: "LOGOUT" };

interface initAuth {
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
}

export const AuthContext = createContext<initAuth>({
  state: { user: null },
  dispatch: () => {},
});

const authReducer = (state: AuthState, action: AuthAction) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

const AuthContextProvider = ({ children }: AuthContextProps) => {
  const [state, dispatch] = useReducer(authReducer, { user: null });
  useEffect(() => {
    if (localStorage.getItem("user") !== null) {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      dispatch({type: "LOGIN", payload: user})
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

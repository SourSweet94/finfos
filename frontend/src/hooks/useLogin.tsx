import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState<undefined | boolean>(undefined);
  const { dispatch } = useContext(AuthContext);
  // const adminEmail : string | undefined = process.env.REACT_APP_ADMIN_EMAIL

  const login = async (email: any, password: any) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("http://localhost:4000/api/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();
    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(json));
      localStorage.setItem("userType", JSON.stringify(email === "admin@example.com" ? "admin" : "staff",));

      dispatch({
        type: "LOGIN",
        payload: {
          user: json,
          userType: email === "admin@example.com" ? "admin" : "staff",
        },
      });

      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};

export default useLogin;

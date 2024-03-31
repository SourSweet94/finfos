import { useState } from "react";

const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState<undefined | boolean>(undefined);
  const [signupSuccess, setSignupSuccess] = useState(false)

  const signup = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("http://localhost:4000/api/user/sign-up", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();

    if (!response.ok) {
      setSignupSuccess(false)
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      // localStorage.setItem('user', JSON.stringify(json))
      // dispatch({type: 'LOGIN', payload: json})
      setSignupSuccess(true)
      setIsLoading(false);
    }
  };
  console.log(signupSuccess)

  return { signup, isLoading, error, signupSuccess, setSignupSuccess };
};

export default useSignup;

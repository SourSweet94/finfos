import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import useLogin from "../hooks/useLogin";

const Login = () => {
  // const { dispatch } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, error, isLoading } = useLogin();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // dispatch({ type: "LOGIN", payload: formData });

    await login(formData.email, formData.password);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </Form.Group>

      <Button variant="primary" type="submit" disabled={isLoading}>
        Log in
      </Button>
      {error && <div>{error}</div>}
    </Form>
  );
};

export default Login;

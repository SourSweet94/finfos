import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import useSignup from "../hooks/useSignup";

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { signup, error, isLoading } = useSignup();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle signup logic here, e.g., send data to a server
    await signup(formData.email, formData.password);
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
        Sign Up
      </Button>
      {error && <div>{error}</div>}
    </Form>
  );
};

export default Signup;

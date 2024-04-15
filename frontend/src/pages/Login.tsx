import React, { useState } from "react";
import { Container, Form, Image, NavLink } from "react-bootstrap";
import useLogin from "../hooks/useLogin";
import Button from "../components/Button";
import Text from "../components/Text";
import "../styles/login.css";

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
    <Container className="Auth-form-container">
      <Form className="Auth-form" onSubmit={handleSubmit}>
        <Container className="Auth-form-content">
          <div className="Auth-form-logo">
            <Image src={"lemon.png"} width={"40"} height={"40"} />{" "}
            <h3 className="my-0">Finexus Penang Cafe</h3>
          </div>
          <h1 className="Auth-form-title">Login</h1>
          <Form.Group controlId="formEmail" className="form-group mt-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email address"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control mt-1"
            />
          </Form.Group>

          <Form.Group controlId="formPassword" className="form-group mt-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-control mt-1"
            />
          </Form.Group>

          <div className="d-grid gap-2 mt-3 my-3">
            <Button type="submit" disabled={isLoading} onClick={() => {}}>
              Log in
            </Button>
            <Button
              disabled={isLoading}
              style={{ background: "white", color: "grey" }}
            >
              <NavLink href="/sign-up">Sign up</NavLink>
            </Button>
          </div>

          {error && <Text className="error">*{error}</Text>}
        </Container>
      </Form>
    </Container>
  );
};

export default Login;

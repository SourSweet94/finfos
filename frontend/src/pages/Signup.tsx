import React, { useEffect, useState } from "react";
import { Form, Container } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import useSignup from "../hooks/useSignup";
import Button from "../components/Button";
import InfoModal from "../components/InfoModal";
import Text from "../components/Text";
import "../styles/login.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { signup, error, isLoading, signupSuccess } = useSignup();
  const [showInfoModal, setShowInfoModal] = useState<boolean>(false);
  const [redirectToHome, setRedirectToHome] = useState(false);

  useEffect(() => {
    if (signupSuccess) {
      setShowInfoModal(true);
    }
  }, [signupSuccess]);

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
    <>
      <Container className="Auth-form-container">
        <Form className="Auth-form" onSubmit={handleSubmit}>
          <Container className="Auth-form-content">
            <h1 className="Auth-form-title">Sign up</h1>
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
            <div className="d-grid gap-2 mt-3 my-3">
              <Button type="submit" disabled={isLoading}>
                Sign up
              </Button>
            </div>
            {error && <div>{error}</div>}
          </Container>
        </Form>
      </Container>
      <InfoModal
        show={showInfoModal}
        setShow={setShowInfoModal}
        buttonLbl1="Go to login"
        onClickBtn1={() => setRedirectToHome(true)}
        status="success"
      >
        <Text>Sign up successfully!</Text>
      </InfoModal>

      {redirectToHome && <Navigate to="/" />}
    </>
  );
};

export default Signup;

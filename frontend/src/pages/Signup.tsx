import React, { useEffect, useState } from "react";
import { Form, Container, Image } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
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
            <div className="Auth-form-logo">
              <Image src={"lemon.png"} width={"40"} height={"40"} />{" "}
              <h3 className="my-0">Finexus Penang Cafe</h3>
            </div>
            <h1 className="Auth-form-title">Sign up</h1>
            <Form.Group controlId="formEmail" className="form-group mt-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={formData.email}
                onChange={handleChange}
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
              />
            </Form.Group>
            <div className="d-grid gap-2 mt-3 my-3">
              <Button type="submit" disabled={isLoading}>
                Sign up
              </Button>
            </div>
            <div style={{ display: "flex", justifyContent: "right" }}>
              <Button
                disabled={isLoading}
                style={{ background: "none", color: "black", border: "none" }}
              >
                <Link to="/login">
                  <Text as={"strong"}>Login</Text>
                </Link>
              </Button>
            </div>
            {error && <Text className="error">*{error}</Text>}
          </Container>
        </Form>
      </Container>
      <InfoModal
        show={showInfoModal}
        setShow={setShowInfoModal}
        headerTitle="Sign up"
        buttonLbl1="Go to login"
        onClickBtn1={() => setRedirectToHome(true)}
        status="success"
        closeButton={false}
        bsModalProps={{ backdrop: "static" }}
      >
        <Text>Sign up successfully!</Text>
      </InfoModal>

      {redirectToHome && <Navigate to="/" />}
    </>
  );
};

export default Signup;

import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/navbar.css";
import Button from "./Button";
import InfoModal from "./InfoModal";

const NavBar = () => {
  const { logout } = useLogout();
  const {
    state: { user },
  } = useContext(AuthContext);

  const [showInfoModal, setShowInfoModal] = useState<boolean>(false);

  return (
    <>
      <Navbar
        className="navbar"
        bg="dark"
        data-bs-theme="dark"
        // style={{ height: "10vh" }}
      >
        <div className="navbar-left">
          <Link to="/">
            <Navbar.Brand>Home</Navbar.Brand>
          </Link>
        </div>
        <div className="navbar-right">
          {user ? (
            <Nav className="">
              <text className="navbar-user">{user.email}</text>
              <Button onClick={() => setShowInfoModal(true)}>Logout</Button>
            </Nav>
          ) : (
            <Nav className="me-auto">
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/sign-up">Sign up</Nav.Link>
            </Nav>
          )}
        </div>
      </Navbar>
      <InfoModal
        show={showInfoModal}
        setShow={setShowInfoModal}
        // status="warning"
        headerTitle="Logout"
        buttonLbl="Yes"
        onClickBtn1={logout}
        buttonLbl2="No"
        onClickBtn2={() => setShowInfoModal(false)}
      >
        <text>Do you want to log out?</text>
      </InfoModal>
    </>
  );
};

export default NavBar;

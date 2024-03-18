import { Container, Nav, Navbar as BSNavbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Button from "./Button";
import InfoModal from "./InfoModal";
import Icon from "./Icon";
import "../styles/navbar.css";

interface NavbarProps {
  handleToggleSidebar: () => void;
}

const Navbar = ({ handleToggleSidebar }: NavbarProps) => {
  const { logout } = useLogout();
  const {
    state: { user },
  } = useContext(AuthContext);

  const [showInfoModal, setShowInfoModal] = useState<boolean>(false);

  return (
    <>
      <BSNavbar
        className="navbar"
        bg="dark"
        data-bs-theme="dark"
      >
        <div className="navbar-left">
          <Container
            className="d-none d-md-block"
            style={{ width: "80px", display: "flex", justifyContent: "center" }}
          >
            <Button
              style={{ minWidth: "50px", margin: 0 }}
              onClick={handleToggleSidebar}
            >
              {<Icon iconName="List" />}
            </Button>
          </Container>
          <Container>
            <Link to="/">
              <BSNavbar.Brand>Home</BSNavbar.Brand>
            </Link>
          </Container>
        </div>
        <div className="navbar-right">
          {user ? (
            <Nav>
              <span className="navbar-user">{user.email}</span>
              <Button onClick={() => setShowInfoModal(true)}>Logout</Button>
            </Nav>
          ) : (
            <Nav className="me-auto">
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/sign-up">Sign up</Nav.Link>
            </Nav>
          )}
        </div>
      </BSNavbar>
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
        <span>Do you want to log out?</span>
      </InfoModal>
    </>
  );
};

export default Navbar;

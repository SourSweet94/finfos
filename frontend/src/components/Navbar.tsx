import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const NavBar = () => {
  const { logout } = useLogout();
  const {
    state: { user },
  } = useContext(AuthContext);

  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Link to="/">
          <Navbar.Brand>Home</Navbar.Brand>
        </Link>
        {user ? (
          <Nav className="me-auto">
            <span style={{ color: "white" }}>{user.email}</span>
            <Nav.Link onClick={logout}>Logout</Nav.Link>
          </Nav>
        ) : (
          <Nav className="me-auto">
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/sign-up">Sign up</Nav.Link>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
};

export default NavBar;

import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/sidebar.css"

const Sidebar = () => {
  const {
    state: { userType },
  } = useContext(AuthContext);
  return (
    <>
      <Nav
        className="col-md-12 d-block bg-light sidebar"
        activeKey="/home"
        onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
      >
        <div className="sidebar-sticky"></div>
        {userType === "admin" && (
          <>
            <Nav.Item>
              <Link to="/dashboard">Dashboard</Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/manage">Manage</Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/order">Order</Link>
            </Nav.Item>
          </>
        )}
        {userType === "staff" && (
          <>
            <Nav.Item>
              <Link to="/menu">Menu</Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/cart">Cart</Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/review">Review</Link>
            </Nav.Item>
          </>
        )}
      </Nav>
    </>
  );
};

export default Sidebar;

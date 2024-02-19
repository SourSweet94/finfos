import { Navbar, Nav, Col, Row } from "react-bootstrap";
import Button from "./Button";
import { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  return (
    <>
      {/* Toggle button inside Sidebar component */}
      <Row>
        {!sidebarOpen && (
          <Col>
            <Navbar bg="dark" variant="dark" className="sidebar">
              <Navbar.Toggle aria-controls="sidebar-nav" />
              <Navbar.Collapse id="sidebar-nav">
                <Nav className="flex-column">
                  <Link to="/dashboard">Dashboard</Link>
                  <Link to="/menu">Menu</Link>
                  <Link to="/order">Order</Link>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </Col>
        )}
        <Col>
          <Button onClick={toggleSidebar}>OO</Button>
        </Col>
      </Row>
    </>
  );
};

export default Sidebar;

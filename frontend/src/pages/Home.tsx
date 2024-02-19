import { useContext, useEffect, useState } from "react";

import { Col, Container, Row } from "react-bootstrap";
// import { ThemeContext } from "../context/ThemeContext";
import { WorkoutContext } from "../context/WorkoutContext";
import { AuthContext } from "../context/AuthContext";
import Table from "../components/WorkoutTable";
import Sidebar from "../components/Sidebar";
import Button from "../components/Button";
import NavBar from "../components/Navbar";
import { Outlet, Route, Routes } from "react-router-dom";

const Home = () => {
  const {
    state: { workouts },
    dispatch,
  } = useContext(WorkoutContext);
  const {
    state: { user },
  } = useContext(AuthContext);


  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };
  return (
    <>
      <Container fluid>
        <Row>
          {sidebarOpen && (
            <Col
              xs={12}
              md={3}
              lg={2}
              id="sidebar-wrapper"
              style={{ background: "pink" }}
            >
              <Sidebar />
            </Col>
          )}
          <Col
            xs={12}
            md={sidebarOpen ? 9 : 12}
            lg={sidebarOpen ? 10 : 12}
            id="page-content-wrapper"
          >
            <Outlet/>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;

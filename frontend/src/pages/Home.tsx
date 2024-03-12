import { Col, Container, Row } from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import "../styles/home.css";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import Loading from "../components/Loading";
import NavBar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";
const Home = () => {
  const { loading } = useContext(AppContext);
  const {
    state: { user },
  } = useContext(AuthContext);

  return (
    <>
      <Container fluid>
        <Row>
          <Col lg={2} md={2} style={{ background: "pink" }}>
            <Sidebar />
          </Col>

          <Col lg={10} md={10} className="main-content">
            <NavBar />
            <Container>
              <Breadcrumb />
            </Container>
            {loading && <Loading />}

            <Container style={{ display: loading ? "none" : "" }}>
              <Outlet />
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;

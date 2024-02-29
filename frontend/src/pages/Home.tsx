import { Col, Container, Row } from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import "../styles/home.css"

const Home = () => {
  return (
    <>
      <Container fluid>
        <Row>
          <Col lg={2} style={{ background: "pink" }}>
            <Sidebar />
          </Col>

          <Col lg={10} className="main-content">
            <Container>
              <Breadcrumb />
            </Container>

            <Outlet />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;

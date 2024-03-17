import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import Loading from "../components/Loading";
import Breadcrumb from "../components/Breadcrumb";
import Sidebar from "../components/Sidebar";
import NavBar from "../components/Navbar";
import "../styles/home.css";

const Home = () => {
  const { loading } = useContext(AppContext);

  const [collapsed, setCollapsed] = useState(false);

  const handleToggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <>
      <NavBar />

      <div className="home-container">
        <div className={"sidebar"}>
          <Sidebar
            collapsed={collapsed}
            handleToggleSidebar={handleToggleSidebar}
          />
        </div>

        <div className={"main-content"}>
          <Container>
            <Breadcrumb />
          </Container>
          {loading && <Loading />}

          <Container style={{ display: loading ? "none" : "" }}>
            <Outlet />
          </Container>
        </div>
      </div>
    </>
  );
};

export default Home;

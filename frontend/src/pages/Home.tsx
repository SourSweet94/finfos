import { Container } from "react-bootstrap";
import { Outlet, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import Loading from "../components/Loading";
import Sidebar from "../components/Sidebar";
import NavBar from "../components/Navbar";
import "../styles/home.css";

const Home = () => {
  const { loading } = useContext(AppContext);

  const [collapsed, setCollapsed] = useState(false);

  const handleToggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const location = useLocation();

  useEffect(() => {
    localStorage.setItem("lastLocation", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <NavBar handleToggleSidebar={handleToggleSidebar} />

      <div className="home-container">
        <div className={"sidebar"}>
          <Sidebar collapsed={collapsed} />
        </div>

        <div className={"main-content"}>
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

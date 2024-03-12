import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NavBar from "./components/Navbar";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Menu from "./pages/Menu";
import Manage from "./pages/admin/Manage";
import Cart from "./pages/Cart";
import Order from "./pages/Order";
import UserOrder from "./components/UserOrderTable";

function App() {
  const {
    state: { user },
  } = useContext(AuthContext);
  return (
    <>
      {/* <NavBar /> */}
      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />}>
          <Route path="/dashboard" element={<div>Dashboard</div>} />
          <Route path="/manage" element={<Manage />} />
          <Route path="/user-order" element={<UserOrder/>} />

          <Route path="/menu" element={<Menu />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<Order />} />
          <Route path="/review" element={<div>review</div>} />
        </Route>
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/sign-up"
          element={!user ? <Signup /> : <Navigate to="/" />}
        />
      </Routes>
    </>
  );
}

export default App;

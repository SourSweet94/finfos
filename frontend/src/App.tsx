import "bootstrap/dist/css/bootstrap.min.css";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Menu from "./pages/Menu";
import Manage from "./pages/admin/Manage";
import Cart from "./pages/Cart";
import Order from "./pages/Order";
import Feedback from "./pages/Feedback";
import UserFeedback from "./pages/admin/UserFeedback";
import UserOrder from "./pages/admin/UserOrder";

function App() {
  const {
    state: { user, userType },
  } = useContext(AuthContext);

  const lastLocation = localStorage.getItem("lastLocation");

  return (
      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />}>
          <Route
            index
            element={
              <Navigate
                to={
                  lastLocation ||
                  (userType === "admin" ? "/manage" : "/menu")
                }
                replace
              />
            }
          />
          <Route path="/manage" element={<Manage />} />
          <Route path="/user-order" element={<UserOrder />} />
          <Route path="/user-feedback" element={<UserFeedback />} />

          <Route path="/menu" element={<Menu />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<Order />} />
          <Route path="/feedback" element={<Feedback />} />
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
  );
}

export default App;

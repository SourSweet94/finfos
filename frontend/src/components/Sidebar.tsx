import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

import { Sidebar as ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import Button from "./Button";
import Icon from "./Icon";

interface SidebarProps {
  collapsed: boolean;
  handleToggleSidebar: () => void;
}

const Sidebar = ({ collapsed, handleToggleSidebar }: SidebarProps) => {
  const {
    state: { user, userType },
  } = useContext(AuthContext);

  const [activeMenuItem, setActiveMenuItem] = useState<string>("");

  // const [cartItemCount, setCartItemCount] = useState<number>(0);

  // useEffect(() => {
  //   const fetchCartItemNumber = async () => {
  //     // setLoading(true);
  //     const response = await fetch("http://localhost:4000/api/user/cart", {
  //       headers: {
  //         Authorization: `Bearer ${user.token}`,
  //       },
  //     });
  //     const json = await response.json();
  //     console.log("run");
  //     if (response.ok) {
  //       setCartItemCount(json.length);
  //     }
  //     // setLoading(false);
  //   };
  //   if (user) {
  //     fetchCartItemNumber();
  //   }
  // }, [user]);

  return (
    <>
      <ProSidebar
        collapsed={collapsed}
        // collapsedWidth="0px"
        // breakPoint="md"
        transitionDuration={0}
        width="250px"
        style={{ height: "90vh", background: "lightgray" }}
      >
        <Button
          // style={{ height: "60px", borderRadius: "0px 7px 7px 0px" }}
          onClick={handleToggleSidebar}
        >
          {<Icon iconName="List" />}
        </Button>
        <Menu
          menuItemStyles={{
            button: ({ level, active }) => {
              // only apply styles on first level elements of the tree
              if (level === 0)
                return {
                  color: active ? "white" : "black",
                  backgroundColor: active ? "#265073" : undefined,
                  ":hover": { backgroundColor: active ? "#265073" : "#529cd9" },
                };
            },
          }}
        >
          {userType === "admin" && (
            <>
              <MenuItem
                icon={<Icon iconName="HouseFill" />}
                component={<Link to="/dashboard" />}
                active={activeMenuItem === "dashboard"}
                onClick={() => setActiveMenuItem("dashboard")}
              >
                Dashboard
              </MenuItem>
              <MenuItem
                icon={<Icon iconName="PencilSquare" />}
                component={<Link to="/manage" />}
                active={activeMenuItem === "manage"}
                onClick={() => setActiveMenuItem("manage")}
              >
                Manage
              </MenuItem>
              <MenuItem
                icon={<Icon iconName="Clipboard" />}
                component={<Link to="/user-order" />}
                active={activeMenuItem === "user-order"}
                onClick={() => setActiveMenuItem("user-order")}
              >
                User Order
              </MenuItem>
            </>
          )}
          {userType === "staff" && (
            <>
              <MenuItem
                icon={<Icon iconName="HouseFill" />}
                component={<Link to="/menu" />}
                active={activeMenuItem === "menu"}
                onClick={() => setActiveMenuItem("menu")}
              >
                Menu
              </MenuItem>
              <MenuItem
                icon={<Icon iconName="CartFill" />}
                component={<Link to="/cart" />}
                active={activeMenuItem === "cart"}
                onClick={() => setActiveMenuItem("cart")}
                // suffix={<div>{cartItemCount}</div>}
              >
                Cart
              </MenuItem>
              <MenuItem
                icon={<Icon iconName="Receipt" />}
                component={<Link to="/order" />}
                active={activeMenuItem === "order"}
                onClick={() => setActiveMenuItem("order")}
              >
                Order
              </MenuItem>
              <MenuItem
                icon={<Icon iconName="ChatLeftTextFill" />}
                component={<Link to="/review" />}
                active={activeMenuItem === "review"}
                onClick={() => setActiveMenuItem("review")}
              >
                Review
              </MenuItem>
            </>
          )}
        </Menu>
      </ProSidebar>
      {/* <Button
        style={{ height: "60px", borderRadius: "0px 7px 7px 0px" }}
        onClick={handleToggleSidebar}
      >
        {<Icon iconName="List" />}
      </Button> */}
    </>
  );
};

export default Sidebar;

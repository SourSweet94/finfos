import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Sidebar as ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import Icon from "./Icon";

interface SidebarProps {
  collapsed: boolean;
}

const Sidebar = ({ collapsed }: SidebarProps) => {
  const {
    state: { userType },
  } = useContext(AuthContext);

  const location = useLocation()

  return (
    <>
      <ProSidebar
        collapsed={collapsed}
        // collapsedWidth="0px"
        breakPoint="md"
        transitionDuration={0}
        width="250px"
        style={{ height: "100%", background: "lightgray" }}
      >
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
                icon={<Icon iconName="PencilSquare" />}
                component={<Link to="/manage" />}
                active={location.pathname === "/manage"}
              >
                Manage
              </MenuItem>
              <MenuItem
                icon={<Icon iconName="Clipboard" />}
                component={<Link to="/user-order" />}
                active={location.pathname === "/user-order"}
              >
                User Order
              </MenuItem>
              <MenuItem
                icon={<Icon iconName="ChatLeftTextFill" />}
                component={<Link to="/user-feedback" />}
                active={location.pathname === "/user-feedback"}
              >
                User Feedback
              </MenuItem>
            </>
          )}
          {userType === "staff" && (
            <>
              <MenuItem
                icon={<Icon iconName="House" />}
                component={<Link to="/menu" />}
                active={location.pathname === "/menu"}
              >
                Menu
              </MenuItem>
              <MenuItem
                icon={<Icon iconName="Cart" />}
                component={<Link to="/cart" />}
                active={location.pathname === "/cart"}
                // suffix={<div>{cartItemCount}</div>}
              >
                Cart
              </MenuItem>
              <MenuItem
                icon={<Icon iconName="Receipt" />}
                component={<Link to="/order" />}
                active={location.pathname === "/order"}
              >
                Order
              </MenuItem>
              <MenuItem
                icon={<Icon iconName="ChatLeftText" />}
                component={<Link to="/feedback" />}
                active={location.pathname === "/feedback"}
              >
                Feedback
              </MenuItem>
            </>
          )}
        </Menu>
      </ProSidebar>
    </>
  );
};

export default Sidebar;

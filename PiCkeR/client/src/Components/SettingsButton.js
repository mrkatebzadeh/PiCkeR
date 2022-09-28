import React from "react";
import "../Styles/SettingsButton.css";

import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import { useAuth0 } from "@auth0/auth0-react";

const SettingsButton = ({ auth }) => {
  const { logout } = useAuth0();

  return (
    <Menu
      menuButton={<MenuButton className="settings_btn">...</MenuButton>}
      transition
    >
      {auth && (
        <MenuItem onClick={() => logout({ returnTo: window.location.origin })}>
          Logout
        </MenuItem>
      )}
      {/* <MenuItem>Settings</MenuItem> */}
    </Menu>
  );
};
export default SettingsButton;

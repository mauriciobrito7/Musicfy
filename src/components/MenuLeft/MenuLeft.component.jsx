import React, { useState, useEffect } from "react";
import "./MenuLeft.styles.scss";
import { Menu, Icon } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import { isUserAdmin } from "../../utils/Api";

const MenuLeft = ({ user, location }) => {
  const [activeMenu, setActiveMenu] = useState(location.pathname);
  const [userAdmin, setUserAdmin] = useState(false);

  useEffect(() => {
    isUserAdmin(user.uid).then((res) => setUserAdmin(res));
  }, [user]);

  const handlerMenu = (e, menu) => {
    setActiveMenu(menu.to);
  };
  return (
    <Menu className="menu-left" vertical>
      <div className="top">
        <Menu.Item
          as={Link}
          to="/"
          name="home"
          active={activeMenu === "/"}
          onClick={handlerMenu}
        >
          <Icon name="home" /> Inicio
        </Menu.Item>
        <Menu.Item
          as={Link}
          to="/artists"
          name="artists"
          active={activeMenu === "/artists"}
          onClick={handlerMenu}
        >
          <Icon name="music" /> Artistas
        </Menu.Item>
      </div>
      {userAdmin && (
        <div className="footer">
          <Menu.Item name="artists">
            <Icon name="plus square outline" /> Nuevo artista
          </Menu.Item>
          <Menu.Item name="artists">
            <Icon name="plus square outline" /> Nueva cancion
          </Menu.Item>
        </div>
      )}
    </Menu>
  );
};

export default withRouter(MenuLeft);

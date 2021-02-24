import React, { useState, useEffect } from "react";
import "./MenuLeft.styles.scss";
import { Menu, Icon } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import { isUserAdmin } from "../../utils/Api";
import BasicModal from "../Modal/BasicModal/BasicModal.component";
import AddArtist from "../Artists/AddArtist/AddArtist";
import AddAlbumForm from "../Albums/AddAlbumsForm/AddAlbumForm";

const MenuLeft = ({ user, location }) => {
  const [activeMenu, setActiveMenu] = useState(location.pathname);
  const [userAdmin, setUserAdmin] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [contentModal, setContentModal] = useState();

  useEffect(() => {
    setActiveMenu(location.pathname);
  }, [location]);

  useEffect(() => {
    isUserAdmin(user.uid).then((res) => setUserAdmin(res));
  }, [user]);

  const handlerMenu = (e, menu) => {
    setActiveMenu(menu.to);
  };

  const handlerModal = (type) => {
    switch (type) {
      case "artist":
        setTitleModal("New artist");
        setContentModal(<AddArtist setShowModal={setShowModal} />);
        setShowModal(true);
        break;
      case "album":
        setTitleModal("New Album");
        setContentModal(<AddAlbumForm setShowModal={setShowModal} />);
        setShowModal(true);
        break;
      case "song":
        setTitleModal("New song");
        setContentModal(<h2>Formulario nueva cancion</h2>);
        setShowModal(true);
        break;
      default:
        setTitleModal(null);
        setContentModal(null);
        setShowModal(false);
        break;
    }
  };
  return (
    <>
      <Menu className="menu-left" vertical>
        <div className="top">
          <Menu.Item
            as={Link}
            to="/"
            name="home"
            active={activeMenu === "/"}
            onClick={handlerMenu}
          >
            <Icon name="home" /> home
          </Menu.Item>
          <Menu.Item
            as={Link}
            to="/artists"
            name="artists"
            active={activeMenu === "/artists"}
            onClick={handlerMenu}
          >
            <Icon name="user" /> Artists
          </Menu.Item>
          <Menu.Item
            as={Link}
            to="/albums"
            name="albums"
            active={activeMenu === "/albums"}
            onClick={handlerMenu}
          >
            <Icon name="window maximize outline" /> Albums
          </Menu.Item>
        </div>
        {userAdmin && (
          <div className="footer">
            <Menu.Item
              onClick={() => {
                handlerModal("artist");
              }}
            >
              <Icon name="plus square outline" /> New Artist
            </Menu.Item>
            <Menu.Item
              onClick={() => {
                handlerModal("album");
              }}
            >
              <Icon name="plus square outline" /> New Album
            </Menu.Item>
            <Menu.Item
              onClick={() => {
                handlerModal("song");
              }}
            >
              <Icon name="plus square outline" /> New song
            </Menu.Item>
          </div>
        )}
      </Menu>
      <BasicModal show={showModal} setShow={setShowModal} title={titleModal}>
        {contentModal}
      </BasicModal>
    </>
  );
};

export default withRouter(MenuLeft);

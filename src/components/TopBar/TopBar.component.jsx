import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Icon, Image } from "semantic-ui-react";
import firebase from "../../utils/firebase";
import UserImage from "../../assets/png/user.png";
import "./TopBar.styles.scss";

const TopBar = ({ user, history }) => {
  const logout = () => {
    firebase.auth().signOut();
  };
  const goBack = (history) => {
    history.goBack();
  };

  return (
    <div className="top-bar">
      <div className="top-bar__left">
        <Icon className="angle left" onClick={() => goBack(history)} />
      </div>
      <div className="top-bar__right">
        <Link to="/settings">
          <Image src={UserImage} />
          {user.displayName}
        </Link>
        <Icon className="power off" onClick={logout} />
      </div>
    </div>
  );
};

export default withRouter(TopBar);

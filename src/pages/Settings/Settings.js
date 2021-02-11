import React, { useState } from "react";
import "./Settings.scss";
// components
import UploadAvatar from "../../components/Settings/UploadAvatar";

const Settings = ({ user, setReloadApp }) => {
  return (
    <div className="settings">
      <h1>Settings </h1>
      <div className="avatar-name">
        <UploadAvatar user={user} setReloadApp={setReloadApp} />
        <h2>Username</h2>
      </div>
    </div>
  );
};

export default Settings;

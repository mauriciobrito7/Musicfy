import React, { useState } from "react";
import "./Settings.scss";
// components
import UploadAvatar from "../../components/Settings/UploadAvatar";
import UserName from "../../components/Settings/UserName";
import UserEmail from "../../components/Settings/UserEmail";
import BasicModal from "../../components/Modal/BasicModal/BasicModal.component";
import UserPassword from "../../components/Settings/UserPassword";

const Settings = ({ user, setReloadApp }) => {
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [contentModal, setContentModal] = useState(null);

  return (
    <div className="settings">
      <h1>Settings </h1>
      <div className="avatar-name">
        <UploadAvatar user={user} setReloadApp={setReloadApp} />
        <UserName
          user={user}
          setShowModal={setShowModal}
          setTitleModal={setTitleModal}
          setContentModal={setContentModal}
          setReloadApp={setReloadApp}
        />
      </div>
      <UserEmail
        user={user}
        setShowModal={setShowModal}
        setTitleModal={setTitleModal}
        setContentModal={setContentModal}
      />
      <UserPassword
        user={user}
        setShowModal={setShowModal}
        setTitleModal={setTitleModal}
        setContentModal={setContentModal}
      />
      <BasicModal show={showModal} setShow={setShowModal} title={titleModal}>
        {contentModal}
      </BasicModal>
    </div>
  );
};

export default Settings;

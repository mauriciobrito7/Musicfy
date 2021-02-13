import React, { useState } from "react";
import { Button, Form, Input } from "semantic-ui-react";
import firebase from "../../utils/firebase";

const UserName = ({
  user,
  setShowModal,
  setTitleModal,
  setContentModal,
  setReloadApp,
}) => {
  const onEdit = () => {
    setTitleModal("actualizar nombre");
    setContentModal(
      <ChangeDisplayNameForm
        displayName={user.displayName}
        setShowModal={setShowModal}
        setReloadApp={setReloadApp}
      />
    );
    setShowModal(true);
  };

  return (
    <div className="user-name">
      <h2>{user.displayName}</h2>
      <Button circular onClick={onEdit}>
        Actualizar
      </Button>
    </div>
  );
};

export default UserName;

const ChangeDisplayNameForm = (props) => {
  const { displayName, setShowModal, setReloadApp } = props;
  const [formData, setFormData] = useState({ displayName: displayName });
  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = () => {
    if (!formData.displayName || formData.displayName === displayName) {
      setShowModal(false);
    } else {
      setIsLoading(true);
      firebase
        .auth()
        .currentUser.updateProfile({ displayName: formData.displayName })
        .then(() => {
          setReloadApp((prevState) => !prevState);
          console.log("nombre actualizado");
          setIsLoading(false);
        })
        .catch(() => {
          console.log("error al actualizar el nombre");
        })
        .finally(() => {
          setShowModal(false);
        });
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <Form.Field>
        <Input
          defaultValue={displayName}
          onChange={(e) => {
            setFormData({ displayName: e.target.value });
          }}
        />
      </Form.Field>
      <Button type="submit" loading={isLoading}>
        actualizar nombre
      </Button>
    </Form>
  );
};

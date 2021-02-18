import React, { useState } from "react";
import { Button, Form, Input, Icon } from "semantic-ui-react";
import { reauthenticate } from "../../utils/Api";
import alertErrors from "../../utils/AlertErrors";
import firebase from "../../utils/firebase";

const UserEmail = ({ user, setShowModal, setTitleModal, setContentModal }) => {
  const onEdit = () => {
    setTitleModal("Actualizar el email");
    setContentModal(
      <ChangeEmailForm email={user.email} setShowModal={setShowModal} />
    );
    setShowModal(true);
  };

  return (
    <div className="user-email">
      <h3>Email: {user.email}</h3>
      <Button circular onClick={onEdit}>
        Actualizar
      </Button>
    </div>
  );
};

function ChangeEmailForm({ email, setShowModal }) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setformData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = () => {
    if (!formData.email) {
      console.log("el email es el mismo");
    } else {
      setIsLoading(true);
      reauthenticate(formData.password)
        .then(() => {
          const currentUser = firebase.auth().currentUser;
          currentUser
            .updateEmail(formData.email)
            .then(() => {
              console.log("email actualizado");
              setIsLoading(false);
              setShowModal(false);
              currentUser.sendEmailVerification().then(() => {
                firebase.auth().signOut();
              });
            })
            .catch((err) => {
              console.log(err?.code);
              setIsLoading(false);
            });
        })
        .catch((error) => {
          console.log(`error ${error}`);
          alertErrors(error?.code);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <Form.Field>
        <Input
          defaultValue={email}
          type="text"
          onChange={(e) => {
            setformData({ ...formData, email: e.target.value });
          }}
        />
      </Form.Field>
      <Form.Field>
        <Input
          placeholder="Contrasena"
          onChange={(e) => {
            setformData({ ...formData, password: e.target.value });
          }}
          type={`${showPassword ? "text" : "password"}`}
          icon={
            <Icon
              onClick={() => {
                setShowPassword((prevState) => !prevState);
              }}
              name={`${showPassword ? "eye slash outline" : "eye"}`}
              link
            />
          }
        />
      </Form.Field>
      <Button type="submit" loading={isLoading}>
        Actualizar
      </Button>
    </Form>
  );
}

export default UserEmail;

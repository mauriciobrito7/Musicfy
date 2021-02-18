import React, { useState } from "react";
import { Button, Form, Input, Icon } from "semantic-ui-react";
import { reauthenticate } from "../../utils/Api";
import firebase from "../../utils/firebase";

const UserPassword = ({
  user,
  setShowModal,
  setTitleModal,
  setContentModal,
}) => {
  const onEdit = () => {
    setTitleModal("Actualizar contrasena");
    setContentModal(<ChangePasswordForm setShowModal={setShowModal} />);
    setShowModal(true);
  };

  return (
    <div className="user-password">
      <h3>Password: *** *** *** ***</h3>
      <Button circular onClick={onEdit}>
        Update
      </Button>
    </div>
  );
};

function ChangePasswordForm({ setShowModal }) {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    repeatNewPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = () => {
    console.log(formData);
    if (
      !formData.currentPassword ||
      !formData.newPassword ||
      !formData.repeatNewPassword
    ) {
      console.log("Las contraseñas no puedes estar vacias.");
    } else if (formData.currentPassword === formData.newPassword) {
      console.log("La nueva contraseña no puede ser igual a la actual.");
    } else if (formData.newPassword !== formData.repeatNewPassword) {
      console.log("Las nuevas contraseñas no son iguales.");
    } else if (formData.newPassword.length < 6) {
      console.log("La contraseña tiene que tener minimo 6 caracteres.");
    } else {
      setIsLoading(true);
      reauthenticate(formData.currentPassword)
        .then(() => {
          const currentUser = firebase.auth().currentUser;
          currentUser
            .updatePassword(formData.newPassword)
            .then(() => {
              console.log("Contraseña actualizada.");
              setIsLoading(false);
              setShowModal(false);
              firebase.auth().signOut();
            })
            .catch((err) => {
              console.log(err?.code);
              setIsLoading(false);
            });
        })
        .catch((err) => {
          console.log(err?.code);
          setIsLoading(false);
        });
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <Form.Field>
        <Input
          placeholder="Current password"
          type={showPassword ? "text" : "password"}
          onChange={(e) =>
            setFormData({ ...formData, currentPassword: e.target.value })
          }
          icon={
            <Icon
              name={showPassword ? "eye slash outline" : "eye"}
              link
              onClick={() => setShowPassword(!showPassword)}
            />
          }
        />
      </Form.Field>
      <Form.Field>
        <Input
          placeholder="New password"
          type={showPassword ? "text" : "password"}
          onChange={(e) =>
            setFormData({ ...formData, newPassword: e.target.value })
          }
          icon={
            <Icon
              name={showPassword ? "eye slash outline" : "eye"}
              link
              onClick={() => setShowPassword(!showPassword)}
            />
          }
        />
      </Form.Field>

      <Form.Field>
        <Input
          placeholder="Repeat new password"
          type={showPassword ? "text" : "password"}
          onChange={(e) =>
            setFormData({ ...formData, repeatNewPassword: e.target.value })
          }
          icon={
            <Icon
              name={showPassword ? "eye slash outline" : "eye"}
              link
              onClick={() => setShowPassword(!showPassword)}
            />
          }
        />
      </Form.Field>
      <Button type="submit" loading={isLoading}>
        Update
      </Button>
    </Form>
  );
}

export default UserPassword;

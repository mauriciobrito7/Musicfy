import React, { useState } from "react";
import { Button, Icon, Form, Input } from "semantic-ui-react";
import { validateEmail } from "../../utils/Validations";
import firebase from "../../utils/firebase";

import "./RegisterForm.styles.scss";

export const RegisterForm = (props) => {
  const { setSelectedForm } = props;
  const [formData, setFormData] = useState(defaultValueForm());
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlerShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = () => {
    setFormError({});
    let errors = {};
    let formOk = true;

    if (!validateEmail(formData.email)) {
      errors.email = true;
      formOk = false;
    }

    if (formData.password.length < 6) {
      errors.password = true;
      formOk = false;
    }

    if (!formData.username) {
      errors.username = true;
      formOk = false;
    }
    setFormError(errors);
    if (formOk) {
      setIsLoading(true);
      firebase
        .auth()
        .createUserWithEmailAndPassword(formData.email, formData.password)
        .then(() => {
          console.log("Registro completado");
          changeUserName();
          sendVerificationEmail();
        })
        .catch(() => {
          console.log("Error al crear la cuenta");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const changeUserName = () => {
    firebase
      .auth()
      .changeUser.updateProfile({
        displayName: formData.username,
      })
      .catch(() => {
        console.error("Error al asignar el nombre de usuario");
      });
  };

  const sendVerificationEmail = () => {
    firebase
      .auth()
      .currentUser.sendEmailVerification()
      .then(() => {
        console.log("Se ha enviado un email de verificacion");
      })
      .catch(() => {
        console.error("Error al enviar el email de verificacion");
      });
  };

  return (
    <div className="register-form ">
      <h1>Empieza a escuchar con una cuenta de Musicfy gratis</h1>
      <Form onSubmit={onSubmit} onChange={onChange}>
        <Form.Field>
          <Input
            type="text"
            name="email"
            placeholder="Correo electronico"
            icon="mail outline"
            error={formError.email}
          />
          {formError.email && (
            <span className="error-text">
              Por favor, introduce un correo electronico valido
            </span>
          )}
        </Form.Field>

        <Form.Field>
          <Input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Contrasena"
            icon={
              showPassword ? (
                <Icon
                  name="eye slash outline"
                  link
                  onClick={handlerShowPassword}
                />
              ) : (
                <Icon name="eye" link onClick={handlerShowPassword} />
              )
            }
            error={formError.password}
          />
          {formError.password && (
            <span className="error-text">
              La contrasena debe ser mayor a 5 caracteres
            </span>
          )}
        </Form.Field>
        <Form.Field>
          <Input
            type="text"
            name="username"
            placeholder="Como deberiamos llamarte?"
            icon="user circle outline"
            error={formError.username}
          />
          {formError.username && (
            <span className="error-text">Por favor introduce un nombre</span>
          )}
        </Form.Field>
        <Button type="submit" loading={isLoading}>
          Continuar
        </Button>

        <div className="register-form__options">
          <p
            onClick={() => {
              setSelectedForm(null);
            }}
          >
            Volver
          </p>
          <p>
            Ya tienes Musicfy?{" "}
            <span
              onClick={() => {
                setSelectedForm("login");
              }}
            >
              Iniciar Sesion
            </span>
          </p>
        </div>
      </Form>
    </div>
  );
};

function defaultValueForm() {
  return {
    email: "",
    password: "",
    username: "",
  };
}

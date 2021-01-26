import React, { useState } from "react";
import { Button, Form, Input, Icon } from "semantic-ui-react";
import { validateEmail } from "../../utils/Validations";
import { firebase } from "../../utils/firebase";
import "./LoginForm.styles.scss";

export const LoginForm = (props) => {
  const { setSelectedForm } = props;
  const [showPassword, setShowPassword] = useState(false);

  const handlerShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = () => {};
  return (
    <div className="login-form">
      <h1>Musica para todos</h1>
      <Form onSubmit={onSubmit}>
        <Form.Field>
          <Input
            type="text"
            name="email"
            placeholder="Correo electronico"
            icon="mail outline"
            // error={}
          />
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
            // error={}
          />
        </Form.Field>
        <Button type="submit">Iniciar sesion</Button>
      </Form>
      <div className="login-form__options">
        <p
          onClick={() => {
            setSelectedForm(null);
          }}
        >
          Volver
        </p>
        <p>
          No tienes cuenta?
          <span
            onClick={() => {
              setSelectedForm("register");
            }}
          >
            Registrarte
          </span>
        </p>
      </div>
    </div>
  );
};

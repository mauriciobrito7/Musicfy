import React from "react";
import { Button, Icon, Form, Input } from "semantic-ui-react";
import firebase from "../../utils/firebase";

import "./RegisterForm.styles.scss";

export const RegisterForm = (props) => {
  const { setSelectedForm } = props;

  const onSubmit = () => {
    console.log("Formulario enviado");
  };

  return (
    <div className="register-form ">
      <h1>Empieza a escuchar con una cuenta de Musicfy gratis</h1>
      <Form onSubmit={onSubmit}>
        <Form.Field>
          <Input
            type="text"
            name="email"
            placeholder="Correo electronico"
            icon="mail outline"
            //onChange={}
            //error={}
          />
        </Form.Field>

        <Form.Field>
          <Input
            type="password"
            name="password"
            placeholder="Contrasena"
            icon="eye"
            //onChange={}
            //error={}
          />
        </Form.Field>
        <Form.Field>
          <Input
            type="text"
            name="username"
            placeholder="Como deberiamos llamarte?"
            icon="user circle outline"
            //onChange={}
            //error={}
          />
        </Form.Field>
        <Button type="submit">Continuar</Button>
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

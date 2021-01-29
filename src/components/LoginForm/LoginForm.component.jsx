import React, { useState } from "react";
import { Button, Form, Input, Icon } from "semantic-ui-react";
import { validateEmail } from "../../utils/Validations";
import firebase from "../../utils/firebase";
import "./LoginForm.styles.scss";
import { toast } from "react-toastify";

export const LoginForm = (props) => {
  const { setSelectedForm } = props;
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(defaultValueForm());
  const [formError, setFormError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userActive, setUserActive] = useState(true);
  const [user, setUser] = useState(null);

  const handlerShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
    setFormError(errors);

    if (formOk) {
      setIsLoading(true);
      firebase
        .auth()
        .signInWithEmailAndPassword(formData.email, formData.password)
        .then((res) => {
          console.log(user);
          setUser(res.user);
          setUserActive(res.user.emaiVerified);
          if (!res.user.emailVerified) {
            toast.warning("Debes verificar tu email para ingresar");
          }
        })
        .catch((err) => {
          console.log(err);

          handlerErrors(err.code);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };
  return (
    <div className="login-form">
      <h1>Musica para todos</h1>
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
            <span className="error-text">Contrasena incorrecta</span>
          )}
        </Form.Field>
        <Button type="submit" loading={isLoading}>
          Iniciar sesion
        </Button>
      </Form>
      {!userActive && (
        <ButtonResetSendEmailVerification
          user={user}
          setIsLoading={setIsLoading}
          serUserActive={setUserActive}
        />
      )}

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

function ButtonResetSendEmailVerification(props) {
  const { user, setIsLoading, setUserActive } = props;

  const resendVerificationEmail = () => {
    user
      .sendEmailVerification()
      .then(() => {
        toast.success("Se ha enviado el email de verificacion");
      })
      .catch((err) => {
        handlerErrors(err.code);
      })
      .finally(() => {
        setIsLoading(false);
        setUserActive(true);
      });
  };

  return (
    <div className="resend-verification-email">
      <p>
        Si no ha recibido el email de verificacion puedes volver a enviarlo
        haciendo click
        <span onClick={resendVerificationEmail}>aqui</span>
      </p>
    </div>
  );
}

function handlerErrors(code) {
  switch (code) {
    case "auth/wrong-password":
      toast.error("El usuario o la contrasena son incorrectos");
      break;
    case "auth/too-many-requests":
      toast.error(
        "Has enviado demasiadas solicitudes de reenvio de email de confirmacion en muy poco tiempo"
      );
      break;
    case "auth/user-not-found ":
      toast.error("El usuario o la contrasena son incorrectos");
      break;
    default:
      break;
  }
}

function defaultValueForm() {
  return {
    email: "",
    password: "",
    username: "",
  };
}

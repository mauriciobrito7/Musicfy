import React, { useState } from "react";
import { AuthOptions } from "../../components/AuthOptions/AuthOptions.component";
import { LoginForm } from "../../components/LoginForm/LoginForm.component";
import { RegisterForm } from "../../components/RegisterForm/RegisterForm.component";

import BackgroundAuth from "../../assets/jpg/background-auth.jpg";
import LogoNameWhite from "../../assets/png/logo-name-white.png";
import "./Auth.styles.scss";

export const Auth = () => {
  const [selectedForm, setSelectedForm] = useState(null);

  const handlerForm = () => {
    switch (selectedForm) {
      case "login":
        return <LoginForm setSelectedForm={setSelectedForm} />;
      case "register":
        return <RegisterForm setSelectedForm={setSelectedForm} />;
      default:
        return <AuthOptions setSelectedForm={setSelectedForm} />;
    }
  };

  return (
    <div className="auth" style={{ backgroundImage: `url(${BackgroundAuth})` }}>
      <div className="auth__dark" />
      <div className="auth__box">
        <div className="auth__box-logo">
          <img src={LogoNameWhite} alt="Musicfy" />
        </div>
        {handlerForm()}
      </div>
    </div>
  );
};

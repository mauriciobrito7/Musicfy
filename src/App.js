import React, { useState } from "react";
import firebase from "./utils/firebase";
import { Auth } from "./pages/Auth/Auth";
import { ToastContainer } from "react-toastify";
import { LoggedLayout } from "./layouts/LoggedLayout/LoggedLayout";

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [reloadApp, setReloadApp] = useState(false);

  firebase.auth().onAuthStateChanged((currentUser) => {
    if (!currentUser?.emailVerified) {
      firebase.auth().signOut();
      setUser(null);
    } else {
      setUser(currentUser);
    }
    setIsLoading(false);
  });

  if (isLoading) {
    return "Loading";
  }

  return (
    <>
      {!user ? (
        <Auth />
      ) : (
        <LoggedLayout user={user} setReloadApp={setReloadApp} />
      )}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        puaseOnVisibilityChange
        draggable
        pauseOnHover={false}
      />
    </>
  );
}

export default App;
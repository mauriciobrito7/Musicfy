import React, { useState } from "react";
import firebase from "./utils/firebase";
import { Auth } from "./pages/Auth/Auth";
import { LoggedLayout } from "./layouts/LoggedLayout/LoggedLayout";
import { Loader } from "semantic-ui-react";

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [setReloadApp] = useState(false);

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
    return <Loader>Loading...</Loader>;
  }

  return (
    <>
      {!user ? (
        <Auth />
      ) : (
        <LoggedLayout user={user} setReloadApp={setReloadApp} />
      )}
    </>
  );
}

export default App;

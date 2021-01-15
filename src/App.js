import React, { useState } from "react";
import firebase from './utils/firebase'
import { Auth } from './pages/Auth/Auth'

function App() {

  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  firebase.auth().onAuthStateChanged(currentUser => {
    if(!currentUser) {
      setUser(null)
    }else {
      setUser(currentUser)
    }
    setIsLoading(false)
  })

  if(isLoading) {
    return 'Loading'
  }

  return (
    !user ? <Auth /> : <h1>Usuario logeado</h1>
  );
}

export default App;

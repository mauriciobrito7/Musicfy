
import firebase from './utils/firebase'

function App() {
  firebase.auth().onAuthStateChanged(currentUser => {
    console.log(currentUser ? 'Estamos logeado' : 'No esta loggeado')
  })
  return (
    <div className="App">
      <h1>Electron</h1>
    </div>
  );
}

export default App;

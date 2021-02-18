export default function alertErrors(type) {
  switch (type) {
    case "auth/wrong-password":
      console.log("La contrasena introducida es incorrecta");
      break;
    case "auth/email-already-in-use":
      console.log("El nuevo email ya esta en uso");
      break;
    default:
      console.log("El servidor no respode intentelo mas tarde");
      break;
  }
}

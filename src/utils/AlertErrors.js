export default function alertErrors(type) {
  switch (type) {
    case "auth/wrong-password":
      console.log("La contrasena introducida es incorrecta");
      break;
    default:
      console.log("El servidor no respode intentelo mas tarde");
      break;
  }
}

import firebase from "./firebase";

const db = firebase.firestore();

export async function isUserAdmin(uid) {
  const response = await db.collection("admins").doc(uid).get();

  return response.exists;
}

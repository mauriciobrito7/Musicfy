import React, { useState, useCallback } from "react";
import NoAvatar from "../../assets/png/user.png";
import { Image } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import firebase from "../../utils/firebase";

const UploadAvatar = ({ user, setReloadApp }) => {
  const [avatarUrl, setAvatarUrl] = useState(user.photoURL);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setAvatarUrl(URL.createObjectURL(file));
    uploadImage(file).then(() => {
      updateUserAvatar();
    });
  });
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/jpeg, image/png",
    noKeyboard: true,
    onDrop,
  });

  const uploadImage = (file) => {
    console.log(file);
    const ref = firebase.storage().ref().child(`avatar/${user.uid}`);
    return ref.put(file);
  };

  const updateUserAvatar = () => {
    firebase
      .storage()
      .ref(`avatar/${user.uid}`)
      .getDownloadURL()
      .then(async (response) => {
        await firebase.auth().currentUser.updateProfile({ photoURL: response });
        setReloadApp((prevState) => !prevState);
      })
      .catch(() => {
        console.log("error");
      })
      .finally(() => {
        console.log("se ha actualizado correctamente");
      });
  };

  return (
    <div className="user-avatar" {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <Image src={NoAvatar} />
      ) : (
        <Image src={avatarUrl ? avatarUrl : NoAvatar} />
      )}
    </div>
  );
};

export default UploadAvatar;

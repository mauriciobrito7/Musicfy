import React, { useState, useCallback } from "react";
import { Form, Input, Button, Image } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import { v4 as uuid } from "uuid";
import firebase from "../../../utils/firebase";
import "./AddArtist.scss";
import NoImage from "../../../assets/png/no-image.png";

const AddArtist = ({ setShowModal }) => {
  const initialValueForm = () => {
    return {
      name: "",
    };
  };

  const [formData, setFormData] = useState(initialValueForm());
  const [banner, setBanner] = useState(null);
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const resetForm = () => {
    setFormData(initialValueForm());
    setFile(null);
    setBanner(null);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onDrop = useCallback((acceptedFile) => {
    const file = acceptedFile[0];
    setFile(file);
    setBanner(URL.createObjectURL(file));
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png",
    noKeyboard: true,
    onDrop,
  });

  const uploadImage = (fileName) => {
    const ref = firebase.storage().ref().child(`artist/${fileName}`);
    return ref.put(file);
  };

  const onSubmit = () => {
    if (!formData.name) {
      console.warning("Añade el nombre del artista.");
    } else if (!file) {
      console.warning("Añade la imagen del artista.");
    } else {
      setIsLoading(true);
      const fileName = uuid();
      uploadImage(fileName)
        .then(() => {
          firebase
            .firestore()
            .collection("artists")
            .add({ name: formData.name, banner: fileName })
            .then(() => {
              console.log("Artista creado correctamente.");
              setIsLoading(false);
              resetForm();
              setShowModal(false);
            })
            .catch(() => {
              console.log("Error al crear el artista.");
              setIsLoading(false);
            });
        })
        .catch(() => {
          console.error("Error al subir la imagen.");
          setIsLoading(false);
        });
    }
  };

  return (
    <Form className="add-artist-form" onSubmit={onSubmit}>
      <Form.Field className="artist-banner">
        <div
          {...getRootProps()}
          className="banner"
          style={{ backgroundImage: `url('${banner}')` }}
        />
        <input {...getInputProps()} />
        {!banner && <Image src={NoImage} />}
      </Form.Field>
      <Form.Field className="artist-avatar">
        <div
          className="avatar"
          style={{ backgroundImage: `url('${banner ? banner : NoImage}')` }}
        />
      </Form.Field>
      <Form.Field>
        <Input
          placeholder="Nombre del artista"
          onChange={(e) => setFormData({ name: e.target.value })}
        />
      </Form.Field>
      <Button type="submit" loading={isLoading}>
        Crear artista
      </Button>
    </Form>
  );
};

export default AddArtist;

import React, { useState, useEffect, useCallback } from "react";
import { Form, Input, Button, Image, Dropdown } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import { v4 as uuid } from "uuid";
import firebase from "../../../utils/firebase";
import NoImage from "../../../assets/png/no-image.png";
import "./AddAlbumForm.scss";

const AddAlbumForm = ({ setShowModal }) => {
  const [artists, setArtists] = useState([]);
  const [formData, setFormData] = useState(initialValueForm());
  const [albumImage, setAlbumImage] = useState(null);
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    firebase
      .firestore()
      .collection("artists")
      .get()
      .then((artists) => {
        const arrayArtists = artists?.docs.map((artist) => {
          const data = artist.data();
          return {
            key: artist.id,
            value: artist.id,
            text: data.name,
          };
        });
        setArtists(arrayArtists);
      });
  }, []);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setFile(file);
    setAlbumImage(URL.createObjectURL(file));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png",
    noKeyboard: true,
    onDrop,
  });

  const uploadImage = (fileName) => {
    const ref = firebase.storage().ref().child(`album/${fileName}`);
    return ref.put(file);
  };

  const onSubmit = () => {
    if (!formData.name || !formData.artist) {
      console.log("El nombre del álbum y el artista son obligatorios.");
    } else if (!file) {
      console.log("La imagen del album es obligatoria.");
    } else {
      setIsLoading(true);
      const fileName = uuid();
      uploadImage(fileName)
        .then(() => {
          firebase
            .firestore()
            .collection("albums")
            .add({
              name: formData.name,
              artist: formData.artist,
              banner: fileName,
            })
            .then(() => {
              console.log("Album creado.");
              resetForm();
              setIsLoading(false);
              setShowModal(false);
            })
            .catch(() => {
              console.log("Error al crear el album.");
              setIsLoading(false);
            });
        })
        .catch(() => {
          console.log("Error al subir la imagen del álbum.");
          setIsLoading(false);
        });
    }
  };

  const resetForm = () => {
    setFormData(initialValueForm());
    setFile(null);
    setAlbumImage(null);
  };

  return (
    <Form className="add-album-form" onSubmit={onSubmit}>
      <Form.Group>
        <Form.Field className="album-avatar" width={5}>
          <div
            {...getRootProps()}
            className="avatar"
            style={{
              backgroundImage: `url('${albumImage}')`,
            }}
          />
          <input {...getInputProps()} />
          {!albumImage && <Image src={NoImage} />}
        </Form.Field>
        <Form.Field className="album-inputs" width={11}>
          <Input
            placeholder="Name of the album"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />

          <Dropdown
            placeholder="The album belongs to..."
            fluid
            search
            selection
            options={artists}
            lazyLoad
            onChange={(e, data) =>
              setFormData({ ...formData, artist: data.value })
            }
          />
        </Form.Field>
      </Form.Group>
      <Button type="submit" loading={isLoading}>
        Add new album
      </Button>
    </Form>
  );
};

function initialValueForm() {
  return {
    name: "",
    artist: "",
  };
}

export default AddAlbumForm;

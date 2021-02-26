import React, { useState, useEffect, useCallback } from "react";
import { Form, Input, Button, Icon, Dropdown } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import { v4 as uuid } from "uuid";
import firebase from "../../../utils/firebase";
import "./AddSongForm.scss";

const AddSongForm = ({ setShowModal }) => {
  const [formData, setFormData] = useState(initialValueForm());
  const [albums, setAlbums] = useState([]);
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    firebase
      .firestore()
      .collection("albums")
      .get()
      .then((albums) => {
        const albumsArray =
          albums?.docs.map((album) => {
            const data = album.data();
            return {
              key: album.id,
              value: album.id,
              text: data.name,
            };
          }) || [];
        setAlbums(albumsArray);
      });
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setFile(file);
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: ".mp3",
    noKeyboard: true,
    onDrop,
  });

  const uploadSong = (fileName) => {
    const ref = firebase.storage().ref().child(`song/${fileName}`);
    return ref.put(file);
  };

  const onSubmit = () => {
    if (!formData.name || !formData.album) {
      console.log(
        "El nombre de la canción y el álbum al que pertence son obligatorios."
      );
    } else if (!file) {
      console.log("La cación es obligatoria.");
    } else {
      setIsLoading(true);
      const fileName = uuid();
      uploadSong(fileName)
        .then(() => {
          firebase
            .firestore()
            .collection("songs")
            .add({
              name: formData.name,
              album: formData.album,
              fileName: fileName,
            })
            .then(() => {
              console.log("Canción subida correctamente.");
              resetForm();
              setIsLoading(false);
              setShowModal(false);
            })
            .catch(() => {
              console.log("Error al subir la canción.");
              setIsLoading(false);
            });
        })
        .catch(() => {
          console.log("Error al subir la canción.");
          setIsLoading(false);
        });
    }
  };

  const resetForm = () => {
    setFormData(initialValueForm());
    setFile(null);
    setAlbums([]);
  };

  return (
    <Form className="add-song-form" onSubmit={onSubmit}>
      <Form.Field>
        <Input
          placeholder="Name of song"
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </Form.Field>
      <Form.Field>
        <Dropdown
          placeholder="Assign the song to an album"
          search
          selection
          lazyLoad
          options={albums}
          onChange={(e, data) =>
            setFormData({ ...formData, album: data.value })
          }
        />
      </Form.Field>
      <Form.Field>
        <div className="song-upload" {...getRootProps()}>
          <input {...getInputProps()} />
          <Icon name="cloud upload" className={file && "load"} />
          <div>
            <p>
              Drag your song or click <span>here</span>.
            </p>
            {file && (
              <p>
                Song uploaded: <span>{file.name}</span>
              </p>
            )}
          </div>
        </div>
      </Form.Field>
      <Button type="submit" loading={isLoading}>
        Upload song
      </Button>
    </Form>
  );
};

export default AddSongForm;

function initialValueForm() {
  return {
    name: "",
    album: "",
  };
}

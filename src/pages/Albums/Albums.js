import React, { useState, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import { Link } from "react-router-dom";
import firebase from "../../utils/firebase";

import "./Albums.scss";

const Albums = () => {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection("albums")
      .get()
      .then((albums) => {
        const arrayAlbums =
          albums?.docs.map((album) => {
            const data = album.data();
            data.id = album.id;
            return data;
          }) || [];
        setAlbums(arrayAlbums);
      });
  }, []);

  return (
    <div className="albums">
      <h1>Álbumes</h1>
      <Grid>
        {albums.map((album) => (
          <Grid.Column key={album.id} mobile={8} tablet={4} computer={3}>
            <Album album={album} />
          </Grid.Column>
        ))}
      </Grid>
    </div>
  );
};

export default Albums;

function Album(props) {
  const { album } = props;
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    firebase
      .storage()
      .ref(`album/${album.banner}`)
      .getDownloadURL()
      .then((url) => {
        setImageUrl(url);
      });
  }, [album]);

  return (
    <Link to={`/album/${album.id}`}>
      <div className="albums__item">
        <div
          className="avatar"
          style={{ backgroundImage: `url('${imageUrl}')` }}
        />
        <h3>{album.name}</h3>
      </div>
    </Link>
  );
}

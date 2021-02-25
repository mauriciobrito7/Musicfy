import React, { useState, useEffect } from "react";
import firebase from "../../utils/firebase";
import { Loader } from "semantic-ui-react";
import { withRouter } from "react-router-dom";

import "./Album.scss";

const Album = ({ match, playerSong }) => {
  const [album, setAlbum] = useState(null);
  const [albumImg, setAlbumImg] = useState(null);
  const [artist, setArtist] = useState(null);

  useEffect(() => {
    firebase
      .firestore()
      .collection("albums")
      .doc(match.params.id)
      .get()
      .then((response) => {
        const data = response.data();
        data.id = response.id;
        setAlbum(data);
      });
  }, [match]);

  useEffect(() => {
    if (album) {
      firebase
        .storage()
        .ref(`album/${album?.banner}`)
        .getDownloadURL()
        .then((url) => {
          setAlbumImg(url);
        });
    }
  }, [album]);

  useEffect(() => {
    if (album) {
      firebase
        .firestore()
        .collection("artists")
        .doc(album?.artist)
        .get()
        .then((response) => {
          setArtist(response.data());
        });
    }
  }, [album]);

  if (!album || !artist) {
    return <Loader active>Loading...</Loader>;
  }

  return (
    <div className="album">
      <div className="album__header">
        <HeaderAlbum album={album} albumImg={albumImg} artist={artist} />
      </div>
      <div className="album__songs">
        {/* <ListSongs songs={songs} albumImg={albumImg} playerSong={playerSong} /> */}
      </div>
    </div>
  );
};

export default withRouter(Album);

function HeaderAlbum({ album, albumImg, artist }) {
  return (
    <>
      <div
        className="image"
        style={{ backgroundImage: `url('${albumImg}')` }}
      />
      <div className="info">
        <h1>{album.name}</h1>
        <p>
          from <span>{artist.name}</span>
        </p>
      </div>
    </>
  );
}

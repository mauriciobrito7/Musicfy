import React, { useState, useEffect } from "react";
import "./Artist.scss";
import { withRouter } from "react-router-dom";
import firebase from "../../utils/firebase";
import BannerArtist from "../../components/Artists/BannerArtist/BannerArtist";
import BasicSliderItems from "../../components/Sliders/BasicSliderItems/BasicSliderItems";

const Artist = (props) => {
  const { params } = props.match;
  const [artist, setArtist] = useState(null);
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection("artists")
      .doc(params?.id)
      .get()
      .then((doc) => {
        const data = doc.data();
        data.id = doc.id;
        setArtist(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [params]);

  useEffect(() => {
    console.log(artist);
    if (artist) {
      firebase
        .firestore()
        .collection("albums")
        .where("artist", "==", artist.id)
        .get()
        .then((albums) => {
          const arrayAlbums = albums?.docs.map((album) => {
            const data = album.data();
            data.id = album.id;
            return data;
          });
          setAlbums(arrayAlbums);
        });
    }
  }, [artist]);

  return (
    <div className="artist">
      {artist && <BannerArtist artist={artist} />}
      <div className="artist__content">
        <BasicSliderItems
          title="Álbumes"
          data={albums}
          folderImage="album"
          urlName="album"
        />
      </div>
    </div>
  );
};

export default withRouter(Artist);

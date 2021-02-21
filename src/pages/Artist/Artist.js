import React, { useState, useEffect } from "react";
import "./Artist.scss";
import { withRouter } from "react-router-dom";
import firebase from "../../utils/firebase";
import BannerArtist from "../../components/Artists/BannerArtist/BannerArtist";

const Artist = (props) => {
  const { params } = props.match;
  const [artist, setArtist] = useState(null);

  useEffect(() => {
    firebase
      .firestore()
      .collection("/artists")
      .doc(params?.id)
      .get()
      .then((doc) => {
        const data = doc.data();
        setArtist(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [params]);

  return (
    <div className="artist">{artist && <BannerArtist artist={artist} />}</div>
  );
};

export default withRouter(Artist);

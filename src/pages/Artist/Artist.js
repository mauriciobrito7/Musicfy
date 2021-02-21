import React, { useState, useEffect } from "react";
import "./Artist.scss";
import { withRouter } from "react-router-dom";
import firebase from "../../utils/firebase";

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

  return <div>{artist && <h2>{artist.name}</h2>}</div>;
};

export default withRouter(Artist);

import React, { useState, useEffect } from "react";
import firebase from "../../../utils/firebase";
import "./BannerArtist.scss";

const BannerArtist = ({ artist }) => {
  const [bannerUrl, setBannerUrl] = useState(null);
  console.log(bannerUrl);

  useEffect(() => {
    firebase
      .storage()
      .ref(`/artist/${artist?.banner}`)
      .getDownloadURL()
      .then(setBannerUrl);
  }, [artist]);
  return (
    <div
      className="banner-artist"
      style={{ backgroundImage: `url('${bannerUrl}')` }}
    >
      <div className="banner-artist__gradient" />
      <div className="banner-artist__info">
        <h4>ARTISTA</h4>
        <h1>{artist.name}</h1>
      </div>
    </div>
  );
};

export default BannerArtist;

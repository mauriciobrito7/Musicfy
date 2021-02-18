import React, { useState, useEffect } from "react";
import BannerHome from "../../components/BannerHome/BannerHome";
import "./Home.scss";
import firebase from "../../utils/firebase";

const Home = () => {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection("artists")
      .get()
      .then(({ docs }) => {
        const artistsArray =
          docs?.map((artist) => {
            const data = artist.data();
            const id = artist.id;
            data.id = id;
            return data;
          }) || [];

        setArtists(artistsArray);
      });
  }, []);

  return (
    <div className="home">
      <BannerHome />
      <h1>Home</h1>
    </div>
  );
};

export default Home;

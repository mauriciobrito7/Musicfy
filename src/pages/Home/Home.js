import React, { useState, useEffect } from "react";
import BannerHome from "../../components/BannerHome/BannerHome";
import "./Home.scss";
import firebase from "../../utils/firebase";
import BasicSliderItems from "../../components/Sliders/BasicSliderItems/BasicSliderItems";

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
    <>
      <BannerHome />
      <div className="home">
        <BasicSliderItems
          title="last artists"
          folderImage="artist"
          urlName="artist"
          data={artists}
        />
        <h1>Home</h1>
      </div>
    </>
  );
};

export default Home;

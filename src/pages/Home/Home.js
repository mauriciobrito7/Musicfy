import React, { useState, useEffect } from "react";
import BannerHome from "../../components/BannerHome/BannerHome";
import "./Home.scss";
import firebase from "../../utils/firebase";
import BasicSliderItems from "../../components/Sliders/BasicSliderItems/BasicSliderItems";

const Home = () => {
  const [artists, setArtists] = useState([]);
  const [albums, setAlbums] = useState([]);

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
    <>
      <BannerHome />
      <div className="home">
        <BasicSliderItems
          title="last artists"
          folderImage="artist"
          urlName="artist"
          data={artists}
        />

        <BasicSliderItems
          title="Últimos álbumes"
          data={albums}
          folderImage="album"
          urlName="album"
        />
      </div>
    </>
  );
};

export default Home;

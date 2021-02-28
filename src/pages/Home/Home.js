import React, { useState, useEffect } from "react";
import BannerHome from "../../components/BannerHome/BannerHome";
import "./Home.scss";
import firebase from "../../utils/firebase";
import BasicSliderItems from "../../components/Sliders/BasicSliderItems/BasicSliderItems";
import SongsSlider from "../../components/Sliders/SongsSlider/SongsSlider";

const Home = ({ playerSong }) => {
  const [artists, setArtists] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [songs, setSongs] = useState([]);

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

  useEffect(() => {
    firebase
      .firestore()
      .collection("songs")
      .limit(10)
      .get()
      .then((songs) => {
        const arraySongs =
          songs?.docs.map((song) => {
            const data = song.data();
            return data;
          }) || [];
        setSongs(arraySongs);
      });
  }, []);

  return (
    <>
      <BannerHome />
      <div className="home">
        <BasicSliderItems
          title="Last artists"
          folderImage="artist"
          urlName="artist"
          data={artists}
        />

        <BasicSliderItems
          title="Last albums"
          data={albums}
          folderImage="album"
          urlName="album"
        />
        <SongsSlider title="Last songs" data={songs} playerSong={playerSong} />
      </div>
    </>
  );
};

export default Home;

import React, { useState } from "react";
import { Grid } from "semantic-ui-react";
import "./LoggedLayout.scss";
import Routes from "../../routes/Routes";
import { BrowserRouter as Router } from "react-router-dom";
import MenuLeft from "../../components/MenuLeft/MenuLeft.component";
import TopBar from "../../components/TopBar/TopBar.component";
import Player from "../../components/Player/Player";
import firebase from "../../utils/firebase";

export const LoggedLayout = ({ user, setReloadApp }) => {
  const [songData, setSongData] = useState(null);

  const playerSong = (albumImage, songName, songNameFile) => {
    firebase
      .storage()
      .ref(`song/${songNameFile}`)
      .getDownloadURL()
      .then((url) => {
        setSongData({ url, image: albumImage, name: songName });
      });
  };

  return (
    <Router>
      <Grid className="logged-layout">
        <Grid.Row>
          <Grid.Column width={3}>
            <MenuLeft user={user} />
          </Grid.Column>
          <Grid.Column className="content" width={13}>
            <TopBar user={user} />
            <Routes
              playerSong={playerSong}
              user={user}
              setReloadApp={setReloadApp}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16}>
            <Player songData={songData} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Router>
  );
};

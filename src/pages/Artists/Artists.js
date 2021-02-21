import React, { useState, useEffect } from "react";
import "./Artists.scss";
import firebase from "../../utils/firebase";
import { Grid } from "semantic-ui-react";
import { Link } from "react-router-dom";

const Artists = () => {
  const [artists, setArtists] = useState(null);

  useEffect(() => {
    firebase
      .firestore()
      .collection("/artists")
      .get()
      .then(({ docs }) => {
        const artists = docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return {
            ...data,
            id,
          };
        });
        setArtists(artists);
      });
  }, [artists]);

  return (
    <div className="artists">
      <h1>Artistas</h1>
      <Grid>
        {artists &&
          artists.map((artist) => (
            <Grid.Column key={artist.id} mobile={8} tablet={4} computer={3}>
              <Artist artist={artist} />
            </Grid.Column>
          ))}
      </Grid>
    </div>
  );
};

function Artist(props) {
  const { artist } = props;
  const [bannerUrl, setBannerUrl] = useState(null);

  useEffect(() => {
    firebase
      .storage()
      .ref(`artist/${artist.banner}`)
      .getDownloadURL()
      .then((url) => {
        setBannerUrl(url);
      });
  }, [artist]);

  return (
    <Link to={`/artist/${artist.id}`}>
      <div className="artists__item">
        <div
          className="avatar"
          style={{ backgroundImage: `url('${bannerUrl}')` }}
        />
        <h3>{artist.name}</h3>
      </div>
    </Link>
  );
}

export default Artists;

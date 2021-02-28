import React, { Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import { Loader } from "semantic-ui-react";

const Home = React.lazy(() => import("../pages/Home/Home"));
const Settings = React.lazy(() => import("../pages/Settings/Settings"));
const Artist = React.lazy(() => import("../pages/Artist/Artist"));
const Artists = React.lazy(() => import("../pages/Artists/Artists"));
const Albums = React.lazy(() => import("../pages/Albums/Albums"));
const Album = React.lazy(() => import("../pages/Album/Album"));

const Routes = ({ user, setReloadApp, playerSong }) => {
  return (
    <Suspense fallback={<Loader>Loading...</Loader>}>
      <Switch>
        <Route path="/" exact>
          <Home playerSong={playerSong} />
        </Route>
        <Route path="/artist/:id" exact>
          <Artist />
        </Route>
        <Route path="/artists" exact>
          <Artists />
        </Route>
        <Route path="/albums" exact>
          <Albums />
        </Route>
        <Route path="/album/:id" exact>
          <Album />
        </Route>
        <Route path="/settings" exact>
          <Settings user={user} setReloadApp={setReloadApp} />
        </Route>
      </Switch>
    </Suspense>
  );
};

export default Routes;

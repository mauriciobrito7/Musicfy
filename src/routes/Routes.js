import React from "react";
import { Switch, Route } from "react-router-dom";

// Pages
import Home from "../pages/Home/Home";
import Settings from "../pages/Settings/Settings";
import Artist from "../pages/Artist/Artist";
import Artists from "../pages/Artists/Artists";
import Albums from "../pages/Albums/Albums";
import Album from "../pages/Album/Album";

const Routes = (props) => {
  const { user, setReloadApp } = props;
  return (
    <Switch>
      <Route path="/" exact>
        <Home />
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
  );
};

export default Routes;

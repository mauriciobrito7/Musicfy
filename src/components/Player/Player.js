import React, { useState, useEffect } from "react";
import { Grid, Progress, Icon, Input, Image } from "semantic-ui-react";
import ReactPlayer from "react-player";
import "./Player.scss";

const songData = {
  image:
    "https://images.pexels.com/photos/1370545/pexels-photo-1370545.jpeg?cs=srgb&dl=pexels-luis-quintero-1370545.jpg&fm=jpg",
  name: "Efecto vocales",
  url: "",
};
const Player = () => {
  const [playing, setPlaying] = useState(false);
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [volume, setVolume] = useState(0.3);

  useEffect(() => {
    if (songData?.url) {
      onStart();
    }
  }, [songData]);

  const onStart = () => {
    setPlaying(true);
  };

  const onPause = () => {
    setPlaying(false);
  };

  const onProgress = (data) => {
    setPlayedSeconds(data.playedSeconds);
    setTotalSeconds(data.loadedSeconds);
  };

  return (
    <div className="player">
      <Grid>
        <Grid.Column width={4} className="left">
          <Image src={songData?.image} />
          {songData?.name}
        </Grid.Column>
        <Grid.Column width={8} className="center">
          <div className="controls">
            {playing ? (
              <Icon onClick={onPause} name="pause circle outline" />
            ) : (
              <Icon onClick={onStart} name="play circle outline" />
            )}
          </div>
          <Progress
            progress="value"
            value={playedSeconds}
            total={totalSeconds}
            size="tiny"
          />
        </Grid.Column>
        <Grid.Column width={4} className="right">
          <Input
            label={<Icon name="volume up" />}
            min={0}
            max={1}
            step={0.01}
            type="range"
            onChange={(e, data) => setVolume(Number(data.value))}
            name="volume"
            value={volume}
          />
        </Grid.Column>
      </Grid>
      <ReactPlayer
        url={songData?.url}
        playing={playing}
        className="react-player"
        height="0"
        width="0"
        onProgress={(e) => onProgress(e)}
      />
    </div>
  );
};

export default Player;
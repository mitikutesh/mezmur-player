import React, { useState } from "react";
import Player from "./components/Player";
import Song from "./components/Song";
import "./styles/app.scss";
import data from "./util";
function App() {
  const [songs, setSongs] = useState(data());
  const [currentSong, setcurrentSong] = useState(songs[0]);
  const [playing, setPlaying] = useState(false);
  return (
    <div className="App">
      <Song currentSong={currentSong}></Song>
      <Player
        currentSong={currentSong}
        playing={playing}
        setPlaying={setPlaying}
      ></Player>
    </div>
  );
}

export default App;

import React, { useState, useRef } from "react";
import Player from "./components/Player";
import Song from "./components/Song";
import "./styles/app.scss";
import data from "./util";
import Library from "./components/Library";
import Nav from "./components/Nav";
function App() {
  const [songs, setSongs] = useState(data());
  const [currentSong, setcurrentSong] = useState(songs[0]);
  const [playing, setPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  });
  const [libraryOpen, setLibraryOpen] = useState(false);

  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentSong: e.target.value });
  };

  const timeUpdateHandler = (e) => {
    const crtTime = e.target.currentTime;
    const drt = e.target.duration;
    setSongInfo({ ...songInfo, currentTime: crtTime, duration: drt });
  };
  //ref
  const audioRef = useRef(null);
  return (
    <div className="App">
      <Nav libraryStatus={libraryOpen} setLibraryStatus={setLibraryOpen} />
      <Song currentSong={currentSong}></Song>
      <Player
        currentSong={currentSong}
        playing={playing}
        setPlaying={setPlaying}
        audioRef={audioRef}
        setSongInfo={setSongInfo}
        songInfo={songInfo}
        timeUpdateHandler={timeUpdateHandler}
        dragHandler={dragHandler}
      ></Player>

      <Library
        songs={songs}
        setcurrentSong={setcurrentSong}
        audioRef={audioRef}
        playing={playing}
        setSongs={setSongs}
        libraryStatus={libraryOpen}
      ></Library>
    </div>
  );
}

export default App;

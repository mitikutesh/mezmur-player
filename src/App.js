import React, { useState, useRef } from "react";
import Player from "./components/Player";
import Song from "./components/Song";
import "./styles/app.scss";
import data from "./data";
import Library from "./components/Library";
import Nav from "./components/Nav";
function App() {
  const [songs, setSongs] = useState(data());
  const [currentSong, setcurrentSong] = useState(songs[0]);
  const [playing, setPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
  });
  const [libraryOpen, setLibraryOpen] = useState(false);

  const dragHandler = (e) => {
    let valPerc = e.target.value;
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentSong: e.target.value });
  };

  const timeUpdateHandler = (e) => {
    const crtTime = e.target.currentTime;
    const drt = e.target.duration;
    const rcrnt = Math.round(crtTime);
    const rdrnt = Math.round(drt);
    const animationPect = Math.round((rcrnt / rdrnt) * 100);
    setSongInfo({
      ...songInfo,
      currentTime: crtTime,
      duration: drt,
      animationPercentage: animationPect,
    });
  };
  //ref
  const audioRef = useRef(null);
  const songEndHandler = async () => {
    let currentIndex = songs.findIndex((s) => s.id === currentSong.id);
    await setcurrentSong(songs[(currentIndex + 1) % songs.length]);
    if (playing) audioRef.current.play();
  };
  return (
    <div className={`App ${libraryOpen ? "library-active" : ""}`}>
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
        songs={songs}
        setSongs={setSongs}
        setcurrentSong={setcurrentSong}
      ></Player>

      <Library
        songs={songs}
        setcurrentSong={setcurrentSong}
        audioRef={audioRef}
        playing={playing}
        setSongs={setSongs}
        libraryStatus={libraryOpen}
      ></Library>
      <audio
        onLoadedMetadata={timeUpdateHandler}
        onTimeUpdate={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
        onEnded={songEndHandler}
      />
    </div>
  );
}

export default App;

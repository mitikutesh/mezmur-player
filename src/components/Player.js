import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
} from "@fortawesome/free-solid-svg-icons";

const Player = ({
  currentSong,
  playing,
  setPlaying,
  audioRef,
  setSongInfo,
  songInfo,
  timeUpdateHandler,
  dragHandler,
  songs,
  setSongs,
  setcurrentSong,
}) => {
  const activeLibraryHandler = (nextPrev) => {
    const newSongs = songs.map((s) => {
      if (s.id === nextPrev.id) {
        return {
          ...s,
          active: true,
        };
      } else {
        return {
          ...s,
          active: false,
        };
      }
    });
    setSongs(newSongs);
  };

  const playSongHanlder = () => {
    if (playing) {
      audioRef.current.pause();
      setPlaying(!playing);
    } else {
      audioRef.current.play();
      setPlaying(!playing);
    }
  };

  const timeFormater = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  const skipHandler = async (direction) => {
    let currentIndex = songs.findIndex((s) => s.id === currentSong.id);
    if (direction === "skip-back") {
      if ((currentIndex - 1) % songs.length === -1) {
        await setcurrentSong(songs[songs.length - 1]);
        activeLibraryHandler(songs[songs.length - 1]);
        if (playing) audioRef.current.play();
        return;
      }
      await setcurrentSong(songs[(currentIndex - 1) % songs.length]);
      activeLibraryHandler(songs[songs.length - 1]);
    }
    if (direction === "skip-forward") {
      await setcurrentSong(songs[(currentIndex + 1) % songs.length]);
      activeLibraryHandler(songs[(currentIndex + 1) % songs.length]);
    }
    // PlayAudio(playing, audioRef);
    if (playing) audioRef.current.play();
  };

  //add style to input
  const trackAnim = {
    transform: `translateX(${songInfo.animationPercentage}%)`,
  };
  return (
    <div className="player">
      <div className="time-control">
        <p>{timeFormater(songInfo.currentTime || 0)}</p>
        <div
          style={{
            background: `linear-gradient(to right, ${
              currentSong.color[0] ?? "blue"
            }, ${currentSong.color[1] ?? "black"})`,
          }}
          className="track"
        >
          <input
            min={0}
            max={songInfo.duation}
            value={songInfo.currentTime}
            type="range"
            onChange={dragHandler}
          />
          <div style={trackAnim} className="animate-track"></div>
        </div>
        <p>{timeFormater(songInfo.duration || 0)}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          onClick={() => {
            skipHandler("skip-back");
          }}
          className="skip-back"
          size="2x"
          icon={faAngleLeft}
        />
        <FontAwesomeIcon
          onClick={playSongHanlder}
          className="play"
          size="2x"
          icon={playing ? faPause : faPlay}
        />
        <FontAwesomeIcon
          onClick={() => {
            skipHandler("skip-forward");
          }}
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
        />
      </div>
      <audio
        onLoadedMetadata={timeUpdateHandler}
        onTimeUpdate={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
      ></audio>
    </div>
  );
};
export default Player;

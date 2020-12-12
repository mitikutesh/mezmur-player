import React, { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
} from "@fortawesome/free-solid-svg-icons";

import { PlayAudio } from "../util";
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
  useEffect(() => {
    const newSongs = songs.map((s) => {
      if (s.id === currentSong.id) {
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
  }, [currentSong]);

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

  const skipHandler = (direction) => {
    let currentIndex = songs.findIndex((s) => s.id === currentSong.id);
    if (direction === "skip-back") {
      if ((currentIndex - 1) % songs.length === -1) {
        setcurrentSong(songs[songs.length - 1]);
        PlayAudio(playing, audioRef);
        return;
      }
      setcurrentSong(songs[(currentIndex - 1) % songs.length]);
    }
    if (direction === "skip-forward") {
      setcurrentSong(songs[(currentIndex + 1) % songs.length]);
    }
    // PlayAudio(playing, audioRef);
    if (playing) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.then((audio) => {
          audioRef.current.play();
        });
      }
    }
  };

  return (
    <div className="player">
      <div className="time-control">
        <p>{timeFormater(songInfo.currentTime || 0)}</p>
        <input
          min={0}
          max={songInfo.duation}
          value={songInfo.currentTime}
          type="range"
          onChange={dragHandler}
        />
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

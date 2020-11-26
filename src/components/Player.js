import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";

const Player = ({ currentSong, playing, setPlaying }) => {
  //ref
  const audioRef = useRef(null);

  const playSongHanlder = () => {
    if (playing) {
      audioRef.current.pause();
      setPlaying(!playing);
    } else {
      audioRef.current.play();
      setPlaying(!playing);
    }
  };

  const timeUpdateHandler = (e) => {
    const crtTime = e.target.currentTime;
    const drt = e.target.duration;
    setSongInfo({ ...songInfo, currentTime: crtTime, duration: drt });
  };

  const timeFormater = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentSong: e.target.value });
  };
  //state
  const [songInfo, setSongInfo] = useState({
    currentTime: null,
    duration: null,
  });
  return (
    <div className="player">
      <div className="time-control">
        <p>{timeFormater(songInfo.currentTime)}</p>
        <input
          min={0}
          max={songInfo.duation}
          value={songInfo.currentTime}
          type="range"
          onChange={dragHandler}
        />
        <p>{timeFormater(songInfo.duration)}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon className="skip-back" size="2x" icon={faAngleLeft} />
        <FontAwesomeIcon
          onClick={playSongHanlder}
          className="play"
          size="2x"
          icon={faPlay}
        />
        <FontAwesomeIcon
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

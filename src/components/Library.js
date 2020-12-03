import { library } from "@fortawesome/fontawesome-svg-core";
import React from "react";
import LibrarySong from "./LibrarySong";

const Library = ({ songs, setcurrentSong, audioRef, playing, setSongs }) => {
  return (
    <div className="library">
      <h2>Library</h2>
      <div className="">
        {songs.map((a) => (
          <LibrarySong
            songs={songs}
            setcurrentSong={setcurrentSong}
            song={a}
            id={a.id}
            key={a.id}
            audioRef={audioRef}
            playing={playing}
            setSongs={setSongs}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;

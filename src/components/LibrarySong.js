const LibrarySong = ({
  song,
  songs,
  setcurrentSong,
  id,
  audioRef,
  playing,
  setSongs,
}) => {
  const setSelectionHanlder = () => {
    setcurrentSong(song);
    if (playing) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.then((audio) => {
          audioRef.current.play();
        });
      }
    }

    const newSongs = songs.map((s) => {
      if (s.id === id) {
        return {
          ...song,
          active: true,
        };
      } else {
        return {
          ...song,
          active: false,
        };
      }
    });
    setSongs(newSongs);
    //audioRef.current.play();
  };
  return (
    <div
      onClick={setSelectionHanlder}
      className={`library-song  ${song.active ? "selected" : ""}`}
    >
      <img alt={song.name} src={song.cover} />
      <div className="song-desc">
        <h3> {song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;

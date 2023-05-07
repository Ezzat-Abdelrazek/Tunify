import { FaPauseCircle, FaPlayCircle } from "react-icons/fa";

const PlayPause = ({ isPlaying, activeSong, song, handlePause, handlePlay }) =>
  isPlaying && activeSong?.key === song.key ? (
    <FaPauseCircle
      size={35}
      onClick={handlePause}
      style={{ cursor: "pointer" }}
    />
  ) : (
    <FaPlayCircle
      size={35}
      onClick={handlePlay}
      style={{ cursor: "pointer" }}
    />
  );

export default PlayPause;

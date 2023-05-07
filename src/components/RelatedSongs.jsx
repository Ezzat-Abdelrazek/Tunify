import { useState } from "react";
import SongBar from "./SongBar";
import styled from "styled-components";

const RelatedSongs = ({
  relatedSongData,
  isPlaying,
  activeSong,
  handlePauseClick,
  handlePlayClick,
  artistId,
}) => {
  const [songs, setSongs] = useState([]);

  //JSX
  return (
    <div>
      <StyledH2>Related Songs:</StyledH2>
      <StyledBox>
        {Object.keys(relatedSongData)
          .slice(0, 4)
          ?.map((song, i) => (
            <SongBar
              key={song}
              songid={song}
              i={i}
              artistId={artistId}
              isPlaying={isPlaying}
              activeSong={activeSong}
              handlePauseClick={handlePauseClick}
              handlePlayClick={handlePlayClick}
              songs={songs}
              setSongs={setSongs}
            />
          ))}
      </StyledBox>
    </div>
  );
};

//STYLED COMPONENTS

const StyledBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StyledH2 = styled.h2`
  font-size: 4rem;
`;
export default RelatedSongs;

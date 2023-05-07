import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";

import { setActiveSong, playPause } from "../redux/features/playerSlice";
import {
  useGetTopChartsQuery,
  useGetArtistTopSongsQuery,
} from "../redux/services/shazam";
import styled from "styled-components";
import { useEffect, useRef } from "react";

const ArtistDetails = () => {
  const dispatch = useDispatch();

  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { id: artistId } = useParams();

  const sectionRef = useRef();

  const {
    data: relatedSongData,
    isFetching: isFetchingRelatedSong,
    error,
  } = useGetArtistTopSongsQuery({ artistId });

  useEffect(() => {
    if (window.innerWidth > 780) {
      document.body.scrollIntoView({
        behavior: "smooth",
      });
    } else {
      if (!sectionRef?.current) return;

      sectionRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [artistId, isFetchingRelatedSong]);

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, i, data) => {
    dispatch(setActiveSong({ song, i, data }));
    dispatch(playPause(true));
  };

  const { data: topChartsData } = useGetTopChartsQuery();

  if (error) return <Error />;

  return (
    <StyledSection ref={sectionRef}>
      {isFetchingRelatedSong ? (
        <Loader title="Finding just the right Person..." />
      ) : (
        <>
          <DetailsHeader
            artistId={artistId}
            artistData={relatedSongData?.resources}
            data={topChartsData}
          />

          {/* TEMP */}
          <RelatedSongs
            artistId={artistId}
            relatedSongData={relatedSongData.resources.songs}
            isPlaying={isPlaying}
            activeSong={activeSong}
            handlePauseClick={handlePauseClick}
            handlePlayClick={handlePlayClick}
          />
        </>
      )}
    </StyledSection>
  );
};

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  padding: 1rem;

  position: relative;

  margin-bottom: 5rem;
  margin-top: 5rem;

  @media screen and (min-width: 780px) {
    min-height: 100vh;
  }
`;
const StyledH2 = styled.h2`
  font-size: 4rem;
`;

const StyledLyricsBox = styled.div`
  font-size: 2rem;
  font-weight: lighter;
`;

export default ArtistDetails;

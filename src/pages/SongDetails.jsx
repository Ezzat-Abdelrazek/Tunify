import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";

import { setActiveSong, playPause } from "../redux/features/playerSlice";
import { convertObject } from "../assets/helpers";
import {
  useGetTopChartsQuery,
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
} from "../redux/services/shazam";
import styled from "styled-components";
import { useEffect, useRef } from "react";

const SongDetails = () => {
  let artistData;

  const dispatch = useDispatch();

  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { songid } = useParams();

  const sectionRef = useRef();

  let artistId = songid[0] === "1" ? songid : "";

  const {
    data: songData,
    isFetching: isFetchingSongDetails,
    error: songError,
  } = useGetSongDetailsQuery({
    songId: songid,
    artistId: `${artistId ? songid : ""}`,
  });

  const {
    data: relatedSongData,
    isFetching: isFetchingRelatedSong,
    error: relatedSongError,
  } = useGetSongRelatedQuery({ songId: songid });

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
  }, [songid, isFetchingSongDetails]);

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, i, data) => {
    dispatch(setActiveSong({ song, i, data }));
    dispatch(playPause(true));
  };

  const { data: topChartsData } = useGetTopChartsQuery();

  if (songError) return <Error />;

  if (artistId && songData?.data) {
    artistData = convertObject(songData);
  }

  return (
    <StyledSection ref={sectionRef}>
      {isFetchingSongDetails ? (
        <Loader title="Finding just the right words..." />
      ) : (
        <>
          <DetailsHeader
            songData={artistData ? artistData : songData}
            data={topChartsData}
          />

          <div>
            <StyledH2>Lyrics:</StyledH2>
          </div>

          <StyledLyricsBox>
            {artistId ? (
              <p>
                Sorry, No Lyrics Was Found
                <br />
                P.E: Perhaps with a little search in the search bar, you may
                stumble upon the song lyrics 🎶. Best of luck! 😊
              </p>
            ) : songData?.sections[1].type === "LYRICS" ? (
              songData?.sections[1].text.map((line, i) => <p key={i}>{line}</p>)
            ) : (
              <p>Sorry, No Lyrics Was Found</p>
            )}
          </StyledLyricsBox>
          {/* {isFetchingRelatedSong ? null : (
            <RelatedSongs
              relatedSongData={relatedSongData?.resources["shazam-songs"]}
              isPlaying={isPlaying}
              activeSong={activeSong}
              handlePauseClick={handlePauseClick}
              handlePlayClick={handlePlayClick}
            />
          )} */}
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

export default SongDetails;

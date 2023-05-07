import { useParams } from "react-router-dom";

import { useGetSongsBySearchQuery } from "../redux/services/shazam";
import { useSelector } from "react-redux";

import styled from "styled-components";

import SongCard from "../components/SongCard";
import { useRef, useEffect } from "react";
import { SongCardSkeleton } from "../components";
import { motion } from "framer-motion";

const Search = () => {
  const { searchTerm } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const searchOffset = 5;

  const { data, isFetching, error } = useGetSongsBySearchQuery({
    searchTerm,
  });
  const {
    data: searchResults,
    isFetching: isFetchingResults,
    error: searchError,
  } = useGetSongsBySearchQuery({ searchTerm, searchOffset });

  const sectionRef = useRef();

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
  }, [isFetching, isFetchingResults]);

  let tracks = [];

  if (!isFetching && !isFetchingResults) {
    tracks = [...data?.tracks?.hits, ...searchResults?.tracks?.hits].filter(
      ({ track }, index, self) =>
        index === self.findIndex(({ track: t }) => t.key === track.key)
    );
  }

  if (error || searchError) return <Error />;

  //JSX
  return (
    <StyledSection ref={sectionRef}>
      <StyledBox>
        <StyledH2>Discover</StyledH2>
      </StyledBox>
      {isFetching && isFetchingResults ? (
        <Grid>
          {new Array(10).fill(null).map((_, i) => (
            <SongCardSkeleton key={i} />
          ))}
        </Grid>
      ) : (
        <>
          {tracks.length === 0 ? (
            <p>
              Oops, looks like we didn't find any results for your search 😔
              Don't worry though, we're always updating our database so be sure
              to check back soon! In the meantime, why not try expanding your
              search or discovering something new? 🎵🎧 Keep on exploring! ✨
            </p>
          ) : (
            <Grid>
              {tracks.map(({ track: song }, i) => (
                <SongCard
                  key={song.key}
                  id={song.key}
                  song={song}
                  i={i}
                  isPlaying={isPlaying}
                  activeSong={activeSong}
                  data={data.tracks}
                  transitionPeriod={i * 0.1}
                />
              ))}
            </Grid>
          )}
        </>
      )}
    </StyledSection>
  );
};

//STYLED COMPONENTS
const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;

  font-size: 2.4rem;

  min-height: 100vh;

  position: relative;

  @media screen and (max-width: 780px) {
    min-height: 8rem;
  }
`;

const StyledBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;

  @media screen and (max-width: 1120px) {
    flex-direction: column;
  }
`;

const StyledH2 = styled.h2`
  font-size: 5rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  gap: 2rem;
  justify-content: center;
  align-self: flex-start;

  width: 100%;

  text-align: center;

  @media screen and (max-width: 600px) {
    grid-template-columns: repeat(auto-fit, minmax(25rem, 0.8fr));
  }
`;

export default Search;

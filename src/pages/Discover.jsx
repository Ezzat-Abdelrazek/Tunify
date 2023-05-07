//COMPONENTS
import { SongCard, SongCardSkeleton } from "../components";
import Loader from "../components/UI/Loader";
import Error from "../components/UI/Error";

//CONFIG
import { genres } from "../assets/constants";

//UTILITES
import styled from "styled-components";

//HOOKS
import {
  useGetListByIdQuery,
  useGetListIdQuery,
  useGetTopChartsQuery,
} from "../redux/services/shazam";
import { useDispatch, useSelector } from "react-redux";
import { useRef, useEffect, useState } from "react";
import SelectGenre from "../components/SelectGenre";

const Discover = () => {
  const [currentGenre, setCurrentGenre] = useState("Pop");

  const dispatch = useDispatch();
  const { activeSong, isPlaying, genreListId } = useSelector(
    (state) => state.player
  );

  const defaultGenrelistId = "genre-global-chart-1";

  const { data: listsId, isFetching: isFecthingListId } = useGetListIdQuery();

  const { data, isFetching, error } = useGetListByIdQuery({
    listId: genreListId || defaultGenrelistId,
  });

  // Handle Genres

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
  }, []);

  if (error) return <Error />;

  //JSX
  return (
    <StyledSection ref={sectionRef}>
      <StyledBox>
        <StyledH2>Discover {currentGenre}</StyledH2>

        <SelectGenre listsId={listsId} setCurrentGenre={setCurrentGenre} />
      </StyledBox>
      {isFetching || isFecthingListId ? (
        <Grid>
          {new Array(20).fill(null).map((_, i) => (
            <SongCardSkeleton key={i} />
          ))}
        </Grid>
      ) : (
        <>
          <Grid>
            {data.tracks.map((song, i) => (
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

export default Discover;

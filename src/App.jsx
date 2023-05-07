import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

import { Searchbar, Sidebar, MusicPlayer, TopPlay } from "./components";
import {
  ArtistDetails,
  Discover,
  Search,
  SongDetails,
  AroundYou,
} from "./pages";

import styled from "styled-components";

const App = () => {
  const { activeSong } = useSelector((state) => state.player);

  return (
    <StyledFlexBox>
      <Sidebar />
      <StyledBox>
        <Searchbar />

        <StyledTopPlayRoutesBox>
          <StyledRoutesBox>
            <Routes>
              <Route path="/" element={<Discover />} />
              <Route path="/around-you" element={<AroundYou />} />
              <Route path="/artists/:id" element={<ArtistDetails />} />
              <Route path="/songs/:songid" element={<SongDetails />} />
              <Route path="/search/:searchTerm" element={<Search />} />
            </Routes>
          </StyledRoutesBox>
          <StyledTopPlayBox>
            <TopPlay activeSong={activeSong} />
          </StyledTopPlayBox>
        </StyledTopPlayRoutesBox>
      </StyledBox>

      {activeSong?.title && <MusicPlayer />}
    </StyledFlexBox>
  );
};

const StyledFlexBox = styled.div`
  display: flex;
  gap: 2rem;
`;

const StyledBox = styled.div`
  overflow: hidden;

  padding-top: 3rem;
  padding-left: 1.5rem;

  width: 100%;
`;

const StyledTopPlayRoutesBox = styled.div`
  display: flex;
  gap: 2rem;

  padding: 1rem;
  padding-bottom: 10rem;

  @media screen and (max-width: 780px) {
    flex-direction: column;
  }
`;

const StyledRoutesBox = styled.div`
  flex-basis: 70%;

  overflow: hidden;

  order: 0;

  @media screen and (max-width: 780px) {
    order: 2;
  }
`;

const StyledTopPlayBox = styled.div`
  flex-basis: 30%;
`;

export default App;

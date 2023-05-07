import styled from "styled-components";
import PlayPause from "./PlayPause";

import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const TopChartCard = ({ song, i, activeSong, data }) => {
  const dispatch = useDispatch();

  const { isPlaying } = useSelector((state) => state.player);

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  //JSX
  return (
    <StyledArticle>
      <span>{i + 1}.</span>
      <StyledFigure>
        <StyledImg
          src={song?.images?.coverart || song?.images?.background}
          alt={song.title}
        />

        <StyledFigcaption>
          <StyledTitleLink to={`/songs/${song.key}`}>
            {song.title}
          </StyledTitleLink>
          {song?.artists ? (
            <StyledSubtitleLink to={`/artists/${song?.artists[0]?.adamid}`}>
              {song.subtitle}
            </StyledSubtitleLink>
          ) : (
            <StyledParagraphSubtitle>{song.subtitle}</StyledParagraphSubtitle>
          )}
        </StyledFigcaption>
      </StyledFigure>
      <StyledButton>
        <PlayPause
          song={song}
          handlePause={handlePauseClick}
          handlePlay={() => handlePlayClick(song, i)}
          isPlaying={isPlaying}
          activeSong={activeSong}
        />
      </StyledButton>
    </StyledArticle>
  );
};

//STYLED COMPONENTS

const StyledArticle = styled.article`
  border-radius: 1rem;

  display: flex;
  align-items: center;
  gap: 1rem;

  font-size: 2rem;

  padding: 1rem;

  &:hover {
    background-color: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(4px);
  }
`;

const StyledFigure = styled.figure`
  display: flex;
  gap: 1rem;
  overflow: hidden;

  width: 100%;
`;

const StyledFigcaption = styled.figcaption`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  overflow: hidden;

  line-height: 0.8;

  width: calc(80%);

  @media screen and (max-width: 1250px) {
    max-width: 15rem;
  }
`;

const StyledTitleLink = styled(Link)`
  color: #fff;

  display: block;

  font-size: 2.2rem;
  font-weight: bold;

  overflow: hidden;

  white-space: nowrap;

  width: 80%;

  text-overflow: ellipsis;

  transition: all 0.3s;

  &:hover {
    color: #e90046;
  }

  @media screen and (max-width: 320px) {
    font-size: 1.6rem;
    white-space: normal;
  }
`;
const StyledSubtitleLink = styled(Link)`
  color: #ddd;

  display: block;

  font-size: 1.6rem;

  overflow: hidden;

  white-space: nowrap;
  width: 100%;

  text-overflow: ellipsis;

  transition: all 0.3s;

  &:hover {
    color: #e90046;
  }

  @media screen and (max-width: 470px) {
    font-size: 1.4rem;
    white-space: normal;
  }
`;

const StyledParagraphSubtitle = styled.p`
  color: #ddd;

  font-size: 1.6rem;

  overflow: hidden;

  white-space: nowrap;
  width: 100%;

  text-overflow: ellipsis;

  transition: all 0.3s;

  @media screen and (max-width: 470px) {
    font-size: 1.4rem;
    white-space: normal;
  }
`;

const StyledImg = styled.img`
  border-radius: 1rem;

  flex-shrink: 0;

  object-fit: cover;

  width: 20%;
  max-width: 8.8rem;
  min-width: 5.5rem;
`;

const StyledButton = styled.button`
  background: none;

  border: none;

  color: #ddd;

  svg {
    width: 3rem;
  }
`;

export default TopChartCard;

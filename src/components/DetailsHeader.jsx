import { Link } from "react-router-dom";
import styled from "styled-components";
import { Tooltip } from "react-tooltip";

import { useDispatch, useSelector } from "react-redux";
import { playPause, setActiveSong } from "../redux/features/playerSlice";

import PlayPause from "./PlayPause";

import "react-tooltip/dist/react-tooltip.css";

const DetailsHeader = ({
  artistId = "",
  artistData = null,
  songData = null,
  data = null,
}) => {
  const artist = artistData?.artists?.[artistId]?.attributes;

  const imgSrc = artistId
    ? artist?.artwork?.url.replace("{w}", "500").replace("{h}", "500")
    : songData?.images?.coverart;

  //REDUX
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = () => {
    dispatch(setActiveSong({ song: songData, data }));
    dispatch(playPause(true));
  };

  //JSX
  return (
    <StyledSection>
      <StyledGradient></StyledGradient>
      <StyledFlexBox>
        <StyledImgBox>
          <StyledImg src={imgSrc} alt="Art" />
          <StyledImgGradient></StyledImgGradient>
        </StyledImgBox>
        <StyledFlexColBox>
          {!artistId && (
            <PlayPause
              song={songData}
              handlePause={handlePauseClick}
              handlePlay={handlePlayClick}
              isPlaying={isPlaying}
              activeSong={activeSong}
            />
          )}
          <StyledTypographyBox>
            <StyledParagraph
              data-tooltip-id="song-title"
              data-tooltip-content={artistId ? artist.name : songData?.title}
            >
              {artistId ? artist.name : songData?.title}
            </StyledParagraph>
            {!artistId && songData?.artists && (
              <StyledLink to={`/artists/${songData?.artists[0].adamid}`}>
                {songData?.subtitle}
              </StyledLink>
            )}
            <p>
              {artistId ? artist?.genreNames[0] : songData?.genres?.primary}
            </p>
          </StyledTypographyBox>
        </StyledFlexColBox>
      </StyledFlexBox>
      <StyledTooltip id="song-title" />
    </StyledSection>
  );
};

//STYLED COMPONENTS

const StyledSection = styled.section`
  position: relative;
`;

const StyledGradient = styled.div`
  background: linear-gradient(to right, #414345, transparent);

  border-radius: 1rem;

  position: absolute;
  inset: -1rem 0 2rem -1rem;

  z-index: -1;
`;

const StyledImgBox = styled.div`
  border-radius: 1rem;
  box-shadow: 0 0.4rem 0.8rem rgba(255, 255, 255, 0.2);

  position: relative;

  overflow: hidden;

  aspect-ratio: 1;

  width: 20rem;
  min-width: 15.5rem;
`;

const StyledImgGradient = styled.div`
  background: linear-gradient(to bottom right, #414345, transparent);

  border-radius: 1rem;

  position: absolute;
  inset: 0;

  z-index: 1000;
`;

const StyledImg = styled.img`
  border: 1px solid #eee;

  border-radius: 1rem;

  width: 100%;
`;

const StyledFlexBox = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 1rem;
`;
const StyledFlexColBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  overflow: hidden;
`;

const StyledTypographyBox = styled.div`
  font-size: 2rem;
  line-height: 0.8;
`;

const StyledParagraph = styled.p`
  font-size: 4rem;
  font-weight: lighter;

  letter-spacing: 3px;

  text-transform: uppercase;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  width: 100%;

  //TEMP TILL SOLVE LONG HEADLINES IN LARGE DEVICES
  @media screen and (max-width: 780px) {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  @media screen and (max-width: 320px) {
    font-size: 3rem;
  }
`;

const StyledLink = styled(Link)`
  color: #ccc;

  display: block;

  font-size: 2rem;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  transition: all 0.3s;

  &:hover {
    color: #e90064;
  }
`;

const StyledTooltip = styled(Tooltip)`
  font-size: 2rem;

  z-index: 1000000;
`;

export default DetailsHeader;

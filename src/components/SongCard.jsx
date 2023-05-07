import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { TRANSITION_PERIOD } from "../assets/constants";
import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { motion } from "framer-motion";
const SongCard = ({
  song,
  i,
  activeSong,
  isPlaying,
  data,
  id,
  transitionPeriod = 0,
}) => {
  const dispatch = useDispatch();

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  if (
    !(song?.images?.coverart && song?.images?.background && song?.hub?.actions)
  )
    return;

  //JSX
  return (
    <StyledCard
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: transitionPeriod }}
    >
      <StyledBox>
        <StyledSong activeSong={activeSong} song={song}>
          <PlayPause
            song={song}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
            isPlaying={isPlaying}
            activeSong={activeSong}
          />
        </StyledSong>
        <StyledImg
          src={song?.images?.coverart || song?.images?.background}
          alt={song.title}
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: transitionPeriod }}
        />
      </StyledBox>
      <StyledTypographyBox>
        <p>
          <StyledLink to={`/songs/${id}`}>{song.title}</StyledLink>
        </p>
        <p>
          <StyledLink to={`/artists/${song?.artists[0]?.adamid}`}>
            {song.subtitle}
          </StyledLink>
        </p>
      </StyledTypographyBox>
    </StyledCard>
  );
};

//STYLED COMPONENTS
const StyledCard = styled(motion.article)`
  background: rgba(255, 255, 255, 0.15);

  backdrop-filter: blur(4px);

  border-radius: 0.6rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  max-width: 30rem;

  padding: 1rem;

  opacity: 0.8;

  overflow: hidden;
`;

const StyledBox = styled.div`
  border-radius: 0.6rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  position: relative;

  overflow: hidden;

  width: 100%;
  height: 100%;
`;

const StyledSong = styled.div`
  background-color: rgba(0, 0, 0, 0.5);

  border-radius: 0.6rem;

  display: flex;
  opacity: ${(props) => (props.activeSong?.key === props.song.key ? "1" : "0")};
  justify-content: center;
  align-items: center;

  position: absolute;
  inset: 0rem;

  transition: all ${TRANSITION_PERIOD}s;

  &:hover {
    opacity: 1;
  }
`;

const StyledImg = styled(motion.img)`
  border-radius: 0.6rem;

  object-fit: cover;

  width: 100%;
  height: 100%;
`;

const StyledTypographyBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 100%;
  text-align: left;

  p {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  p:first-child {
    font-weight: bold;

    font-size: 2rem;
  }
  p:last-child {
    font-size: 1.8rem;
  }
`;

const StyledLink = styled(Link)`
  color: #f8f9fa;

  transition: all 0.3s;

  &:hover {
    color: #e90064;
  }
`;

export default SongCard;

import styled from "styled-components";
import { TRANSITION_PERIOD } from "../assets/constants";

const SongCardSkeleton = () => (
  //JSX
  <StyledCard>
    <StyledBox></StyledBox>
    <StyledTypographyBox>
      <StyledParagraphBox></StyledParagraphBox>
      <StyledParagraphBox></StyledParagraphBox>
    </StyledTypographyBox>
  </StyledCard>
);

//STYLED COMPONENTS
const StyledCard = styled.article`
  background: rgba(255, 255, 255, 0.15);

  backdrop-filter: blur(4px);

  border-radius: 0.6rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  height: 30rem;
  max-width: 30rem;

  padding: 1rem;

  opacity: 0.8;

  overflow: hidden;
`;

const StyledBox = styled.div`
  animation: moveBackground 6s ease infinite;
  background: linear-gradient(to right, #000000, #1e1e1e);
  background-size: 400% 400%;

  border-radius: 0.6rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  position: relative;

  overflow: hidden;

  width: 100%;
  height: 100%;

  @keyframes moveBackground {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

const StyledTypographyBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 100%;
  text-align: left;
`;

const StyledParagraphBox = styled.div`
  animation: moveBackground 6s ease infinite;
  background: linear-gradient(to right, #000000, #1e1e1e);
  background-size: 400% 400%;

  border-radius: 0.5rem;

  height: 2rem;

  @keyframes moveBackground {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

export default SongCardSkeleton;

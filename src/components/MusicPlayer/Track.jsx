import React from "react";
import styled from "styled-components";

const Track = ({ isPlaying, isActive, activeSong }) => (
  <StyledTrack>
    <StyledImgBox isPlaying={isPlaying}>
      <StyledImg src={activeSong?.images?.coverart} alt="cover art" />
    </StyledImgBox>
    <StyledTypographyBox>
      <p>{activeSong?.title ? activeSong?.title : "No active Song"}</p>
      <p>{activeSong?.subtitle ? activeSong?.subtitle : "No active Song"}</p>
    </StyledTypographyBox>
  </StyledTrack>
);

const StyledTrack = styled.section`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  flex-grow: 0;
  flex-shrink: 1;
  width: 15rem;

  @media screen and (max-width: 360px) {
    display: none;
  }
`;

const StyledImgBox = styled.div`
  aspect-ratio: 1 / 1;

  animation: infiniteRotate 18s infinite linear forwards;
  animation-play-state: ${(props) => (props.isPlaying ? "running" : "paused")};

  border-radius: 50%;

  max-width: 7rem;
  min-width: 6rem;

  overflow: hidden;

  @keyframes infiniteRotate {
    0% {
      transform: rotateZ(0deg);
    }
    100% {
      transform: rotateZ(360deg);
    }
  }
`;

const StyledImg = styled.img`
  width: 100%;

  object-fit: cover;
`;

const StyledTypographyBox = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;

  line-height: 0.8;
  white-space: nowrap;

  & p {
    text-overflow: ellipsis;
    overflow: hidden;
    width: 100%;
  }

  & p:first-child {
    font-size: 3rem;
  }

  & p:last-child {
    color: #ccc;
    font-size: 1.6rem;
  }

  @media screen and (max-width: 880px) {
    display: none;
  }
`;

export default Track;

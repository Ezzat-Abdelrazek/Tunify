import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import PlayPause from "./PlayPause";
import { useGetSongDetailsQuery } from "../redux/services/shazam";

import { convertObject } from "../assets/helpers";

import TopChartCardSkeleton from "./TopChartCardSkeleton";
const SongBar = ({
  songid,
  i,
  artistId,
  isPlaying,
  activeSong,
  handlePauseClick,
  handlePlayClick,
  songs,
  setSongs,
}) => {
  let artistSong = null;
  let artistData = null;

  //Fetching Song Details
  const {
    data: song,
    isFetching,
    error,
  } = useGetSongDetailsQuery({
    songId: songid,
    artistId: `${artistId ? songid : ""}`,
  });

  //Setting Current Songs
  useEffect(() => {
    if (!song) return;
    if (artistId) {
      setSongs((state) => [convertObject(song), ...state]);
    } else {
      setSongs((state) => [song, ...state]);
    }
  }, [song]);

  //HANDLING FETCHING STATES
  if (isFetching) return <TopChartCardSkeleton />;
  if (error) return;

  if (song?.data) {
    artistSong = song?.data[0]?.attributes;
    artistData = convertObject(song);
  }

  const imgSrc = artistId
    ? artistSong?.artwork?.url.replace("{w}", "500").replace("{h}", "500")
    : song?.images?.coverart || song?.images?.background;

  //JSX
  return (
    <StyledArticle artistId={artistId}>
      <span>{i + 1}.</span>
      <StyledFigure>
        <StyledImg
          src={imgSrc}
          alt={artistId ? artistSong?.name : song.title}
        />

        <StyledFigcaption>
          <StyledTitleLink
            to={`/songs/${artistSong ? artistSong.playParams.id : song.key}`}
          >
            {artistId ? artistSong?.name : song.title}
          </StyledTitleLink>
          {song?.artists ? (
            <StyledSubtitleLink to={`/artists/${song?.artists[0]?.adamid}`}>
              {artistId ? artistSong?.artistName : song.subtitle}
            </StyledSubtitleLink>
          ) : (
            <StyledParagraphSubtitle>
              {artistId ? artistSong?.artistName : song.subtitle}
            </StyledParagraphSubtitle>
          )}
        </StyledFigcaption>
      </StyledFigure>
      <StyledButton>
        <PlayPause
          isPlaying={isPlaying}
          activeSong={activeSong}
          song={artistData ? artistData : song}
          handlePause={handlePauseClick}
          handlePlay={() =>
            handlePlayClick(artistData ? artistData : song, i, songs)
          }
        />
      </StyledButton>
    </StyledArticle>
  );
};

//STYLED COMPONENTS

const StyledArticle = styled.article`
  background: ${(props) =>
    props.artistId
      ? "linear-gradient(315deg, rgba(36, 36, 36,0.5 ) 0%, rgba(10 ,14, 18,0.5) 74%)"
      : ""};

  backdrop-filter: blur(4px);

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

  @media screen and (max-width: 1250px) {
    max-width: 15rem;
  }

  width: calc(80%);
`;

const StyledTitleLink = styled(Link)`
  color: #fff;

  font-size: 2.2rem;
  font-weight: bold;

  display: block;

  overflow: hidden;

  white-space: normal;

  width: 100%;

  text-overflow: ellipsis;

  transition: all 0.3s;

  &:hover {
    color: #e90046;
  }
  @media screen and (min-width: 760) {
    white-space: nowrap;
  }

  @media screen and (max-width: 470px) {
    font-size: 2rem;
    white-space: normal;
  }
  @media screen and (max-width: 320px) {
    font-size: 1.6rem;
  }
`;
const StyledSubtitleLink = styled(Link)`
  color: #ddd;

  display: block;

  font-size: 1.6rem;

  overflow: hidden;

  white-space: nowrap;

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

  text-overflow: ellipsis;

  transition: all 0.3s;

  width: 100%;

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

export default SongBar;

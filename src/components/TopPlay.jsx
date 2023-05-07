import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";

import TopChartCard from "./TopChartCard";

import { useGetTopChartsQuery } from "../redux/services/shazam";

import { TOP_ARTIST_NUM, TOP_CHARTS_SONGS_NUM } from "../assets/constants";

import "swiper/css";
import "swiper/css/free-mode";
import styled from "styled-components";

import TopChartCardSkeleton from "./TopChartCardSkeleton";

const TopPlay = ({ activeSong }) => {
  let topChartsIndex = -1;

  const { data, isFetching } = useGetTopChartsQuery();

  return (
    <StyledSection>
      <StyledFlexBox>
        <StyledH2>Top Charts</StyledH2>
      </StyledFlexBox>
      <StyledTopPlayBox>
        {isFetching
          ? new Array(TOP_CHARTS_SONGS_NUM)
              .fill(null)
              .map((_, i) => <TopChartCardSkeleton key={i} />)
          : data?.tracks?.slice(0, TOP_CHARTS_SONGS_NUM)?.map((song) => {
              if (
                !(
                  song?.images?.coverart &&
                  song?.images?.background &&
                  song?.hub?.actions
                )
              )
                return null;

              topChartsIndex++;

              return (
                <TopChartCard
                  key={song.key}
                  song={song}
                  i={topChartsIndex}
                  activeSong={activeSong}
                  data={data}
                />
              );
            })}
      </StyledTopPlayBox>

      <div>
        <StyledFlexBox>
          <StyledH2>Top Artist</StyledH2>
        </StyledFlexBox>
        <Swiper
          slidesPerView="auto"
          spaceBetween={15}
          freeMode
          centeredSlides
          centeredSlidesBounds
          modules={[FreeMode]}
        >
          {isFetching
            ? new Array(TOP_CHARTS_SONGS_NUM)
                .fill(null)
                .map((_, i) => <StyledSwiperSlide key={i} />)
            : data?.tracks?.slice(0, TOP_ARTIST_NUM).map((song, i) => {
                if (
                  !(
                    song?.images?.coverart &&
                    song?.images?.background &&
                    song?.hub?.actions
                  )
                )
                  return null;
                if (!song?.artists) return null;
                return (
                  <SwiperSlide
                    key={song.key}
                    style={{ width: "25%", height: "auto" }}
                  >
                    <Link to={`/artists/${song?.artists[0]?.adamid}`}>
                      <StyledArtistImg
                        src={song?.images.background}
                        alt={song.artist}
                      />
                    </Link>
                  </SwiperSlide>
                );
              })}
        </Swiper>
      </div>
    </StyledSection>
  );
};

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
`;
const StyledFlexBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledH2 = styled.h2`
  font-size: 4rem;
`;

const StyledArtistImg = styled.img`
  border-radius: 50%;

  width: 100%;

  object-fit: cover;
`;

const StyledTopPlayBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const StyledSwiperSlide = styled(SwiperSlide)`
  animation: AnimationName 6s ease infinite;

  background: linear-gradient(to right, #000000, #1e1e1e);
  background-size: 400% 400%;

  border-radius: 50%;
  width: 25%;
  aspect-ratio: 1;

  @keyframes AnimationName {
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

export default TopPlay;

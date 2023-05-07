import styled from "styled-components";

const TopChartCardSkeleton = () => {
  return (
    <StyledArticle>
      <StyledFigureDiv>
        <StyledImgDiv />

        <StyledFigcaptionDiv>
          <StyledTitleLinkSpan>
            <div></div>
          </StyledTitleLinkSpan>
          <StyledSubtitleLinkSpan>
            <div></div>
          </StyledSubtitleLinkSpan>
        </StyledFigcaptionDiv>
      </StyledFigureDiv>
    </StyledArticle>
  );
};

const StyledArticle = styled.article`
  border-radius: 1rem;

  display: flex;
  align-items: center;
  gap: 1rem;

  font-size: 2rem;

  padding: 1rem;
`;

const StyledFigureDiv = styled.div`
  background-color: #181818;

  border-radius: 1rem;

  display: flex;
  gap: 1rem;

  height: 10rem;
  width: 100%;

  padding: 1rem;
`;

const StyledFigcaptionDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 1rem;

  line-height: 0.8;

  width: calc(80%);
`;

const StyledTitleLinkSpan = styled.span`
  animation: AnimationName 6s ease infinite;

  background: linear-gradient(to right, #000000, #1e1e1e);
  background-size: 400% 400%;

  border-radius: 0.4rem;

  height: 3rem;
  width: 72%;

  transition: all 0.3s;

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
const StyledSubtitleLinkSpan = styled.span`
  animation: AnimationName 6s ease infinite;

  background: linear-gradient(to right, #000000, #1e1e1e);
  background-size: 400% 400%;

  border-radius: 0.4rem;

  height: 3rem;
  width: 72%;

  transition: all 0.3s;

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

const StyledImgDiv = styled.div`
  animation: AnimationName 6s ease infinite;

  background: linear-gradient(to right, #000000, #1e1e1e);
  background-size: 400% 400%;

  border-radius: 1rem;

  flex-shrink: 0;

  object-fit: cover;

  width: 20%;
  max-width: 8.8rem;
  min-width: 5.5rem;

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

export default TopChartCardSkeleton;

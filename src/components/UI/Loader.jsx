import styled from "styled-components";

const Loader = ({ title = "Loading...", style = {} }) => {
  return (
    <StyledBox style={style}>
      <StyledLoader title={title} />
      <p>{title}</p>
    </StyledBox>
  );
};

const StyledBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  font-size: 2rem;

  white-space: nowrap;

  justify-content: center;

  position: absolute;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);

  @media screen and (max-width: 780px) {
    transform: translate(-50%, -20%);
  }
`;

const StyledLoader = styled.span`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: inline-block;
  border-top: 3px solid #fff;
  border-right: 3px solid transparent;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default Loader;

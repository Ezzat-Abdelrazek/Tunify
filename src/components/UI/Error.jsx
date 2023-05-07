import styled from "styled-components";
import error from "../../assets/error.svg";

const Error = () => (
  <StyledError>
    <StyledImg src={error} alt="Something Went Wrong" />
    <h2>Something seems to have gone wrong, can you try once more</h2>
  </StyledError>
);

const StyledError = styled.div`
  font-size: 2rem;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  position: absolute;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);

  text-align: center;
`;

const StyledImg = styled.img`
  width: 40rem;
`;

export default Error;

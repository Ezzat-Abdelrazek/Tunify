import React from "react";
import styled from "styled-components";

const Seekbar = ({ value, min, max, onInput, setSeekTime, appTime }) => {
  // converts the time to format 0:00
  const getTime = (time) =>
    `${Math.floor(time / 60)}:${`0${Math.floor(time % 60)}`.slice(-2)}`;

  return (
    <StyledSeekBarBox>
      <StyledButton
        type="button"
        onClick={() => setSeekTime(appTime - 5)}
        aria-label="Skip 5 seconds Backward"
      >
        -
      </StyledButton>
      <StyledParagraph>{value === 0 ? "0:00" : getTime(value)}</StyledParagraph>
      <StyledInput
        type="range"
        step="any"
        value={value}
        min={min}
        max={max}
        onInput={onInput}
      />
      <StyledParagraph>{max === 0 ? "0:00" : getTime(max)}</StyledParagraph>
      <StyledButton
        type="button"
        onClick={() => setSeekTime(appTime + 5)}
        aria-label="Skip 5 seconds forward"
      >
        +
      </StyledButton>
    </StyledSeekBarBox>
  );
};

const StyledSeekBarBox = styled.section`
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 1rem;
`;

const StyledParagraph = styled.p`
  font-size: 1.8rem;
`;

const StyledInput = styled.input`
  cursor: pointer;

  flex: 1;

  height: 0.3rem;
`;

const StyledButton = styled.button`
  align-self: flex-start;

  background: none;

  border: none;

  color: #eee;

  font-size: 2rem;
`;

export default Seekbar;

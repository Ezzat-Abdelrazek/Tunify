import React from "react";
import {
  BsFillVolumeUpFill,
  BsVolumeDownFill,
  BsFillVolumeMuteFill,
} from "react-icons/bs";
import styled from "styled-components";

const VolumeBar = ({ value, min, max, onChange, setVolume }) => (
  <StyledVolumeBarBox>
    {value <= 1 && value > 0.5 && (
      <BsFillVolumeUpFill size={25} color="#FFF" onClick={() => setVolume(0)} />
    )}
    {value <= 0.5 && value > 0 && (
      <BsVolumeDownFill size={25} color="#FFF" onClick={() => setVolume(0)} />
    )}
    {value === 0 && (
      <BsFillVolumeMuteFill
        size={25}
        color="#FFF"
        onClick={() => setVolume(1)}
      />
    )}
    <StyledInput
      type="range"
      step="any"
      value={value}
      min={min}
      max={max}
      onChange={onChange}
    />
  </StyledVolumeBarBox>
);

const StyledVolumeBarBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  min-width: 16rem;

  @media screen and (max-width: 660px) {
    display: none;
  }
`;

const StyledInput = styled.input`
  border-radius: 10rem;

  cursor: pointer;

  justify-self: flex-end;

  height: 0.3rem;

  max-width: 14rem;
  min-width: 10rem;
`;

export default VolumeBar;

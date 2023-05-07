import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";

import styled from "styled-components";

const Searchbar = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate(`/search/${searchTerm}`);
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <StyledSrLabel htmlFor="search-field">Search For Songs</StyledSrLabel>
      <StyledBox>
        <FiSearch />
        <StyledInput
          name="search-field"
          autoComplete="off"
          id="search-field"
          placeholder="Search"
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </StyledBox>
    </form>
  );
};

const StyledBox = styled.div`
  background-color: #fff;

  border-radius: 10rem;

  display: flex;
  align-items: center;
  gap: 1rem;

  width: 70%;

  max-width: 40rem;

  padding: 0.2rem 1rem;

  svg {
    color: #666;

    font-size: 3rem;
  }
`;
const StyledSrLabel = styled.label`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

const StyledInput = styled.input`
  background: none;

  border: none;

  color: #000;

  font-family: inherit;
  font-size: 2.5rem;

  display: inline-block;

  padding-top: 0.4rem;

  white-space: nowrap;

  width: 100%;

  &:focus {
    outline: none;
  }
  &::placeholder {
  }
`;

export default Searchbar;

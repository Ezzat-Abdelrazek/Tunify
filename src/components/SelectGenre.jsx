import React from "react";
import styled from "styled-components";
import { genres } from "../assets/constants";
import { useDispatch } from "react-redux";
import { selectGenreListId } from "../redux/features/playerSlice";

const SelectGenre = ({ listsId, setCurrentGenre }) => {
  const dispatch = useDispatch();

  const genreChangeHandler = (e) => {
    const genre = listsId.global.genres.filter((genre) =>
      genre.urlPath.includes(e.target.value.toLowerCase())
    )[0];

    setCurrentGenre(genre.name);

    dispatch(selectGenreListId(genre.listid));
  };

  return (
    <StyledSelect onChange={genreChangeHandler}>
      {genres.map((genre) => (
        <option value={genre.value} key={genre.value}>
          {genre.title}
        </option>
      ))}
    </StyledSelect>
  );
};

const StyledSelect = styled.select`
  background: #333;

  border-radius: 0.4rem;

  color: #eee;

  font-family: inherit;
  font-size: 2rem;

  padding: 0.5rem 1rem;

  &:focus {
    border: 1.5px solid #eee;
    outline: none;
  }
`;

export default SelectGenre;

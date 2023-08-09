
import React, { useState } from "react";
import MovieList from "./movieList"; 

export default function App() {
  const [searchInput, setSearchInput] = useState("");
  const [showMovieDetails, setShowMovieDetails] = useState(false);

  const handleSearchInput = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearchButtonClick = () => {
    setShowMovieDetails(true);
  };

  return (
    <div className="color">
      <div className="nav">
        <h1 className="movie">MOVIE NAME</h1>
        <input
          type="search"
          value={searchInput}
          onChange={handleSearchInput}
        />
        <button className="btn" onClick={handleSearchButtonClick}>
          Search!
        </button>
      </div>
      {showMovieDetails && <MovieList movieTitle={searchInput} />}
      < pages />
    </div>
  );
}

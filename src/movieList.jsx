import React, { useState, useEffect } from "react";
import Pagination from "./pagination";

const apiKey = 'b3c987f78b164fa20eee5fcf499ab486';
const baseUrl = 'https://api.themoviedb.org/3';

const MovieList = ({ movieTitle }) => {
  const [movieData, setMovieData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setPostsPerPage] = useState(3)

  useEffect(() => {
    const fetchMovieData = async (movieTitle) => {
      try {
        const searchUrl = `${baseUrl}/search/movie?api_key=${apiKey}&query=${encodeURIComponent(movieTitle)}`;
        const response = await fetch(searchUrl);
        const data = await response.json();

        if (data.results) {
          setMovieData(data.results);
        } else {
          setMovieData([]);
        }
      } catch (error) {
        console.error('Error fetching movie data:', error);
        setMovieData([]);
      }
    };

    if (movieTitle) {
      fetchMovieData(movieTitle);
    }
  }, [movieTitle]);


  const lastPostIndex = currentPage*postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = movieData.slice(firstPostIndex, lastPostIndex)

  return (
    <div>
      {currentPosts.length > 0 ? (
        <div >
          {currentPosts.map((movie) => (
            <div key={movie.id}className="movies">
              {movie.poster_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  alt={`${movie.title} Poster`}
                />
              )}
              <div className="movie-details">
              <h2>{movie.title}</h2>
              <p>RELEASE DATE: {movie.release_date}</p>
              <p>RATING: {movie.vote_average}</p>
              <p className="movie-overview">{movie.overview}</p>
              </div>
              
            </div>

            
          ))}
          <Pagination
                        totalPosts={movieData.length}
                        postsPerPage={postsPerPage}
                        setCurrentPage={setCurrentPage}
                        currentPage={currentPage}
                    />
        </div>
      ) : (
        <p>No movies found.</p>
      )}
    </div>
  );
};

export default MovieList;

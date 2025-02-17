import { useMovieContext } from "../contexts/MovieContext";

import props from "prop-types";

const MovieCard = ({ movie }) => {
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
  const favorite = isFavorite(movie.id);

  function handleClick(e) {
    e.preventDefault();
    if (favorite) {
      removeFromFavorites(movie.id);
    } else addToFavorites(movie);
  }

  return (
    <div className="movie-card group relative rounded-lg overflow-hidden bg-dark transition-[transform] duration-200 h-full flex flex-col hover:transform-[transitionY(-5px)] text-[0.9rem] md:text-base max-w-[500px]">
      <div className="movie-poster relative aspect-[2/3] w-full">
        <img
          className="w-full h-full object-cover"
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <div className="movie-overlay absolute top-0 left-0 right-0 bottom-0 bg-gradient opacity-0 transition-opacity duration-200 flex flex-col justify-end p-4 group-hover:opacity-100">
          <button
            className={`favorite-btn ${
              favorite ? "active" : ""
            } absolute top-4 right-4 text-light text-xl md:text-2xl p-2 bg-dark rounded-[50%] w-8 h-8 md:w-10 md:h-10 flex items-center justify-center transition-[background-color] duration-200 hover:bg-dark active:text-red-400`}
            onClick={handleClick}
          >
            {favorite ? "❤️" : "🤍"}
          </button>
        </div>
      </div>
      <div className="movie-info p-3 md:p-4 flex-1 flex flex-col g-2 ">
        <h3 className="text-base m-0">{movie.title}</h3>
        <p className="text-[#999] text-[0.9rem]">
          {movie.release_data?.split("-")[0]}
        </p>
      </div>
    </div>
  );
};

MovieCard.propTypes = {
  movie: props.object.isRequired,
};

export default MovieCard;

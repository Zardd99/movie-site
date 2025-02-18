import "../css/index.css";

import MovieCard from "../components/MovieCard";

import { useState, useEffect } from "react";
import { searchMovies, getPopularMovies } from "../services/api.js";
const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch (err) {
        console.log(err);
        setError("Falied to load movies...");
      } finally {
        setLoading(false);
      }
    };

    loadPopularMovies();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    if (loading) return;
    setLoading(true);
    try {
      const searchResult = await searchMovies(searchQuery);
      setMovies(searchResult);
      setError(null);
    } catch (err) {
      console.log(err);
      setError("Failed to search movies...");
      setLoading(false);
    } finally {
      setLoading(false);
    }
    setSearchQuery("");
  };

  return (
    <>
      <div className="home px-0 py-4 sm:py-8 sm:px-0 w-full box-border">
        <form
          onSubmit={handleSearch}
          className="search-form max-w-[600px] mb-4 sm:mt-0 sm:mb-auto mx-8 flex gap-4 px-4 py-0 box-border"
        >
          <input
            type="text"
            placeholder="Search for movies..."
            className="search-input flex-1 px-4 py-3 rounded-sm bg-slate-800 text-light text-base focus:outline-0 focus:box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.05);"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
          />
          <button
            type="submit"
            className="search-button px-6 py-3 bg-slate-600 text-light rounded-sm font-[500] transition-colors duration-200 whitespace-nowrap hover:bg-slate-500"
          >
            Search
          </button>
        </form>

        {error && <div className="error-message">{error}</div>}

        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <div
            className={` ${
              movies.length < 5
                ? "movies-flex flex gap-4 w-full mt-4 justify-start"
                : "movies-grid grid grid-cols-auto-fit-minmax gap-6 w-full p-4 mt-4 box-border"
            } animate-[fadeIn] duration-300`}
          >
            {movies.map(
              (movie) =>
                movie.title.toLowerCase().startsWith(searchQuery) && (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    isHistoryPage={false}
                  />
                )
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Home;

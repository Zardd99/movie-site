import "../css/index.css";
import MovieCard from "../components/MovieCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper/modules";
import { useState, useEffect } from "react";
import {
  searchMovies,
  getPopularMovies,
  getTrendingMovies,
} from "../services/api";

import { Link } from "react-router-dom";

import "swiper/css";
import "swiper/css/scrollbar";
const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTrendingMovies = async () => {
      try {
        const trendingMovies = await getTrendingMovies();
        setTrendingMovies(trendingMovies);
      } catch (err) {
        console.log(err);
        setError("Failed to load movies...");
      } finally {
        setLoading(false);
      }
    };

    loadTrendingMovies();
  }, []);

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch (err) {
        console.log(err);
        setError("Failed to load movies...");
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
      setTrendingMovies(searchResult);
      setMovies(searchResult);
      setError(null);
    } catch (err) {
      console.log(err);
      setError("Failed to search movies...");
    } finally {
      setLoading(false);
    }
    setSearchQuery("");
  };

  return (
    <>
      <div className="home px-0 py-4 sm:py-8 sm:px-0 w-full box-border mt-20 flex flex-col items-center justify-center">
        <form
          onSubmit={handleSearch}
          className="search-form max-w-[600px] mb-4 sm:mt-0 sm:mb-auto mx-8 flex gap-4 px-4 py-0 box-border"
        >
          <input
            type="text"
            placeholder="Search for movies..."
            className="search-input flex-1 rounded-sm text-base focus:outline-0 focus:bg-transparent focus:text-button py-[10px] px-[10px] md:py-[15px] md:px-[30px] bg-button border-[2px] border-button border-solid shadow-button sm:text-sm md:text-base  font-black text-dark pointer mr-[15px] transition-[0.3s] text-nowrap hover:bg-transparent hover:shadow-none hover:text-button"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
            aria-label="Search for movies"
          />
          <button
            type="submit"
            autoFocus
            className="inline-block py-[10px] px-[18px] sm:py-[12.5px] sm:px-[22.5px] md:py-[15px] md:px-[30px] bg-light border-[2px] border-light border-solid shadow-light text-xs sm:text-sm md:text-base font-black  pointer mr-[15px] transition-[0.3s] text-nowrap hover:bg-transparent hover:shadow-none  !text-dark hover:!text-light transition-none"
            aria-label="Submit search"
          >
            Search
          </button>
        </form>

        {error && <div className="error-message">{error}</div>}

        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <>
            {movies.length > 0 ? (
              <>
                <div className="mt-10">
                  <h2 className="text-base md:text-lg lg:text-xl xl:text-2xl">
                    Popular Movies
                  </h2>
                </div>
                <Swiper
                  modules={[Scrollbar]}
                  spaceBetween={20}
                  slidesPerView={"auto"}
                  scrollbar={{ hide: true, draggable: true }}
                  lazy={true}
                  preloadImages={false}
                  className="mySwiper !px-4 !py-4 w-full h-full"
                >
                  {movies.map(
                    (movie, index) =>
                      movie.title
                        .toLowerCase()
                        .startsWith(searchQuery.toLowerCase()) && (
                        <SwiperSlide
                          key={movie.id}
                          className="!w-[200px] md:!w-[240px] lg:!w-[280px]"
                        >
                          <MovieCard
                            movie={movie}
                            isHistoryPage={false}
                            isPopular={true}
                            index={String(index + 1).padStart(2, "0")}
                          />
                        </SwiperSlide>
                      )
                  )}
                </Swiper>
              </>
            ) : null}

            <div className="mt-10">
              <h2 className="text-base md:text-lg lg:text-xl xl:text-2xl">
                Trending Movies
              </h2>
            </div>
            <div
              className={`grid grid-cols-auto-fit-minmax gap-6 w-full p-4 mt-4 box-border place-items-center
              animate-[fadeIn] duration-300`}
            >
              {trendingMovies.map(
                (movie) =>
                  movie.title
                    .toLowerCase()
                    .startsWith(searchQuery.toLowerCase()) && (
                    <MovieCard
                      key={movie.id}
                      movie={movie}
                      isHistoryPage={false}
                      isPopular={false}
                    />
                  )
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Home;

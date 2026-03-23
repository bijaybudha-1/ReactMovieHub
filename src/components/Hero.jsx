import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTrending, getBackdropUrl, getImageUrl } from '../utils/tmdb';
import { useAppContext } from '../context/AppContext';

export default function Hero() {
  const [movies, setMovies] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { addToWatchlist, addToFavorites } = useAppContext();

  useEffect(() => {
    const fetchHeroMovies = async () => {
      const data = await getTrending('movie', 'day');
      if (data && data.results) {
        setMovies(data.results.slice(0, 5));
      }
    };
    fetchHeroMovies();
  }, []);

  useEffect(() => {
    if (movies.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % movies.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [movies]);

  if (movies.length === 0) {
    return (
      <section className="relative min-h-[85vh] flex items-center bg-bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-black/50 animate-pulse"></div>
      </section>
    );
  }

  const m = movies[currentSlide];
  const rating = (m.vote_average || 0).toFixed(1);

  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-bg-primary">
      {/* Background Slides */}
      <div className="absolute inset-0 z-[2]">
        {movies.map((movie, index) => (
          <div
            key={movie.id}
            className={`absolute inset-0 transition-opacity duration-800 bg-cover bg-center bg-no-repeat ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
            style={{ backgroundImage: `url(${getBackdropUrl(movie.backdrop_path)})` }}
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(90deg, var(--hero-gradient-start) 0%, var(--hero-gradient-mid) 40%, var(--hero-gradient-end) 70%, transparent 100%)',
              }}
            ></div>
          </div>
        ))}
      </div>

      {/* Decorative Blobs */}
      <div className="absolute inset-0 z-0 opacity-30 mix-blend-screen pointer-events-none">
        <svg viewBox="0 0 500 500" preserveAspectRatio="none" className="w-full h-full fill-primary blur-3xl">
          <path d="M420,300Q380,500,200,450Q20,400,60,250Q100,100,280,80Q460,60,420,300Z" />
        </svg>
      </div>

      <div className="container-custom relative z-[3] w-full">
        <div className="max-w-[600px] py-16">
          <span className="inline-flex items-center gap-2 bg-primary/15 border border-primary/30 px-4 py-1 rounded-full text-xs font-semibold text-primary-light mb-6 uppercase tracking-widest">
            <i className="bx bxs-hot text-sm"></i> Trending Now
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-[4.5rem] font-extrabold leading-[1.1] mb-4 text-hero-title-color">
            {m.title || m.name}
          </h1>
          <p className="text-base md:text-lg text-hero-subtitle-color leading-relaxed mb-8 line-clamp-3">
            {m.overview}
          </p>
          <div className="flex items-center gap-6 mb-8 flex-wrap">
            <span className="flex items-center gap-2 text-sm text-text-secondary font-semibold text-rating-high">
              <i className="bx bxs-star text-lg"></i> {rating}
            </span>
            <span className="flex items-center gap-2 text-sm text-text-secondary">
              <i className="bx bx-calendar text-primary text-lg"></i>{' '}
              {m.release_date || m.first_air_date || 'TBA'}
            </span>
            <span className="flex items-center gap-2 text-sm text-text-secondary">
              <i className="bx bx-movie-play text-primary text-lg"></i> Movie
            </span>
          </div>
          <div className="flex gap-4 flex-wrap">
            <Link to={`/movie/${m.id}`} className="btn btn-primary btn-lg">
              <i className="bx bx-play"></i> View Details
            </Link>
            <button
              onClick={() => addToWatchlist({ ...m, media_type: 'movie' })}
              className="btn btn-outline btn-lg"
            >
              <i className="bx bx-bookmark"></i> Watchlist
            </button>
            <button
              onClick={() => addToFavorites({ ...m, media_type: 'movie' })}
              className="btn btn-outline btn-lg"
            >
              <i className="bx bx-heart"></i> Favorite
            </button>
          </div>
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-2 z-[5]">
        {movies.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2.5 rounded-full transition-all duration-250 cursor-pointer ${
              index === currentSlide ? 'w-8 bg-primary' : 'w-2.5 bg-[var(--indicator-bg)] hover:bg-[var(--indicator-hover)]'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </section>
  );
}

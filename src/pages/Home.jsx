import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import MovieCard, { MovieCardSkeleton } from '../components/MovieCard';
import MovieGrid from '../components/MovieGrid';
import HScrollSection from '../components/HScrollSection';
import { useAppContext } from '../context/AppContext';
import {
  getTrending,
  getPopularMovies,
  getTopRatedMovies,
  getPopularTVShows,
  getUpcomingMovies,
  getPopularPeople,
  getMovieGenres,
  getImageUrl,
  getBackdropUrl,
} from '../utils/tmdb';

export default function Home() {
  const { watchlist, showToast } = useAppContext();
  
  // States
  const [trendingRange, setTrendingRange] = useState('day');
  const [trendingList, setTrendingList] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [popularTV, setPopularTV] = useState([]);
  const [genres, setGenres] = useState([]);
  const [actors, setActors] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  
  const [loadingObj, setLoadingObj] = useState({
    trending: true,
    topRated: true,
    popularTV: true,
    genres: true,
    actors: true,
    upcoming: true
  });

  const updateLoading = (key, value) => setLoadingObj(prev => ({ ...prev, [key]: value }));

  // Loaders
  useEffect(() => {
    const loadTrending = async () => {
      updateLoading('trending', true);
      const data = await getTrending('all', trendingRange);
      if (data?.results) setTrendingList(data.results);
      updateLoading('trending', false);
    };
    loadTrending();
  }, [trendingRange]);

  useEffect(() => {
    const loadInitialData = async () => {
      // Top Rated
      getTopRatedMovies().then(data => {
        if (data?.results) setTopRatedMovies(data.results.slice(0, 10));
        updateLoading('topRated', false);
      });
      
      // Popular TV
      getPopularTVShows().then(data => {
        if (data?.results) setPopularTV(data.results.slice(0, 10));
        updateLoading('popularTV', false);
      });

      // Genres
      getMovieGenres().then(data => {
        if (data?.genres) setGenres(data.genres.slice(0, 8));
        updateLoading('genres', false);
      });

      // Actors
      getPopularPeople().then(data => {
        if (data?.results) setActors(data.results.slice(0, 12));
        updateLoading('actors', false);
      });

      // Upcoming
      getUpcomingMovies().then(data => {
        if (data?.results) setUpcomingMovies(data.results.slice(0, 6));
        updateLoading('upcoming', false);
      });
    };

    loadInitialData();
  }, []);

  const handleNewsletter = (e) => {
    e.preventDefault();
    showToast("Subscribed to newsletter successfully!", "success");
    e.target.reset();
  };

  return (
    <div className="min-h-screen">
      <Hero />

      {/* 2. Trending Section */}
      <section className="section-padding bg-bg-secondary">
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <h2 className="section-title mb-0">
              <span className="accent-dot"></span>
              Trending Now
            </h2>
            <div className="flex items-center bg-glass-bg border border-border-color rounded-full p-1 w-max">
              <button
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                  trendingRange === 'day' ? 'bg-primary text-white shadow-glow' : 'text-text-secondary hover:text-text-primary hover:bg-glass-bg-hover'
                }`}
                onClick={() => setTrendingRange('day')}
              >
                Today
              </button>
              <button
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                  trendingRange === 'week' ? 'bg-primary text-white shadow-glow' : 'text-text-secondary hover:text-text-primary hover:bg-glass-bg-hover'
                }`}
                onClick={() => setTrendingRange('week')}
              >
                This Week
              </button>
            </div>
          </div>
          
          <HScrollSection>
            {loadingObj.trending 
              ? [...Array(8)].map((_, i) => <div key={i} className="hscroll-item"><MovieCardSkeleton /></div>)
              : trendingList.map(item => (
                  <div key={item.id} className="hscroll-item">
                    <MovieCard item={item} mediaType={item.media_type || 'movie'} />
                  </div>
                ))
            }
          </HScrollSection>
        </div>
      </section>

      {/* 3. Top Rated Movies */}
      <section className="section-padding bg-bg-primary">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-8">
            <h2 className="section-title mb-0">
              <span className="accent-dot"></span>
              Top Rated Movies
            </h2>
            <Link to="/movies" className="view-all">View All <i className='bx bx-right-arrow-alt text-lg'></i></Link>
          </div>
          <MovieGrid items={topRatedMovies} loading={loadingObj.topRated} skeletons={10} mediaType="movie" />
        </div>
      </section>

      {/* 4. Popular TV Shows */}
      <section className="section-padding bg-bg-secondary">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-8">
            <h2 className="section-title mb-0">
              <span className="accent-dot"></span>
              Popular TV Shows
            </h2>
            <Link to="/tv" className="view-all">View All <i className='bx bx-right-arrow-alt text-lg'></i></Link>
          </div>
          <MovieGrid items={popularTV} loading={loadingObj.popularTV} skeletons={10} mediaType="tv" />
        </div>
      </section>

      {/* 5. Explore Genres */}
      <section className="section-padding bg-bg-primary">
        <div className="container-custom">
          <h2 className="section-title mb-8 text-center justify-center">
            <span className="accent-dot"></span>
            Explore Featured Genres
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {loadingObj.genres 
              ? [...Array(8)].map((_, i) => <div key={i} className="h-24 bg-bg-card rounded-lg animate-pulse border border-border-color"></div>)
              : genres.map(genre => (
                <Link key={genre.id} to="/movies" className="group relative h-24 rounded-lg overflow-hidden border border-border-color bg-bg-card flex flex-col justify-center items-center gap-2 hover:-translate-y-1 hover:border-primary hover:shadow-lg transition-all duration-300">
                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <i className={`bx ${getGenreIcon(genre.name)} text-2xl text-primary transition-transform group-hover:scale-110`}></i>
                  <span className="text-sm font-bold text-text-primary z-10">{genre.name}</span>
                </Link>
              ))
            }
          </div>
        </div>
      </section>

      {/* 6. Popular Actors */}
      <section className="section-padding bg-bg-secondary">
        <div className="container-custom">
          <h2 className="section-title justify-center text-center">
            <span className="accent-dot"></span>
            Popular Actors
          </h2>
          <p className="text-center text-text-secondary max-w-2xl mx-auto mb-12">
            Discover the most trending actors and actresses in the industry right now based on TMDB popularity rankings.
          </p>
          
          <HScrollSection>
            {loadingObj.actors 
              ? [...Array(10)].map((_, i) => (
                  <div key={i} className="hscroll-item flex flex-col items-center">
                    <div className="w-32 h-32 rounded-full bg-bg-card border-2 border-border-color mb-4 animate-pulse"></div>
                    <div className="h-4 bg-bg-card rounded w-24"></div>
                  </div>
                ))
              : actors.map(actor => (
                  <div key={actor.id} className="hscroll-item flex flex-col items-center group cursor-pointer w-[140px] px-2 text-center">
                    <div className="w-[120px] h-[120px] rounded-full overflow-hidden border-2 border-transparent transition-all duration-300 group-hover:scale-110 group-hover:border-primary group-hover:shadow-glow mb-4">
                      <img 
                        src={getImageUrl(actor.profile_path, 'w185', actor.name)} 
                        alt={actor.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h4 className="text-sm font-bold text-text-primary line-clamp-1 group-hover:text-primary transition-colors">{actor.name}</h4>
                    <p className="text-xs text-text-muted mt-1 line-clamp-1">{actor.known_for_department}</p>
                  </div>
                ))
            }
          </HScrollSection>
        </div>
      </section>

      {/* 7. Community Reviews */}
      <section className="section-padding bg-bg-primary relative overflow-hidden">
        <div className="absolute top-1/4 -right-[200px] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] z-[1]"></div>
        <div className="container-custom relative z-[2]">
          <h2 className="section-title justify-center text-center">
            <span className="accent-dot"></span>
            Community Reviews
          </h2>
          <p className="text-center text-text-secondary max-w-2xl mx-auto mb-12">
            See what our community members are saying about the latest blockbuster releases and hidden gems.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-glass-bg border border-border-color rounded-xl p-8 hover:-translate-y-2 transition-all duration-300 hover:shadow-lg">
              <div className="flex items-center gap-1 text-rating-high mb-4">
                <i className="bx bxs-star"></i><i className="bx bxs-star"></i><i className="bx bxs-star"></i><i className="bx bxs-star"></i><i className="bx bxs-star-half"></i>
              </div>
              <p className="text-text-secondary italic mb-6 leading-relaxed flex-1">
                "MovieHub has completely transformed how I track my watchlists. The interface is stunning and the trailer integration is flawless."
              </p>
              <div className="flex items-center gap-4 mt-auto">
                <img src={getImageUrl(null, 'w185', 'Sarah J.')} alt="User" className="w-12 h-12 rounded-full border border-border-color" />
                <div>
                  <h4 className="text-sm font-bold">Sarah Jenkins</h4>
                  <p className="text-xs text-text-muted">Pro Member</p>
                </div>
              </div>
            </div>

            <div className="bg-glass-bg border border-border-color rounded-xl p-8 hover:-translate-y-2 transition-all duration-300 hover:shadow-lg relative">
              <span className="absolute -top-3 -right-3 text-6xl text-primary/10 font-serif">"</span>
              <div className="flex items-center gap-1 text-rating-high mb-4">
                <i className="bx bxs-star"></i><i className="bx bxs-star"></i><i className="bx bxs-star"></i><i className="bx bxs-star"></i><i className="bx bxs-star"></i>
              </div>
              <p className="text-text-secondary italic mb-6 leading-relaxed flex-1">
                "The dark mode is perfect for browsing late at night. I love how fast it is to find similar movies to what I've just watched."
              </p>
              <div className="flex items-center gap-4 mt-auto">
                <img src={getImageUrl(null, 'w185', 'Mike R.')} alt="User" className="w-12 h-12 rounded-full border border-border-color" />
                <div>
                  <h4 className="text-sm font-bold">Mike Ross</h4>
                  <p className="text-xs text-text-muted">Cinephile</p>
                </div>
              </div>
            </div>

            <div className="bg-glass-bg border border-border-color rounded-xl p-8 hover:-translate-y-2 transition-all duration-300 hover:shadow-lg">
              <div className="flex items-center gap-1 text-rating-high mb-4">
                <i className="bx bxs-star"></i><i className="bx bxs-star"></i><i className="bx bxs-star"></i><i className="bx bxs-star"></i><i className="bx bx-star"></i>
              </div>
              <p className="text-text-secondary italic mb-6 leading-relaxed flex-1">
                "Getting TMDB data formatted so beautifully is a treat. It's now my go-to homepage for all entertainment news and releases."
              </p>
              <div className="flex items-center gap-4 mt-auto">
                <img src={getImageUrl(null, 'w185', 'Elena')} alt="User" className="w-12 h-12 rounded-full border border-border-color" />
                <div>
                  <h4 className="text-sm font-bold">Elena Rodriguez</h4>
                  <p className="text-xs text-text-muted">TV Critic</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Watchlist Preview */}
      <section className="py-8 bg-bg-secondary border-t border-border-color">
        <div className="container-custom flex flex-col md:flex-row items-center justify-between gap-6 bg-glass-bg border border-border-color rounded-2xl p-6 md:p-8">
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold mb-2">Your Watchlist</h2>
            <p className="text-text-secondary">
              {watchlist.length === 0 
                ? "You haven't added anything to your watchlist yet. Start exploring!" 
                : `You have ${watchlist.length} items waiting to be watched.`}
            </p>
          </div>
          <div className="flex items-center gap-MIN md:w-auto w-full overflow-hidden">
             {watchlist.slice(0, 4).map(item => (
                <Link key={item.id} to={`/${item.media_type}/${item.id}`} className="w-14 h-20 rounded shadow-md overflow-hidden flex-shrink-0 -ml-2 first:ml-0 hover:-translate-y-1 transition-transform relative z-10 hover:z-20 border border-white/20">
                  <img src={getImageUrl(item.poster_path, 'w92')} alt="poster" className="w-full h-full object-cover" />
                </Link>
             ))}
             {watchlist.length > 4 && (
               <div className="w-14 h-20 rounded shadow-md bg-bg-elevated flex items-center justify-center -ml-2 border border-white/20 text-xs font-bold relative z-[5]">
                 +{watchlist.length - 4}
               </div>
             )}
          </div>
          <Link to="/favorites" className="btn btn-primary whitespace-nowrap w-full md:w-auto mt-4 md:mt-0">
            Go to Library
          </Link>
        </div>
      </section>

      {/* 9. Upcoming Releases */}
      <section className="section-padding bg-bg-primary">
        <div className="container-custom">
          <h2 className="section-title mb-8">
            <span className="accent-dot"></span>
            Coming Soon to Theaters
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loadingObj.upcoming 
              ? [...Array(6)].map((_, i) => <div key={i} className="h-48 bg-bg-card animate-pulse rounded-lg bg-cover bg-center"></div>)
              : upcomingMovies.map(movie => (
                <Link key={movie.id} to={`/movie/${movie.id}`} className="group relative h-48 rounded-lg overflow-hidden flex items-end p-6 border border-border-color cursor-pointer transition-all duration-300 hover:shadow-xl hover:border-primary/50">
                  <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{backgroundImage: `url(${getBackdropUrl(movie.backdrop_path)})`}}></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[rgba(10,10,15,0.7)] to-transparent"></div>
                  <div className="relative z-10 w-full">
                    <div className="flex items-center gap-2 mb-2">
                       <span className="bg-primary text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">Upcoming</span>
                       <span className="text-xs font-semibold text-text-secondary tracking-widest uppercase">
                         {new Date(movie.release_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                       </span>
                    </div>
                    <h3 className="text-xl font-bold text-white line-clamp-1 group-hover:text-primary transition-colors">{movie.title}</h3>
                  </div>
                </Link>
              ))
            }
          </div>
        </div>
      </section>

      {/* 10. Newsletter */}
      <section className="section-padding py-24 relative overflow-hidden bg-bg-secondary" style={{background: 'var(--newsletter-bg)'}}>
        <div className="absolute -left-[5%] -bottom-[20%] w-[30%] h-[150%] bg-primary/20 blur-[120px] rounded-[50%] skew-x-[-15deg] pointer-events-none z-[1]"></div>
        <div className="absolute -right-[5%] -top-[20%] w-[30%] h-[150%] bg-accent/20 blur-[120px] rounded-[50%] skew-x-[-15deg] pointer-events-none z-[1]"></div>
        <div className="container-custom relative z-[2] max-w-4xl text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-glass-bg border border-border-color shadow-glass text-primary text-3xl mb-6">
            <i className="bx bx-envelope"></i>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight">Stay in the Loop</h2>
          <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-10 max-w-2xl mx-auto">
            Subscribe to our newsletter and get the latest movie news, exclusive trailers, and weekly recommendations delivered straight to your inbox.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto" onSubmit={handleNewsletter}>
            <input 
              type="email" 
              placeholder="Enter your email address" 
              required
              className="flex-1 bg-bg-input border border-border-color rounded-md px-5 py-4 text-text-primary text-base transition-all duration-300 focus:border-primary focus:shadow-[0_0_0_3px_rgba(229,9,20,0.15)] outline-none placeholder:text-text-muted"
            />
            <button type="submit" className="btn btn-primary btn-lg whitespace-nowrap shadow-md">
              Subscribe Now
            </button>
          </form>
          <p className="text-xs text-text-muted mt-4">We respect your privacy. No spam, ever.</p>
        </div>
      </section>
    </div>
  );
}

// Helper block for genre icons
function getGenreIcon(name) {
  const map = {
    'Action': 'bx-target-lock',
    'Adventure': 'bx-map-alt',
    'Animation': 'bx-happy-beaming',
    'Comedy': 'bx-smile',
    'Crime': 'bx-mask',
    'Documentary': 'bx-camera-movie',
    'Drama': 'bx-sad',
    'Family': 'bx-home-heart',
    'Fantasy': 'bx-magic-wand',
    'History': 'bx-landmark',
    'Horror': 'bx-ghost',
    'Music': 'bx-music',
    'Mystery': 'bx-search-alt',
    'Romance': 'bx-heart',
    'Science Fiction': 'bx-rocket',
    'TV Movie': 'bx-tv',
    'Thriller': 'bx-run',
    'War': 'bx-shield-quarter',
    'Western': 'bx-sun'
  };
  return map[name] || 'bx-film';
}

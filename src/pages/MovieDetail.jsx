import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import HScrollSection from '../components/HScrollSection';
import MovieCard from '../components/MovieCard';
import MovieModal from '../components/MovieModal';
import {
  getMovieDetails,
  getMovieCredits,
  getMovieVideos,
  getMovieReviews,
  getSimilarMovies,
  getTVShowDetails,
  getTVShowCredits,
  getTVShowVideos,
  getTVShowReviews,
  getSimilarTVShows,
  getBackdropUrl,
  getImageUrl,
} from '../utils/tmdb';

export default function MovieDetail({ mediaType = 'movie' }) {
  const { id } = useParams();
  const { addToWatchlist, isInWatchlist, removeFromWatchlist, addToFavorites, isFavorite, removeFromFavorites } = useAppContext();
  
  const [details, setDetails] = useState(null);
  const [cast, setCast] = useState([]);
  const [videos, setVideos] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [similar, setSimilar] = useState([]);
  
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });

      try {
        if (mediaType === 'movie') {
          const [det, cred, vid, rev, sim] = await Promise.all([
            getMovieDetails(id),
            getMovieCredits(id),
            getMovieVideos(id),
            getMovieReviews(id),
            getSimilarMovies(id)
          ]);
          setDetails(det);
          setCast(cred?.cast?.slice(0, 15) || []);
          setVideos(vid?.results?.filter(v => ['Trailer', 'Teaser'].includes(v.type)).slice(0, 4) || []);
          setReviews(rev?.results?.slice(0, 5) || []);
          setSimilar(sim?.results?.slice(0, 10) || []);
        } else {
          const [det, cred, vid, rev, sim] = await Promise.all([
            getTVShowDetails(id),
            getTVShowCredits(id),
            getTVShowVideos(id),
            getTVShowReviews(id),
            getSimilarTVShows(id)
          ]);
          setDetails(det);
          setCast(cred?.cast?.slice(0, 15) || []);
          setVideos(vid?.results?.filter(v => ['Trailer', 'Teaser'].includes(v.type)).slice(0, 4) || []);
          setReviews(rev?.results?.slice(0, 5) || []);
          setSimilar(sim?.results?.slice(0, 10) || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, mediaType]);

  const openTrailer = (key) => {
    setActiveVideo(key);
    setIsTrailerOpen(true);
  };

  const handleFavoriteToggle = () => {
    if (isFavorite(details.id)) {
      removeFromFavorites(details.id);
    } else {
      addToFavorites({ ...details, media_type: mediaType });
    }
  };

  const handleWatchlistToggle = () => {
    if (isInWatchlist(details.id)) {
      removeFromWatchlist(details.id);
    } else {
      addToWatchlist({ ...details, media_type: mediaType });
    }
  };

  if (loading || !details) {
    return (
      <div className="min-h-screen pt-[72px] bg-bg-primary flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const title = details.title || details.name;
  const rating = (details.vote_average || 0).toFixed(1);
  const releaseYear = (details.release_date || details.first_air_date || '').substring(0, 4);

  return (
    <div className="min-h-screen pt-[72px] bg-bg-primary">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center border-b border-border-color">
         <div 
           className="absolute inset-0 bg-cover bg-center bg-no-repeat z-[2]"
           style={{ backgroundImage: `url(${getBackdropUrl(details.backdrop_path)})` }}
         >
           <div 
             className="absolute inset-0" 
             style={{ background: 'var(--detail-hero-overlay)' }}
           ></div>
         </div>

         <div className="container-custom relative z-[3] py-16 flex flex-col md:flex-row gap-10 items-center md:items-start">
            {/* Poster */}
            <div className="w-full max-w-[300px] shrink-0 transform hover:-translate-y-2 transition-transform duration-300">
               <div className="relative aspect-[2/3] rounded-xl overflow-hidden shadow-xl border border-border-color/30">
                 <img 
                    src={getImageUrl(details.poster_path, 'w500')} 
                    alt={title} 
                    className="w-full h-full object-cover"
                 />
                 <div className="absolute top-4 right-4 bg-rating-badge-bg backdrop-blur-md px-3 py-1.5 rounded text-rating-badge-text font-bold flex items-center gap-1.5 border border-border-color shadow-lg">
                    <i className="bx bxs-star text-rating-high"></i>
                    {rating}
                 </div>
               </div>
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left mt-4 md:mt-0">
               <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-2 text-text-primary drop-shadow-sm">{title}</h1>
               
               {details.tagline && (
                  <p className="text-xl md:text-2xl font-light italic text-text-secondary mb-6 font-serif">
                    "{details.tagline}"
                  </p>
               )}
               
               <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-8">
                  {details.genres?.map(g => (
                    <span key={g.id} className="px-3 py-1 rounded-full border border-border-color bg-bg-card/50 backdrop-blur-sm text-sm text-text-primary font-medium">
                      {g.name}
                    </span>
                  ))}
                  <span className="flex items-center gap-1.5 text-text-secondary text-sm">
                    <i className='bx bx-calendar text-primary'></i> {releaseYear || 'TBA'}
                  </span>
                  
                  {mediaType === 'movie' ? (
                     <span className="flex items-center gap-1.5 text-text-secondary text-sm">
                       <i className='bx bx-time-five text-primary'></i> {details.runtime} min
                     </span>
                  ) : (
                     <span className="flex items-center gap-1.5 text-text-secondary text-sm">
                       <i className='bx bx-tv text-primary'></i> {details.number_of_seasons} Seasons
                     </span>
                  )}
               </div>

               <div className="mb-10">
                  <h3 className="text-lg font-bold text-text-primary mb-3">Overview</h3>
                  <p className="text-base md:text-lg text-text-secondary leading-relaxed max-w-3xl">
                     {details.overview || 'No overview available.'}
                  </p>
               </div>

                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                  {videos.length > 0 && (
                     <button 
                       onClick={() => openTrailer(videos[0].key)}
                       className="btn btn-primary btn-lg shadow-lg flex-1 md:flex-none"
                     >
                       <i className="bx bx-play-circle text-2xl"></i> Watch Trailer
                     </button>
                  )}
                  <button 
                    onClick={handleWatchlistToggle}
                    className={`btn btn-lg flex-1 md:flex-none shadow-md transition-all duration-300 ${
                      isInWatchlist(details.id) 
                        ? "bg-accent/20 text-accent border border-accent/30" 
                        : "btn-outline"
                    }`}
                  >
                    <i className={`bx ${isInWatchlist(details.id) ? "bxs-bookmark" : "bx-bookmark"} text-xl`}></i>
                    {isInWatchlist(details.id) ? "In Watchlist" : "Watchlist"}
                  </button>
                  <button 
                    onClick={handleFavoriteToggle}
                    className={`btn btn-lg flex-1 md:flex-none shadow-md transition-all duration-300 ${
                      isFavorite(details.id) 
                        ? "bg-primary text-white border-primary" 
                        : "btn-outline"
                    }`}
                  >
                    <i className={`bx ${isFavorite(details.id) ? "bxs-heart" : "bx-heart"} text-xl`}></i>
                    {isFavorite(details.id) ? "Favorited" : "Favorite"}
                  </button>
               </div>
            </div>
         </div>
      </section>

      {/* Stats Bar */}
      <div className="bg-bg-secondary border-b border-border-color py-6">
        <div className="container-custom grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-x divide-border-color">
          {mediaType === 'movie' ? (
            <>
              <div><h4 className="text-xs text-text-muted uppercase tracking-wider mb-1">Status</h4><p className="font-semibold">{details.status}</p></div>
              <div><h4 className="text-xs text-text-muted uppercase tracking-wider mb-1">Budget</h4><p className="font-semibold">${(details.budget || 0).toLocaleString()}</p></div>
              <div><h4 className="text-xs text-text-muted uppercase tracking-wider mb-1">Revenue</h4><p className="font-semibold">${(details.revenue || 0).toLocaleString()}</p></div>
              <div><h4 className="text-xs text-text-muted uppercase tracking-wider mb-1">Vote Count</h4><p className="font-semibold">{details.vote_count}</p></div>
            </>
          ) : (
            <>
              <div><h4 className="text-xs text-text-muted uppercase tracking-wider mb-1">Status</h4><p className="font-semibold">{details.status}</p></div>
              <div><h4 className="text-xs text-text-muted uppercase tracking-wider mb-1">Seasons</h4><p className="font-semibold">{details.number_of_seasons}</p></div>
              <div><h4 className="text-xs text-text-muted uppercase tracking-wider mb-1">Episodes</h4><p className="font-semibold">{details.number_of_episodes}</p></div>
              <div><h4 className="text-xs text-text-muted uppercase tracking-wider mb-1">Vote Count</h4><p className="font-semibold">{details.vote_count}</p></div>
            </>
          )}
        </div>
      </div>

      {/* Cast Section */}
      {cast.length > 0 && (
         <section className="section-padding bg-bg-primary">
            <div className="container-custom">
               <h2 className="section-title"><span className="accent-dot"></span> Top Cast</h2>
               <HScrollSection>
                  {cast.map(person => (
                     <div key={person.id} className="hscroll-item flex flex-col items-center group cursor-pointer w-[140px] px-2 text-center">
                        <div className="w-[120px] h-[120px] rounded-full overflow-hidden border-2 border-transparent transition-all duration-300 group-hover:scale-110 group-hover:border-primary group-hover:shadow-glow mb-4">
                           <img 
                             src={getImageUrl(person.profile_path, 'w185', person.name)} 
                             alt={person.name}
                             className="w-full h-full object-cover"
                           />
                        </div>
                        <h4 className="text-sm font-bold text-text-primary line-clamp-1 group-hover:text-primary transition-colors">{person.name}</h4>
                        <p className="text-xs text-text-muted mt-1 line-clamp-1">{person.character}</p>
                     </div>
                  ))}
               </HScrollSection>
            </div>
         </section>
      )}

      {/* Trailers Section */}
      {videos.length > 0 && (
         <section className="section-padding bg-bg-secondary">
            <div className="container-custom">
               <h2 className="section-title"><span className="accent-dot"></span> Official Videos</h2>
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {videos.map(video => (
                     <div 
                        key={video.id} 
                        className="group relative aspect-video rounded-xl overflow-hidden cursor-pointer border border-border-color bg-bg-card hover:border-primary transition-all duration-300"
                        onClick={() => openTrailer(video.key)}
                     >
                        <img 
                           src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`} 
                           alt={video.name}
                           className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                           <div className="w-14 h-14 rounded-full bg-primary/90 text-white flex items-center justify-center text-3xl shadow-[0_0_20px_rgba(229,9,20,0.5)] transform group-hover:scale-110 transition-transform duration-300">
                             <i className="bx bx-play ml-1"></i>
                           </div>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 pb-3 pt-10">
                           <p className="text-white text-sm font-medium line-clamp-1">{video.name}</p>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </section>
      )}

      {/* Reviews Section */}
      {reviews.length > 0 && (
         <section className="section-padding bg-bg-primary">
            <div className="container-custom">
               <h2 className="section-title"><span className="accent-dot"></span> User Reviews</h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {reviews.map(review => (
                     <div key={review.id} className="bg-bg-card border border-border-color rounded-xl p-6 flex flex-col hover:-translate-y-1 transition-transform duration-300">
                        <div className="flex items-center gap-4 mb-4">
                           <img 
                             src={getImageUrl(review.author_details?.avatar_path, 'w185', review.author)} 
                             alt={review.author}
                             className="w-12 h-12 rounded-full border border-border-color bg-bg-secondary"
                           />
                           <div>
                              <h4 className="font-bold">{review.author}</h4>
                              <p className="text-xs text-text-muted">
                                {new Date(review.created_at).toLocaleDateString()}
                              </p>
                           </div>
                           {review.author_details?.rating && (
                              <div className="ml-auto bg-primary/10 text-primary px-3 py-1 rounded text-sm font-bold flex items-center gap-1">
                                 <i className="bx bxs-star"></i> {review.author_details.rating}.0
                              </div>
                           )}
                        </div>
                        <p className="text-text-secondary text-sm leading-relaxed line-clamp-4 italic">
                           "{review.content}"
                        </p>
                     </div>
                  ))}
               </div>
            </div>
         </section>
      )}

      {/* Similar Section */}
      {similar.length > 0 && (
         <section className="section-padding bg-bg-secondary border-t border-border-color">
            <div className="container-custom">
               <h2 className="section-title"><span className="accent-dot"></span> Similar {mediaType === 'movie' ? 'Movies' : 'Shows'}</h2>
               <HScrollSection>
                  {similar.map(item => (
                     <div key={item.id} className="hscroll-item">
                        <MovieCard item={item} mediaType={mediaType} />
                     </div>
                  ))}
               </HScrollSection>
            </div>
         </section>
      )}

      {/* Modal */}
      <MovieModal 
         isOpen={isTrailerOpen} 
         onClose={() => setIsTrailerOpen(false)} 
         videoKey={activeVideo} 
      />
    </div>
  );
}

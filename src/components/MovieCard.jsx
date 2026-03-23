import { Link } from 'react-router-dom';
import { getImageUrl } from '../utils/tmdb';
import { useAppContext } from '../context/AppContext';

export default function MovieCard({ item, mediaType = 'movie' }) {
  const { isInWatchlist, addToWatchlist, isFavorite, addToFavorites } = useAppContext();

  const title = item.title || item.name || 'Untitled';
  const date = item.release_date || item.first_air_date;
  const poster = getImageUrl(item.poster_path, 'w342');
  const rating = (item.vote_average || 0).toFixed(1);

  // Rating Color Logic
  const getRatingClass = (vote) => {
    const pct = Math.round(vote * 10);
    if (pct >= 70) return 'text-rating-high';
    if (pct >= 50) return 'text-rating-mid';
    return 'text-rating-low';
  };

  const handleWatchlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToWatchlist({ ...item, media_type: mediaType });
  };

  const handleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToFavorites({ ...item, media_type: mediaType });
  };

  const inWatchlist = isInWatchlist(item.id);
  const inFavorites = isFavorite(item.id);

  return (
    <div className="movie-card group cursor-pointer relative rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-glow border border-border-color/20 bg-bg-card">
      <Link to={`/${mediaType}/${item.id}`} className="block relative aspect-[2/3] overflow-hidden">
        <img
          src={poster}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => { e.target.src = getImageUrl(null); }}
        />
        
        {/* Rating Badge - Modern Glass Look */}
        <div className={`absolute top-3 right-3 z-30 px-2 py-1 rounded-lg backdrop-blur-md bg-black/40 border border-white/10 flex items-center gap-1 shadow-lg transform transition-transform duration-300 group-hover:scale-110 ${getRatingClass(item.vote_average)}`}>
           <i className="bx bxs-star text-xs"></i>
           <span className="text-[10px] font-bold text-white tracking-wider">{rating}</span>
        </div>

        {/* Floating Info Overlay (Bottom) */}
        <div className="absolute inset-x-0 bottom-0 z-20 p-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
           <div className="backdrop-blur-[2px]">
              <h3 className="text-white text-sm font-bold truncate mb-0.5 group-hover:text-primary transition-colors">
                {title}
              </h3>
              <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                 <span className="text-[10px] text-gray-300 font-medium">
                   {date ? new Date(date).getFullYear() : 'TBA'}
                 </span>
                 <div className="flex gap-2">
                    <button onClick={handleWatchlist} className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-md bg-white/10 border border-white/10 hover:bg-primary hover:border-primary text-white ${inWatchlist ? 'bg-primary border-primary' : ''}`}>
                       <i className={`bx ${inWatchlist ? 'bxs-bookmark' : 'bx-bookmark'} text-xs`}></i>
                    </button>
                    <button onClick={handleFavorite} className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-md bg-white/10 border border-white/10 hover:bg-primary hover:border-primary text-white ${inFavorites ? 'bg-primary border-primary' : ''}`}>
                       <i className={`bx ${inFavorites ? 'bxs-heart' : 'bx bx-heart'} text-xs`}></i>
                    </button>
                 </div>
              </div>
           </div>
        </div>
        
        {/* Subtle Inner Border/Overlay */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
      </Link>
    </div>
  );
}

export function MovieCardSkeleton() {
  return (
    <div className="movie-card border-none bg-bg-card animate-pulse">
      <div className="aspect-[2/3] bg-border-color"></div>
      <div className="p-4">
        <div className="h-4 bg-border-color rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-border-color rounded w-1/2"></div>
      </div>
    </div>
  );
}

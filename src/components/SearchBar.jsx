import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchMulti, getImageUrl } from '../utils/tmdb';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const wrapperRef = useRef(null);
  const navigate = useNavigate();

  // Handle click outside to close
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.trim().length >= 2) {
        setIsLoading(true);
        const data = await searchMulti(query);
        if (data && data.results) {
          // Filter out people, keep only movies/tv
          const filtered = data.results
            .filter((item) => item.media_type === 'movie' || item.media_type === 'tv')
            .slice(0, 5);
          setResults(filtered);
          setIsOpen(true);
        }
        setIsLoading(false);
      } else {
        setResults([]);
        setIsOpen(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  const handleResultClick = (item) => {
    setIsOpen(false);
    setQuery('');
    navigate(`/${item.media_type === 'tv' ? 'tv' : 'movie'}/${item.id}`);
  };

  return (
    <div ref={wrapperRef} className="relative z-[100]">
      <div className="flex items-center bg-glass-bg border border-border-color rounded-full px-4 py-2 gap-2 transition-all duration-250 w-[260px] focus-within:border-primary focus-within:w-[320px] focus-within:bg-glass-bg-hover focus-within:shadow-[0_0_0_3px_rgba(229,9,20,0.15)]">
        <i className="bx bx-search text-text-muted text-lg"></i>
        <input
          type="text"
          className="bg-transparent border-none outline-none text-text-primary text-sm w-full placeholder:text-text-muted"
          placeholder="Search movies, shows..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
            if (results.length > 0) setIsOpen(true);
          }}
        />
        {isLoading && <i className="bx bx-loader-alt animate-spin text-primary"></i>}
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute top-[calc(100%+8px)] left-0 right-0 bg-bg-elevated border border-border-color rounded-lg shadow-lg max-h-[400px] overflow-y-auto z-[100] py-2">
          {results.map((item) => (
            <div
              key={item.id}
              onClick={() => handleResultClick(item)}
              className="flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors duration-150 hover:bg-glass-bg-hover"
            >
              <img
                src={getImageUrl(item.poster_path, 'w92')}
                alt={item.title || item.name}
                className="w-10 h-14 object-cover rounded-sm"
                onError={(e) => {
                  e.target.src = getImageUrl(null);
                }}
              />
              <div className="flex flex-col">
                <h4 className="text-sm font-medium text-text-primary line-clamp-1">
                  {item.title || item.name}
                </h4>
                <div className="flex items-center gap-2 text-xs text-text-muted mt-1">
                  <span className="capitalize">{item.media_type}</span>
                  <span>&bull;</span>
                  <span>
                    {(item.release_date || item.first_air_date || '').substring(0, 4) || 'TBA'}
                  </span>
                  <span>&bull;</span>
                  <span className="flex items-center gap-1">
                    <i className="bx bxs-star text-rating-mid"></i>
                    {(item.vote_average || 0).toFixed(1)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {isOpen && query.length >= 2 && results.length === 0 && !isLoading && (
        <div className="absolute top-[calc(100%+8px)] left-0 right-0 bg-bg-elevated border border-border-color rounded-lg shadow-lg z-[100] p-4 text-center text-text-muted text-sm">
          No results found for "{query}"
        </div>
      )}
    </div>
  );
}

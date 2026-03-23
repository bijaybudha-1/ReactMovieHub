import { useState, useEffect } from 'react';
import { discoverTV, getTVGenres } from '../utils/tmdb';
import MovieGrid from '../components/MovieGrid';

export default function TVShows() {
  const [shows, setShows] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filters
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [sortBy, setSortBy] = useState('popularity.desc');

  useEffect(() => {
    getTVGenres().then((data) => {
      if (data?.genres) setGenres(data.genres);
    });
  }, []);

  useEffect(() => {
    const fetchShows = async () => {
      setLoading(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      const params = {
        page,
        sort_by: sortBy,
      };
      
      if (selectedGenre) {
        params.with_genres = selectedGenre;
      }

      const data = await discoverTV(params);
      
      if (data?.results) {
        setShows(data.results);
        setTotalPages(Math.min(data.total_pages, 500));
      }
      setLoading(false);
    };

    fetchShows();
  }, [page, selectedGenre, sortBy]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    let pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) pages.push('...');
    }

    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) pages.push('...');
      pages.push(totalPages);
    }

    return (
      <div className="flex flex-wrap items-center justify-center gap-2 mt-12 bg-bg-card p-4 rounded-xl border border-border-color shadow-sm">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="w-10 h-10 rounded-full bg-glass-bg border border-border-color text-text-primary flex items-center justify-center cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary hover:border-primary hover:text-white"
        >
          <i className="bx bx-chevron-left text-xl"></i>
        </button>
        
        {pages.map((p, i) => (
          p === '...' ? (
             <span key={`dots-${i}`} className="w-10 h-10 flex items-center justify-center text-text-muted">...</span>
          ) : (
            <button
              key={p}
              onClick={() => handlePageChange(p)}
              className={`w-10 h-10 rounded-full font-semibold transition-all duration-200 cursor-pointer ${
                page === p
                  ? 'bg-primary text-white shadow-glow border border-primary'
                  : 'bg-glass-bg border border-border-color text-text-primary hover:bg-glass-bg-hover hover:border-primary/50 text-sm'
              }`}
            >
              {p}
            </button>
          )
        ))}

        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
          className="w-10 h-10 rounded-full bg-glass-bg border border-border-color text-text-primary flex items-center justify-center cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary hover:border-primary hover:text-white"
        >
          <i className="bx bx-chevron-right text-xl"></i>
        </button>
      </div>
    );
  };

  return (
    <div className="pt-[72px] min-h-screen bg-bg-primary">
      {/* Header */}
      <div className="bg-bg-secondary border-b border-border-color pt-16 pb-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 blur-[100px] pointer-events-none"></div>
        <div className="container-custom relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">TV Shows</h1>
          <p className="text-lg text-text-secondary max-w-2xl">
            Binge-worthy drama, laugh-out-loud comedies, and gripping documentaries. Find your next obsession series here.
          </p>
        </div>
      </div>

      <div className="container-custom py-12 flex flex-col lg:flex-row gap-8 items-start">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-[280px] lg:sticky lg:top-[100px] bg-bg-card border border-border-color rounded-xl p-6 shadow-sm z-30 shrink-0">
           <h3 className="text-lg font-bold mb-6 flex items-center gap-2 border-b border-border-color pb-4">
              <i className="bx bx-filter-alt text-primary"></i> Filter Options
           </h3>
           
           <div className="mb-6">
              <label className="block text-sm font-semibold mb-2 text-text-secondary">Sort By</label>
              <div className="relative">
                <select 
                  className="w-full bg-bg-input border border-border-color rounded-lg px-4 py-3 text-sm text-text-primary appearance-none focus:border-primary focus:shadow-[0_0_0_2px_rgba(229,9,20,0.2)] outline-none transition-all cursor-pointer"
                  value={sortBy}
                  onChange={(e) => { setSortBy(e.target.value); setPage(1); }}
                >
                  <option value="popularity.desc">Most Popular</option>
                  <option value="vote_average.desc">Highest Rated</option>
                  <option value="first_air_date.desc">Newest Releases</option>
                </select>
                <i className="bx bx-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"></i>
              </div>
           </div>

           <div>
              <label className="block text-sm font-semibold mb-3 text-text-secondary">Genres</label>
              <div className="flex flex-wrap gap-2">
                <button
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                    !selectedGenre 
                      ? 'bg-primary border-primary text-white shadow-glow' 
                      : 'bg-transparent border-border-color text-text-secondary hover:border-primary hover:text-primary'
                  }`}
                  onClick={() => { setSelectedGenre(''); setPage(1); }}
                >
                  All
                </button>
                {genres.map(genre => (
                  <button
                    key={genre.id}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                      selectedGenre === String(genre.id) 
                        ? 'bg-primary border-primary text-white shadow-glow' 
                        : 'bg-transparent border-border-color text-text-secondary hover:border-primary hover:text-primary'
                    }`}
                    onClick={() => { setSelectedGenre(String(genre.id)); setPage(1); }}
                  >
                    {genre.name}
                  </button>
                ))}
              </div>
           </div>
        </aside>

        {/* Main Grid */}
        <div className="flex-1 w-full">
           <MovieGrid items={shows} loading={loading} skeletons={20} mediaType="tv" />
           {renderPagination()}
        </div>
      </div>
    </div>
  );
}

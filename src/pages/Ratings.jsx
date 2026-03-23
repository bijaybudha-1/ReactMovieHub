import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { getTopRatedMovies, getImageUrl } from '../utils/tmdb';
import MovieCard, { MovieCardSkeleton } from '../components/MovieCard';

export default function Ratings() {
  const { userRatings } = useAppContext();
  const [activeTab, setActiveTab] = useState('global');
  const [globalMovies, setGlobalMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (activeTab === 'global') {
      setIsLoading(true);
      getTopRatedMovies(1).then(data => {
        if (data && data.results) {
          setGlobalMovies(data.results);
        }
        setIsLoading(false);
      });
    }
  }, [activeTab]);

  // Personal stats calculation
  const totalRatings = Object.keys(userRatings).length;
  const ratingsArray = Object.values(userRatings).map(r => r.rating);
  const avgRating = totalRatings > 0 
    ? (ratingsArray.reduce((a, b) => a + b, 0) / totalRatings).toFixed(1)
    : 0;
  
  const distribution = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(star => ({
    star,
    count: ratingsArray.filter(r => Math.round(r) === star).length
  }));
  const maxCount = Math.max(...distribution.map(d => d.count), 1);

  return (
    <div className="pt-[72px] min-h-screen bg-bg-primary">
      {/* Header */}
      <section className="bg-bg-secondary border-b border-border-color pt-16 pb-12">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-4xl font-black mb-4 tracking-tight">Ratings & Rankings</h1>
              <p className="text-text-secondary max-w-xl text-lg leading-relaxed">
                Discover the highest-rated cinematic masterpieces globally and track your personal journey through film.
              </p>
            </div>
            
            {/* Tabs */}
            <div className="flex bg-bg-primary p-1 rounded-xl border border-border-color w-fit">
              <button
                onClick={() => setActiveTab('global')}
                className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
                  activeTab === 'global' 
                    ? 'bg-primary text-white shadow-glow' 
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                Global Top 20
              </button>
              <button
                onClick={() => setActiveTab('personal')}
                className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
                  activeTab === 'personal' 
                    ? 'bg-primary text-white shadow-glow' 
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                My Ratings
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="container-custom py-12">
        {activeTab === 'global' ? (
          <div className="space-y-12">
            <div className="flex items-center gap-4">
              <div className="h-8 w-1.5 bg-primary rounded-full"></div>
              <h2 className="text-2xl font-bold">TMDB Global Benchmarks</h2>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {isLoading ? (
                Array.from({ length: 15 }).map((_, i) => <MovieCardSkeleton key={i} />)
              ) : (
                globalMovies.map((movie, index) => (
                  <div key={movie.id} className="relative group">
                    <div className="absolute -top-3 -left-3 w-10 h-10 bg-bg-card border border-border-color rounded-full flex items-center justify-center font-black text-primary z-10 shadow-lg group-hover:scale-110 transition-transform">
                      {index + 1}
                    </div>
                    <MovieCard item={movie} />
                  </div>
                ))
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Stats Sidebar */}
            <div className="lg:col-span-1 space-y-8">
              <div className="bg-bg-secondary border border-border-color rounded-2xl p-8 sticky top-24">
                <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
                  <i className="bx bx-stats text-primary text-2xl"></i>
                  Rating Profile
                </h3>

                <div className="grid grid-cols-2 gap-4 mb-10">
                  <div className="bg-bg-primary rounded-xl p-5 border border-border-color text-center">
                    <div className="text-3xl font-black text-primary mb-1">{totalRatings}</div>
                    <div className="text-[10px] uppercase tracking-widest text-text-muted font-bold">Titles Rated</div>
                  </div>
                  <div className="bg-bg-primary rounded-xl p-5 border border-border-color text-center">
                    <div className="text-3xl font-black text-accent mb-1">{avgRating}</div>
                    <div className="text-[10px] uppercase tracking-widest text-text-muted font-bold">Avg Score</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="text-sm font-bold text-text-secondary uppercase tracking-widest mb-4">Score Distribution</div>
                  {distribution.reverse().map((d) => (
                    <div key={d.star} className="flex items-center gap-4">
                      <span className="text-xs font-bold text-text-muted w-8">{d.star}★</span>
                      <div className="flex-1 h-2 bg-bg-primary rounded-full overflow-hidden border border-border-color/50">
                        <div 
                          className="h-full bg-gradient-to-r from-primary to-primary-light transition-all duration-1000"
                          style={{ width: `${(d.count / maxCount) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-mono text-text-secondary w-4 text-right">{d.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Rated List */}
            <div className="lg:col-span-2 space-y-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-8 w-1.5 bg-accent rounded-full"></div>
                  <h2 className="text-2xl font-bold">My Rated Titles</h2>
                </div>
              </div>

              {totalRatings === 0 ? (
                <div className="bg-bg-secondary border-2 border-dashed border-border-color rounded-3xl p-20 text-center">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <i className="bx bx-star text-4xl text-primary animate-pulse"></i>
                  </div>
                  <h3 className="text-2xl font-bold mb-3">No ratings yet</h3>
                  <p className="text-text-secondary max-w-sm mx-auto mb-8">
                    Start exploring and rate your favorite movies and shows to build your personal cinematic profile.
                  </p>
                  <Link to="/movies" className="inline-flex items-center gap-2 bg-primary hover:bg-primary-light text-white px-8 py-3 rounded-full font-bold transition-all shadow-glow">
                    Start Exploring <i className="bx bx-right-arrow-alt text-xl"></i>
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                   {Object.values(userRatings).reverse().map((item) => (
                    <div key={item.id} className="bg-bg-secondary border border-border-color rounded-2xl p-4 flex gap-4 hover:border-primary/30 transition-all group">
                      <Link to={`/${item.mediaType}/${item.id}`} className="w-20 h-28 rounded-lg overflow-hidden flex-shrink-0 shadow-lg">
                        <img 
                          src={getImageUrl(item.poster_path, 'w200')} 
                          alt={item.title} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </Link>
                      <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
                        <div>
                          <h4 className="font-bold text-text-primary truncate">{item.title}</h4>
                          <span className="text-xs text-text-muted uppercase tracking-widest">{item.mediaType}</span>
                        </div>
                        <div className="flex items-center gap-2">
                           <div className="flex text-amber-500 text-sm">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <i 
                                key={i} 
                                className={`bx ${i < Math.round(item.rating / 2) ? 'bxs-star' : 'bx-star'}`}
                              ></i>
                            ))}
                          </div>
                          <span className="text-sm font-black text-text-primary">{item.rating}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

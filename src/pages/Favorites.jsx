import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import MovieGrid from '../components/MovieGrid';

export default function Favorites() {
  const [activeTab, setActiveTab] = useState('watchlist'); // 'watchlist' | 'favorites'
  const { watchlist, favorites } = useAppContext();

  const currentItems = activeTab === 'watchlist' ? watchlist : favorites;

  return (
    <div className="pt-[72px] min-h-[calc(100vh-100px)]">
      {/* Header */}
      <div className="bg-bg-secondary border-b border-border-color pt-16 pb-8">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">Your Library</h1>
              <p className="text-text-secondary">
                Manage your watchlist and favorite movies and TV shows.
              </p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mt-8 border-b border-border-color">
            <button
              onClick={() => setActiveTab('watchlist')}
              className={`pb-3 text-base font-medium transition-colors relative ${
                activeTab === 'watchlist'
                  ? 'text-primary'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              Watchlist
              <span className="ml-2 bg-glass-bg px-2 py-0.5 rounded-full text-xs">
                {watchlist.length}
              </span>
              {activeTab === 'watchlist' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab('favorites')}
              className={`pb-3 text-base font-medium transition-colors relative ${
                activeTab === 'favorites'
                  ? 'text-primary'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              Favorites
              <span className="ml-2 bg-glass-bg px-2 py-0.5 rounded-full text-xs">
                {favorites.length}
              </span>
              {activeTab === 'favorites' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full"></div>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container-custom py-12">
        {currentItems.length > 0 ? (
          <MovieGrid items={currentItems} />
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-24 h-24 rounded-full bg-glass-bg flex items-center justify-center text-primary text-5xl mb-6 shadow-glow">
              <i className={`bx ${activeTab === 'watchlist' ? 'bxs-bookmark' : 'bxs-heart'}`}></i>
            </div>
            <h2 className="text-2xl font-bold mb-3">Your {activeTab} is empty</h2>
            <p className="text-text-secondary max-w-md mb-8">
              Looks like you haven't added any movies or TV shows to your {activeTab} yet.
              Explore our collection and start adding!
            </p>
            <div className="flex gap-4">
              <Link to="/movies" className="btn btn-primary">
                Explore Movies
              </Link>
              <Link to="/tv" className="btn btn-outline">
                Explore TV Shows
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

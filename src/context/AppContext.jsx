import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Theme State
  const [theme, setTheme] = useState(() => localStorage.getItem('moviehub_theme') || 'dark');
  
  // Watchlist State
  const [watchlist, setWatchlist] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('moviehub_watchlist')) || [];
    } catch {
      return [];
    }
  });

  // Favorites State
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('moviehub_favorites')) || [];
    } catch {
      return [];
    }
  });

  // User Ratings State
  const [userRatings, setUserRatings] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('moviehub_ratings')) || {};
    } catch {
      return {};
    }
  });

  // User Reviews State
  const [userReviews, setUserReviews] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('moviehub_reviews')) || [];
    } catch {
      return [];
    }
  });

  // Toast State
  const [toasts, setToasts] = useState([]);

  // Theme effect
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('moviehub_theme', theme);
  }, [theme]);

  // Watchlist effect
  useEffect(() => {
    localStorage.setItem('moviehub_watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  // Favorites effect
  useEffect(() => {
    localStorage.setItem('moviehub_favorites', JSON.stringify(favorites));
  }, [favorites]);

  // User Ratings effect
  useEffect(() => {
    localStorage.setItem('moviehub_ratings', JSON.stringify(userRatings));
  }, [userRatings]);

  // User Reviews effect
  useEffect(() => {
    localStorage.setItem('moviehub_reviews', JSON.stringify(userReviews));
  }, [userReviews]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  const showToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  // --- Watchlist Methods ---
  const isInWatchlist = useCallback((id) => {
    return !!watchlist.find((item) => String(item.id) === String(id));
  }, [watchlist]);

  const addToWatchlist = useCallback((item) => {
    if (isInWatchlist(item.id)) {
      showToast(`"${item.title || item.name}" is already in your watchlist`, 'info');
      return false;
    }
    setWatchlist((prev) => [item, ...prev]);
    showToast(`Added "${item.title || item.name}" to watchlist`, 'success');
    return true;
  }, [isInWatchlist, showToast]);

  const removeFromWatchlist = useCallback((id) => {
    setWatchlist((prev) => prev.filter((item) => String(item.id) !== String(id)));
    showToast('Removed from watchlist', 'success');
  }, [showToast]);

  // --- Favorites Methods ---
  const isFavorite = useCallback((id) => {
    return !!favorites.find((item) => String(item.id) === String(id));
  }, [favorites]);

  const addToFavorites = useCallback((item) => {
    if (isFavorite(item.id)) {
      showToast(`"${item.title || item.name}" is already in favorites`, 'info');
      return false;
    }
    setFavorites((prev) => [item, ...prev]);
    showToast(`Added "${item.title || item.name}" to favorites`, 'success');
    return true;
  }, [isFavorite, showToast]);

  const removeFromFavorites = useCallback((id) => {
    setFavorites((prev) => prev.filter((item) => String(item.id) !== String(id)));
    showToast('Removed from favorites', 'success');
  }, [showToast]);

  // --- Ratings & Reviews ---
  const addRating = useCallback((movieId, rating) => {
    setUserRatings((prev) => ({ ...prev, [movieId]: rating }));
    showToast(`Rated ${rating}/10`, 'success');
  }, [showToast]);

  const addReview = useCallback((review) => {
    const newReview = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      ...review
    };
    setUserReviews((prev) => [newReview, ...prev]);
    showToast('Review submitted successfully', 'success');
  }, [showToast]);

  const value = {
    theme,
    toggleTheme,
    watchlist,
    isInWatchlist,
    addToWatchlist,
    removeFromWatchlist,
    favorites,
    isFavorite,
    addToFavorites,
    removeFromFavorites,
    userRatings,
    addRating,
    userReviews,
    addReview,
    toasts,
    showToast,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}

/**
 * Centralized TMDB API Layer for React
 */

const TMDB_TOKEN = import.meta.env.VITE_TMDB_API_KEY;

const TMDB_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${TMDB_TOKEN}`,
  },
};

const TMDB_BASE = "https://api.themoviedb.org/3";
const IMG_BASE = "https://image.tmdb.org/t/p";

// Image Helpers
export function getImageUrl(path, size = "w500", name = "") {
  if (!path) {
    if (name) {
      return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=1a1a25&color=fff&size=512`;
    }
    return 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="500" height="750" fill="%23222"%3E%3Crect width="500" height="750"/%3E%3Ctext x="250" y="375" text-anchor="middle" fill="%23555" font-size="20"%3ENo Image%3C/text%3E%3C/svg%3E';
  }
  return `${IMG_BASE}/${size}${path}`;
}

export function getBackdropUrl(path) {
  return getImageUrl(path, "original");
}

// Generic Fetcher
export async function fetchTMDB(endpoint, params = {}) {
  const url = new URL(`${TMDB_BASE}${endpoint}`);
  url.searchParams.set("language", "en-US");
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== "") {
        url.searchParams.set(k, v);
    }
  });

  try {
    const res = await fetch(url.toString(), TMDB_OPTIONS);
    if (!res.ok) throw new Error(`TMDB Error: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("TMDB fetch error:", err);
    return null;
  }
}

// --- Movie Endpoints ---
export function getTrending(mediaType = "movie", timeWindow = "day") {
  return fetchTMDB(`/trending/${mediaType}/${timeWindow}`);
}

export function getPopularMovies(page = 1) {
  return fetchTMDB("/movie/popular", { page });
}

export function getTopRatedMovies(page = 1) {
  return fetchTMDB("/movie/top_rated", { page });
}

export function getUpcomingMovies(page = 1) {
  return fetchTMDB("/movie/upcoming", { page });
}

export function getNowPlayingMovies(page = 1) {
  return fetchTMDB("/movie/now_playing", { page });
}

export function getMovieDetails(id) {
  return fetchTMDB(`/movie/${id}`);
}

export function getMovieCredits(id) {
  return fetchTMDB(`/movie/${id}/credits`);
}

export function getMovieVideos(id) {
  return fetchTMDB(`/movie/${id}/videos`);
}

export function getMovieKeywords(id) {
  return fetchTMDB(`/movie/${id}/keywords`);
}

export function getMovieReviews(id) {
  return fetchTMDB(`/movie/${id}/reviews`);
}

export function getSimilarMovies(id) {
  return fetchTMDB(`/movie/${id}/similar`);
}

export function getMovieRecommendations(id) {
  return fetchTMDB(`/movie/${id}/recommendations`);
}

// --- TV Show Endpoints ---
export function getPopularTVShows(page = 1) {
  return fetchTMDB("/tv/popular", { page });
}

export function getTopRatedTVShows(page = 1) {
  return fetchTMDB("/tv/top_rated", { page });
}

export function getTVShowDetails(id) {
  return fetchTMDB(`/tv/${id}`);
}

export function getTVShowCredits(id) {
  return fetchTMDB(`/tv/${id}/credits`);
}

export function getTVShowVideos(id) {
  return fetchTMDB(`/tv/${id}/videos`);
}

export function getSimilarTVShows(id) {
  return fetchTMDB(`/tv/${id}/similar`);
}

export function getTVShowReviews(id) {
  return fetchTMDB(`/tv/${id}/reviews`);
}

// --- People Endpoints ---
export function getPopularPeople(page = 1) {
  return fetchTMDB("/person/popular", { page });
}

export function getPersonDetails(id) {
  return fetchTMDB(`/person/${id}`);
}

// --- Search ---
export function searchMulti(query, page = 1) {
  return fetchTMDB("/search/multi", { query, page });
}

export function searchMovies(query, page = 1) {
  return fetchTMDB("/search/movie", { query, page });
}

export function searchTVShows(query, page = 1) {
  return fetchTMDB("/search/tv", { query, page });
}

// --- Genres ---
export function getMovieGenres() {
  return fetchTMDB("/genre/movie/list");
}

export function getTVGenres() {
  return fetchTMDB("/genre/tv/list");
}

// --- Discover ---
export function discoverMovies(params = {}) {
  return fetchTMDB("/discover/movie", {
    sort_by: "popularity.desc",
    include_adult: false,
    ...params,
  });
}

export function discoverTV(params = {}) {
  return fetchTMDB("/discover/tv", {
    sort_by: "popularity.desc",
    include_adult: false,
    ...params,
  });
}

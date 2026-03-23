import MovieCard, { MovieCardSkeleton } from './MovieCard';

export default function MovieGrid({ items, loading, skeletons = 10, mediaType = 'movie' }) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {Array.from({ length: skeletons }).map((_, i) => (
          <MovieCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div className="w-full text-center py-12 text-text-muted text-sm">
        No results found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {items.map((item) => (
        <MovieCard key={item.id} item={item} mediaType={item.media_type || mediaType} />
      ))}
    </div>
  );
}

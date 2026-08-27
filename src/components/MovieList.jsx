import MovieCard from "./MovieCard";

export default function MovieList({
  movies,
  onToggleWatched,
  onDelete,
  onEdit,
}) {
  if (movies.length === 0) {
    return (
      <div className="text-center py-12 opacity-60">
        <p className="text-lg">No movies found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          {...movie}
          onToggleWatched={onToggleWatched}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}

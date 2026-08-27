export default function MovieCard({
  id,
  title,
  poster,
  year,
  genre,
  rating,
  watched,
  onToggleWatched,
  onDelete,
}) {
  return (
    <div className="card bg-base-100 shadow-xl">
      <figure>
        <img
          src={poster}
          alt={title}
          className="w-full h-80 object-cover"
        />
      </figure>

      <div className="card-body">
        <h2 className="card-title">
          {title}

          {rating >= 8 && (
            <span className="badge badge-warning ml-2">
              Top Rated
            </span>
          )}
        </h2>

        <p className="text-sm opacity-70">
          {genre} • {year}
        </p>

        <p className="text-sm">
          ⭐ {rating.toFixed(1)}
        </p>

        <div className="card-actions justify-end mt-2 gap-2">
          <button
            type="button"
            onClick={() => onToggleWatched(id)}
            className={
              watched
                ? "btn btn-success btn-sm"
                : "btn btn-ghost btn-sm"
            }
          >
            {watched ? "Watched ✓" : "Unwatched"}
          </button>

          <button
            type="button"
            onClick={() => onDelete(id)}
            className="btn btn-error btn-sm"
          >
            🗑️ Delete
          </button>
        </div>
      </div>
    </div>
  );
}

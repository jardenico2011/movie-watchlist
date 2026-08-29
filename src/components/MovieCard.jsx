const fallbackPoster =
  "data:image/svg+xml;charset=UTF-8," +
  encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="500" height="750">
      <rect width="500" height="750" fill="#e5e7eb"/>
      <text x="250" y="375"
        text-anchor="middle"
        dominant-baseline="middle"
        font-family="Arial, sans-serif"
        font-size="32"
        fill="#6b7280">
        No Poster
      </text>
    </svg>
  `);

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
  onEdit,
}) {
  return (
    <div className="card bg-base-100 shadow-xl overflow-hidden">
      {/* Movie Poster */}
      <figure className="relative">
        <img
          src={poster || fallbackPoster}
          alt={title}
          className="w-full h-80 object-cover"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = fallbackPoster;
          }}
        />

        {/* Clickable Watched / Unwatched Badge */}
        <button
          type="button"
          onClick={() => onToggleWatched(id)}
          className="absolute top-3 right-3"
        >
          <span
            className={
              watched
                ? "badge badge-success font-semibold"
                : "badge badge-neutral font-semibold"
            }
          >
            {watched ? "Watched ✓" : "Unwatched"}
          </span>
        </button>
      </figure>

      {/* Movie Information */}
      <div className="card-body">
        <h2 className="card-title">
          {title}

          {Number(rating) >= 8 && (
            <span className="badge badge-warning ml-2">
              Top Rated
            </span>
          )}
        </h2>

        <p className="text-sm opacity-70">
          {genre} • {year}
        </p>

        <div className="flex items-center gap-2 mt-1">
          <span className="text-lg">⭐</span>

          <span className="font-semibold">
            {Number(rating).toFixed(1)}
          </span>

          <span className="text-sm opacity-60">
            / 10
          </span>
        </div>

        {/* Action Buttons */}
        <div className="card-actions justify-end mt-4 gap-2">
          <button
            type="button"
            onClick={() => onEdit(id)}
            className="btn btn-info btn-sm"
          >
            ✏️ Edit
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


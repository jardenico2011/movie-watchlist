export default function SummaryBar({ movies }) {
  const total = movies.length;
  const watched = movies.filter((movie) => movie.watched).length;
  const unwatched = movies.filter((movie) => !movie.watched).length;

  return (
    <div className="stats shadow w-full mb-6">
      <div className="stat">
        <div className="stat-title">Total</div>
        <div className="stat-value">{total}</div>
        <div className="stat-desc">All movies</div>
      </div>

      <div className="stat">
        <div className="stat-title">Watched</div>
        <div className="stat-value text-success">{watched}</div>
        <div className="stat-desc">Movies watched</div>
      </div>

      <div className="stat">
        <div className="stat-title">Unwatched</div>
        <div className="stat-value">{unwatched}</div>
        <div className="stat-desc">Movies to watch</div>
      </div>
    </div>
  );
}

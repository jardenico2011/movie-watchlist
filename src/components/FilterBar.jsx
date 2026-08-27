export default function FilterBar({
  currentFilter,
  onChangeFilter,
}) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <button
        type="button"
        onClick={() => onChangeFilter("all")}
        className={
          currentFilter === "all"
            ? "btn btn-primary"
            : "btn btn-ghost"
        }
      >
        All
      </button>

      <button
        type="button"
        onClick={() => onChangeFilter("watched")}
        className={
          currentFilter === "watched"
            ? "btn btn-primary"
            : "btn btn-ghost"
        }
      >
        Watched
      </button>

      <button
        type="button"
        onClick={() => onChangeFilter("unwatched")}
        className={
          currentFilter === "unwatched"
            ? "btn btn-primary"
            : "btn btn-ghost"
        }
      >
        Unwatched
      </button>
    </div>
  );
}

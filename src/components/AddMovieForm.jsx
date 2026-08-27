import { useState } from "react";

export default function AddMovieForm({ onAddMovie }) {
  const [title, setTitle] = useState("");
  const [poster, setPoster] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [rating, setRating] = useState(5);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !poster || !genre || !year) {
      return;
    }

    onAddMovie({
      id: Date.now(),
      title,
      poster,
      genre,
      year: Number(year),
      rating: Number(rating),
      watched: false,
    });

    setTitle("");
    setPoster("");
    setGenre("");
    setYear("");
    setRating(5);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="card bg-base-100 shadow-xl p-6 mb-8"
    >
      <h2 className="text-2xl font-bold mb-4">Add New Movie</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="label">
            <span className="label-text">Movie Title</span>
          </label>

          <input
            type="text"
            placeholder="Enter movie title"
            className="input input-bordered w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label className="label">
            <span className="label-text">Poster URL</span>
          </label>

          <input
            type="url"
            placeholder="https://example.com/poster.jpg"
            className="input input-bordered w-full"
            value={poster}
            onChange={(e) => setPoster(e.target.value)}
          />
        </div>

        <div>
          <label className="label">
            <span className="label-text">Genre</span>
          </label>

          <input
            type="text"
            placeholder="Action, Drama, Comedy..."
            className="input input-bordered w-full"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />
        </div>

        <div>
          <label className="label">
            <span className="label-text">Year</span>
          </label>

          <input
            type="number"
            placeholder="2026"
            className="input input-bordered w-full"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </div>

        <div className="md:col-span-2">
          <label className="label">
            <span className="label-text">
              Rating: {Number(rating).toFixed(1)}
            </span>
          </label>

          <input
            type="range"
            min="1"
            max="10"
            step="0.1"
            className="range range-primary"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />

          <div className="flex justify-between text-xs opacity-70">
            <span>1</span>
            <span>5</span>
            <span>10</span>
          </div>
        </div>
      </div>

      <button type="submit" className="btn btn-primary mt-6">
        Add Movie
      </button>
    </form>
  );
}
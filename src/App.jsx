import { useEffect, useState } from "react";
import Layout from "./layouts/Layout";
import MovieList from "./components/MovieList";
import AddMovieForm from "./components/AddMovieForm";
import FilterBar from "./components/FilterBar";
import SummaryBar from "./components/SummaryBar";
import moviesData from "./data/movies";

export default function App() {
  const [movies, setMovies] = useState(() => {
    const savedMovies = localStorage.getItem("movies");

    return savedMovies ? JSON.parse(savedMovies) : moviesData;
  });

  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("movies", JSON.stringify(movies));
  }, [movies]);

  const handleToggleWatched = (id) => {
    setMovies(
      movies.map((movie) =>
        movie.id === id
          ? { ...movie, watched: !movie.watched }
          : movie
      )
    );
  };

  const handleDeleteMovie = (id) => {
    setMovies(movies.filter((movie) => movie.id !== id));
  };

  const handleAddMovie = (newMovie) => {
    setMovies([...movies, newMovie]);
  };

  const handleEditMovie = (id) => {
    const movie = movies.find((movie) => movie.id === id);

    if (!movie) return;

    const newTitle = prompt("Movie Title:", movie.title);
    if (newTitle === null) return;

    const newGenre = prompt("Genre:", movie.genre);
    if (newGenre === null) return;

    const newYear = prompt("Release Year:", movie.year);
    if (newYear === null) return;

    const newRating = prompt("Rating (1-10):", movie.rating);
    if (newRating === null) return;

    const newPoster = prompt("Poster URL:", movie.poster);
    if (newPoster === null) return;

    setMovies(
      movies.map((movie) =>
        movie.id === id
          ? {
              ...movie,
              title: newTitle.trim() || movie.title,
              genre: newGenre.trim() || movie.genre,
              year: Number(newYear) || movie.year,
              rating: Number(newRating) || movie.rating,
              poster: newPoster.trim() || movie.poster,
            }
          : movie
      )
    );
  };

  const visibleMovies = movies.filter((movie) => {
    if (filter === "watched") {
      return movie.watched;
    }

    if (filter === "unwatched") {
      return !movie.watched;
    }

    return true;
  });

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">
          My Watchlist
        </h1>

        <p className="opacity-70">
          A collection of movies I've watched and want to watch.
        </p>
      </div>

      <SummaryBar movies={movies} />

      <AddMovieForm onAddMovie={handleAddMovie} />

      <FilterBar
        currentFilter={filter}
        onChangeFilter={setFilter}
      />

      <MovieList
        movies={visibleMovies}
        onToggleWatched={handleToggleWatched}
        onDelete={handleDeleteMovie}
        onEdit={handleEditMovie}
      />
    </Layout>
  );
}

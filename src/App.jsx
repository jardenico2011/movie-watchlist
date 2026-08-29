import { useEffect, useState } from "react";
import Layout from "./layouts/Layout";
import MovieList from "./components/MovieList";
import AddMovieForm from "./components/AddMovieForm";
import FilterBar from "./components/FilterBar";
import SummaryBar from "./components/SummaryBar";
import moviesData from "./data/movies";

export default function App() {
  // Task 1: Restore movies from localStorage
  const [movies, setMovies] = useState(() => {
    const savedMovies = localStorage.getItem("movies");

    return savedMovies ? JSON.parse(savedMovies) : moviesData;
  });

  // Task 3: Restore active filter from localStorage
  const [filter, setFilter] = useState(() => {
    return localStorage.getItem("filter") || "all";
  });

  // Task 1: Save movies whenever movies changes
  useEffect(() => {
    localStorage.setItem("movies", JSON.stringify(movies));
  }, [movies]);

  // Task 2: Update browser tab title
  useEffect(() => {
    document.title = "Movie Watchlist (" + movies.length + ")";
  }, [movies.length]);

  // Task 3: Save active filter whenever it changes
  useEffect(() => {
    localStorage.setItem("filter", filter);
  }, [filter]);

  // Toggle watched status
  const handleToggleWatched = (id) => {
    setMovies(
      movies.map((movie) =>
        movie.id === id
          ? { ...movie, watched: !movie.watched }
          : movie
      )
    );
  };

  // Delete one movie
  const handleDeleteMovie = (id) => {
    setMovies(movies.filter((movie) => movie.id !== id));
  };

  // Add new movie
  const handleAddMovie = (newMovie) => {
    setMovies([...movies, newMovie]);
  };

  // Edit movie
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

  // Task 4: Clear all movies
  const handleClearAll = () => {
    if (
      confirm(
        "Clear your entire watchlist? This cannot be undone."
      )
    ) {
      setMovies([]);
    }
  };

  // Filter movies
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

      <div className="flex items-center justify-between mb-4">
        <SummaryBar movies={movies} />

        <button
          className="btn btn-error btn-sm"
          onClick={handleClearAll}
        >
          Clear All
        </button>
      </div>

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

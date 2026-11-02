import type { Movie } from "./data/react-ui-starter";
import MovieCard from "./MovieCard";

interface MovieListProps {
  movies: Movie[];
  toggleFavorite: (id: number) => void;
  favoriteMovieIds: number[];
}

const MovieList = ({
  movies,
  toggleFavorite,
  favoriteMovieIds,
}: MovieListProps) => {
  if (!movies.length) {
    return <p>Geen films gevonden</p>;
  }
  return (
    <div>
      {movies.map((m) => (
        <MovieCard
          key={m.id}
          movie={m}
          toggleFavorite={toggleFavorite}
          favoriteMovieIds={favoriteMovieIds}
        />
      ))}
    </div>
  );
};

export default MovieList;

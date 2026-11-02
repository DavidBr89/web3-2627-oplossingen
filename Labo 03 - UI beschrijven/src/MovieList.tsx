import { movies } from "./data/react-ui-starter";
import MovieCard from "./MovieCard";

const MovieList = () => {
  if (!movies.length) {
    return <p>Geen films gevonden</p>;
  }
  return (
    <div>
      {movies.map((m) => (
        <MovieCard key={m.id} movie={m} />
      ))}
    </div>
  );
};

export default MovieList;

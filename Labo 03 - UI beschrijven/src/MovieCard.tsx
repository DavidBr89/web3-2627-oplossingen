import type { Movie } from "./data/react-ui-starter";
import MovieMetadata from "./MovieMetadata";
import Badge from "./Badge";
import ImageContainer from "./ImageContainer";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <div
      style={{
        position: "relative",
        border: "solid gray 2px",
        borderRadius: "16px",
        margin: "16px",
        overflow: "hidden",
      }}>
      <Badge status={movie.status} />
      <ImageContainer>
        {movie.posterPath !== null ? (
          <img
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
            src={movie.posterPath}
          />
        ) : (
          <p>Geen afbeelding</p>
        )}
      </ImageContainer>

      <div style={{ padding: "20px", textAlign: "left" }}>
        <h2 style={{ margin: "0 0 8px", fontSize: "22px" }}>{movie.title}</h2>
        <MovieMetadata
          genreIds={movie.genreIds}
          minimumAge={movie.minimumAge}
          releaseDate={movie.releaseDate}
          overview={movie.overview}
        />
      </div>
    </div>
  );
};

export default MovieCard;

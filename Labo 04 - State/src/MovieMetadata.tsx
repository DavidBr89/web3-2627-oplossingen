import { genres, type Movie } from "./data/react-ui-starter";

// We hebben niet alle props nodig van een Movie dus kunnen we deze makkelijk negeren zonder ze allemaal te moeten overschrijven
type MovieMetadataProps = Omit<
  Movie,
  "id" | "title" | "originalTitle" | "posterPath" | "status"
>;

const MovieMetadata = ({
  genreIds,
  minimumAge,
  releaseDate,
  overview,
}: MovieMetadataProps) => {
  // Alle genres filteren met wat er in de genreIds inzit zodanig dat je enkel de genres eruit haalt die bij deze film horen
  const genresToDisplay = genres.filter((g) => genreIds.includes(g.id));

  return (
    <div style={{ color: "#b5b5bf", fontSize: "14px" }}>
      {/* Checken of overview wel bestaat voor deze paragraaf - anders lege paragraaf in DOM tree */}
      {overview !== undefined && (
        <p style={{ margin: "0 0 16px", lineHeight: 1.6 }}>{overview}</p>
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "12px",
        }}>
        <p style={{ margin: 0 }}>{releaseDate}</p>

        <p
          style={{
            margin: 0,
            padding: "2px 8px",
            border: "1px solid #484850",
            borderRadius: "4px",
            color: "#e0e0e6",
          }}>
          {minimumAge}+
        </p>
      </div>

      <p style={{ margin: 0, color: "#92929e", fontSize: "13px" }}>
        {/* Hiermee kunnen we eerst de genre objecten mappen naar een array van names en dan deze samenvoegen met de join methode tot één enkele string met een ","  tussen elk element */}
        {genresToDisplay.map((g) => g.name).join(" · ")}
      </p>
    </div>
  );
};

export default MovieMetadata;

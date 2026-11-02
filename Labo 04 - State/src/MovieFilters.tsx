import { type Dispatch, type SetStateAction } from "react";
import { genres } from "./data/react-ui-starter";

interface MovieFiltersProps {
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  onlyActive: boolean;
  setOnlyActive: Dispatch<SetStateAction<boolean>>;
  selectedGenredId: number | "Alle genres";
  setSelectedGenreId: Dispatch<SetStateAction<number | "Alle genres">>;
  resetFilters: () => void;
}

const MovieFilters = ({
  selectedGenredId,
  setSelectedGenreId,
  searchTerm,
  setSearchTerm,
  onlyActive,
  setOnlyActive,
  resetFilters,
}: MovieFiltersProps) => {
  return (
    <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
      <input
        type="text"
        placeholder="Zoek op titel"
        value={searchTerm}
        onChange={(event) => {
          setSearchTerm(event.target.value);
        }}
      />
      <select
        value={selectedGenredId}
        onChange={(event) => {
          const selectedGenre = event.target.value;
          setSelectedGenreId(
            selectedGenre !== "Alle genres"
              ? parseInt(selectedGenre, 10)
              : selectedGenre,
          );
        }}>
        <option value="Alle genres">Alle genres</option>
        {genres.map((g) => (
          <option key={g.id} value={g.id}>
            {g.name}
          </option>
        ))}
      </select>
      <div
        style={{
          display: "flex",
          gap: "8px",
          alignItems: "center",
          justifyContent: "center",
        }}>
        <label htmlFor="activeMovies">Alleen actieve films</label>
        <input
          id="activeMovies"
          type="checkbox"
          checked={onlyActive}
          onChange={(event) => {
            setOnlyActive(event.target.checked);
          }}
        />
      </div>
      <button onClick={resetFilters}>Reset filters</button>
    </div>
  );
};

export default MovieFilters;

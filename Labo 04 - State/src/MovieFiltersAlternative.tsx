import { type Dispatch, type SetStateAction } from "react";
import { genres } from "./data/react-ui-starter";
import type { Filters } from "./AppAlternative";

interface MovieFiltersAlternativeProps {
  filters: Filters;
  setFilters: Dispatch<SetStateAction<Filters>>;
  resetFilters: () => void;
}

const MovieFiltersAlternative = ({
  filters,
  setFilters,
  resetFilters,
}: MovieFiltersAlternativeProps) => {
  return (
    <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
      <input
        type="text"
        placeholder="Zoek op titel"
        value={filters.searchTerm}
        onChange={(event) => {
          setFilters((prevFilters) => ({
            ...prevFilters,
            searchTerm: event.target.value,
          }));
        }}
      />
      <select
        value={filters.selectedGenreId}
        onChange={(event) => {
          const selectedGenre = event.target.value;
          setFilters((prevFilters) => ({
            ...prevFilters,
            selectedGenreId:
              selectedGenre !== "Alle genres"
                ? parseInt(selectedGenre, 10)
                : selectedGenre,
          }));
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
          checked={filters.onlyActiveMovies}
          onChange={(event) => {
            setFilters((prevFilters) => ({
              ...prevFilters,
              onlyActiveMovies: event.target.checked,
            }));
          }}
        />
      </div>
      <button onClick={resetFilters}>Reset filters</button>
    </div>
  );
};

export default MovieFiltersAlternative;

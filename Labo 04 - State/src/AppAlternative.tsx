import { useState } from "react";
import "./App.css";
import MovieList from "./MovieList";
import PageHeader from "./PageHeader";

import { movies } from "./data/react-ui-starter";
import MovieFiltersAlternative from "./MovieFiltersAlternative";
import TicketCounter from "./TicketCounter";
import SelectionSummary from "./SelectionSummary";

// Type exporteren voor MovieFiltersAlternative component
export interface Filters {
  searchTerm: string;
  selectedGenreId: number | "Alle genres";
  onlyActiveMovies: boolean;
}

// In TS moet dit as const gemarkeerd worden dat dit niet aangepast kan worden
// Zoniet dan klopt de typing niet met de initiele state die ik meegeef aan de state
const initialFilters = {
  searchTerm: "",
  selectedGenreId: "Alle genres",
  onlyActiveMovies: false,
} as const;

// Alternatieve oplossing met gecombineerde state
function AppAlternative() {
  // Filter state kan ook in één gegroepeerde state bijgehouden worden
  // Dit staat overal in comments hoe dit aangepakt moet worden dan
  const [filters, setFilters] = useState<Filters>(initialFilters);

  const [favoriteMovieIds, setFavoriteMovieIds] = useState<number[]>([]);
  const [numberOfTickets, setNumberOfTickets] = useState(0);

  // Het resetten van de filters kan hier gebeuren met elke state terug op de beginwaarde te zetten
  const resetFilters = () => {
    setFilters(initialFilters);
    setNumberOfTickets(0);
  };

  const increase = () => {
    setNumberOfTickets((prevNumberTickets) => prevNumberTickets + 1);
  };

  const decrease = () => {
    setNumberOfTickets((prevNumberTickets) => {
      if (prevNumberTickets > 0) {
        return prevNumberTickets - 1;
      }
      return prevNumberTickets;
    });
  };

  const toggleFavorite = (id: number) => {
    setFavoriteMovieIds((prevFavoriteMovieIds) =>
      prevFavoriteMovieIds.includes(id)
        ? prevFavoriteMovieIds.filter((v) => v !== id)
        : [...prevFavoriteMovieIds, id],
    );
  };

  // Afgeleide state maken voor de combinatie van de filters - dit kan in één enkele filter geschreven worden
  // maar voor de duidelijkheid en dat je kan volgen wat er gebeurd heb ik deze in meerdere stappen geschreven om te filteren
  // Stap 1 - Filteren op actieve films in combinatie met onlyActive state
  const activeMovies = movies.filter(
    (m) => !filters.onlyActiveMovies || m.status === "NOW_PLAYING",
  );

  // Stap 2 - Filteren op het geselecteerde genre of "Alle genres"
  const moviesByGenre = activeMovies.filter((m) => {
    if (filters.selectedGenreId === "Alle genres") {
      return true;
    }
    return m.genreIds.includes(filters.selectedGenreId);
  });

  // Stap 3 - Filteren op searchTerm
  const filteredMovies = moviesByGenre.filter((m) =>
    m.title.toLowerCase().includes(filters.searchTerm.toLowerCase().trim()),
  );

  // Dit kan ook in 1 filter gestoken worden maar is complexer misschien om in te zien
  // const filteredMovies = movies.filter(
  //   (m) =>
  //     (!filters.onlyActiveMovies || m.status === "NOW_PLAYING") &&
  //     (filters.selectedGenreId === "Alle genres" ||
  //       m.genreIds.includes(filters.selectedGenreId)) &&
  //     m.title.toLowerCase().includes(filters.searchTerm.toLowerCase().trim()),
  // );

  return (
    <>
      <h1>ALTERNATIEVE OPLOSSING BEKIJK ANDERE COMPONENTS</h1>
      <PageHeader />
      <MovieFiltersAlternative
        filters={filters}
        setFilters={setFilters}
        resetFilters={resetFilters}
      />
      <MovieList
        movies={filteredMovies}
        toggleFavorite={toggleFavorite}
        favoriteMovieIds={favoriteMovieIds}
      />
      <TicketCounter
        increase={increase}
        decrease={decrease}
        numberOfTickets={numberOfTickets}
      />
      <SelectionSummary
        numberOfTickets={numberOfTickets}
        numberOfMovies={filteredMovies.length}
        favoriteMovieIds={favoriteMovieIds}
      />
    </>
  );
}

export default AppAlternative;

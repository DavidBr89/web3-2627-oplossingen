import { useState } from "react";
import "./App.css";
import MovieList from "./MovieList";
import PageHeader from "./PageHeader";

import { movies } from "./data/react-ui-starter";
import MovieFilters from "./MovieFilters";
import TicketCounter from "./TicketCounter";
import SelectionSummary from "./SelectionSummary";

// Dit is een voorbeeldoplossing hoe je dit aangepakt kon hebben.
// Er zijn meerdere oplossingen mogelijk uiteraard. De starters file staat hier bij mij in een aparte map namelijk data
// Je moet hiervoor dan ook niet echt letten op de styling, het gaat over de concepten in React

function App() {
  // State opgesplits in 3 aparte states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenreId, setSelectedGenreId] = useState<
    number | "Alle genres"
  >("Alle genres");
  const [onlyActiveMovies, setOnlyActiveMovies] = useState(false);

  const [favoriteMovieIds, setFavoriteMovieIds] = useState<number[]>([]);
  const [numberOfTickets, setNumberOfTickets] = useState(0);

  // Het resetten van de filters kan hier gebeuren met elke state terug op de beginwaarde te zetten
  const resetFilters = () => {
    setSearchTerm("");
    setOnlyActiveMovies(false);
    setSelectedGenreId("Alle genres");
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
    (m) => !onlyActiveMovies || m.status === "NOW_PLAYING",
  );

  // Stap 2 - Filteren op het geselecteerde genre of "Alle genres"
  const moviesByGenre = activeMovies.filter((m) => {
    if (selectedGenreId === "Alle genres") {
      return true;
    }
    return m.genreIds.includes(selectedGenreId);
  });

  // Stap 3 - Filteren op searchTerm
  const filteredMovies = moviesByGenre.filter((m) =>
    m.title.toLowerCase().includes(searchTerm.toLowerCase().trim()),
  );

  // Dit kan ook in 1 filter gestoken worden maar is complexer misschien om in te zien
  // const filteredMovies = movies.filter(
  //   (m) =>
  //     (!onlyActiveMovies || m.status === "NOW_PLAYING") &&
  //     (selectedGenreId === "Alle genres" ||
  //       m.genreIds.includes(selectedGenreId)) &&
  //     m.title.toLowerCase().includes(searchTerm.toLowerCase().trim()),
  // );

  return (
    <>
      <PageHeader />
      <MovieFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedGenredId={selectedGenreId}
        setSelectedGenreId={setSelectedGenreId}
        onlyActive={onlyActiveMovies}
        setOnlyActive={setOnlyActiveMovies}
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
        numberOfMovies={filteredMovies.length}
        numberOfTickets={numberOfTickets}
        favoriteMovieIds={favoriteMovieIds}
      />
    </>
  );
}

export default App;

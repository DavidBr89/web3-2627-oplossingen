import { movies } from "./data/react-ui-starter";

interface SelectionSummaryProps {
  favoriteMovieIds: number[];
  numberOfTickets: number;
  numberOfMovies: number;
}

const SelectionSummary = ({
  favoriteMovieIds,
  numberOfMovies,
  numberOfTickets,
}: SelectionSummaryProps) => {
  const favoriteMovies = movies.filter((m) => favoriteMovieIds.includes(m.id));

  return (
    <div>
      <h1>Summary favorieten</h1>
      <p>Aantal zichtbare films: {numberOfMovies}</p>
      <p>Aantal favoriete films: {favoriteMovieIds.length}</p>
      <p>Aantal tickets: {numberOfTickets}</p>
      {favoriteMovies.length === 0 && <p>Geen favorieten</p>}
      <ul>
        {favoriteMovies.map((fm) => (
          <li key={fm.id}>{fm.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default SelectionSummary;

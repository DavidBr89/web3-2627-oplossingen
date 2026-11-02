import "./App.css";
import MovieList from "./MovieList";
import PageHeader from "./PageHeader";

// Dit is een voorbeeldoplossing hoe je dit aangepakt kon hebben.
// Er zijn meerdere oplossingen mogelijk uiteraard. De starters file staat hier bij mij in een aparte map namelijk data
// Je moet hiervoor dan ook niet echt letten op de styling, het gaat over de concepten in React
function App() {
  return (
    <>
      <PageHeader />
      <MovieList />
    </>
  );
}

export default App;

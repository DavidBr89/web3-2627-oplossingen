/*
 * Classroom50-assignment: JavaScript verdieping
 * Bioscoopwebapplicatie
 *
 * Lees eerst de volledige opdracht. Vul daarna de TODO's aan, test iedere
 * functie afzonderlijk en commit regelmatig. Gebruik voor deel 1 geen manuele
 * for-lussen en pas de oorspronkelijke filmgegevens niet aan.
 */

const films = [
  {
    id: 1,
    titel: "The Matrix",
    genres: ["actie", "sciencefiction"],
    speelduur: 136,
    minimumLeeftijd: 16,
    actief: true,
  },
  {
    id: 2,
    titel: "Inception",
    genres: ["actie", "sciencefiction"],
    speelduur: 148,
    minimumLeeftijd: 12,
    actief: true,
  },
  {
    id: 3,
    titel: "Interstellar",
    genres: ["drama", "sciencefiction"],
    speelduur: 169,
    minimumLeeftijd: 12,
    actief: false,
  },
];

// Startgegevens voor deel 1 en de gesimuleerde API in deel 2.
// filmId verwijst naar de id van een film. Film 3 heeft nog geen vertoningen.
const vertoningen = [
  { id: 1, filmId: 1, tijdstip: "14:30", vrijePlaatsen: 42 },
  { id: 2, filmId: 1, tijdstip: "20:30", vrijePlaatsen: 8 },
  { id: 3, filmId: 2, tijdstip: "17:30", vrijePlaatsen: 16 },
];

// ============================================================
// DEEL 1: FILM DATA LAB
// Schrijf functies om de filmgegevens te zoeken, filteren en om te zetten.
// Iedere functie moet ook correct werken met een lege array.
// ============================================================

const getActieveFilms = (films) => films.filter((f) => f.actief);

const findFilmById = (films, id) => films.find((f) => f.id === id);

const getFilmsKorterDan = (films, minuten) =>
  films.filter((f) => f.speelduur <= minuten);

const getFilmTitels = (films) => films.map((f) => f.titel);

const getUniekeGenres = (films) => {
  // Manier 1 - met reduce en includes

  return films.reduce((acc, val) => {
    val.genres.forEach((g) => {
      if (!acc.includes(g)) {
        acc.push(g);
      }
    });
    return acc;
  }, []);

  // Manier 2 - met flatmap en Set (Niet in de cursus)
  // Maar wel een goede manier om dit eens te bekijken

  // return [...new Set(films.flatMap((f) => f.genres))];
};

const getTotaleSpeelduur = (films) =>
  films.reduce(acc, (val) => acc + val.speelduur);

const heeftFilmVoorLeeftijd = (films, leeftijd) =>
  films.some((f) => f.actief && leeftijd >= f.minimumLeeftijd);

const addTotaalVrijePlaatsen = (films, vertoningen) => {
  return films.map((f) => {
    const fVertoningen = vertoningen.filter((v) => v.filmId === f.id);

    return {
      ...f,
      vrijePlaatsen: fVertoningen.reduce(
        (acc, val) => acc + val.vrijePlaatsen,
        0,
      ),
    };
  });
};

/*
 * MUTATIEBUG ONDERZOEKEN
 *
 * Deze functie bevat bewust een mutatiebug. Voorspel eerst de drie resultaten
 * van de controlecode en voer ze daarna uit. Leg uit welke referenties gedeeld
 * worden en waarom daardoor ook de oorspronkelijke gegevens wijzigen.
 *
 * Herschrijf de functie vervolgens zodat:
 * - ze een nieuwe array returnt;
 * - alleen de gewijzigde film een nieuw object wordt;
 * - de geneste genre-array veilig aangepast wordt;
 * - de andere filmobjecten behouden blijven;
 * - een onbekend film-id de gegevens ongewijzigd laat.
 */
const voegGenreToe = (films, filmId, genre) => {
  const film = films.find((film) => film.id === filmId);

  if (!film) {
    return films;
  }

  film.genres.push(genre);
  return films;
};

// Voorspel eerst de drie resultaten en voer de code daarna uit.
const aangepasteFilms = voegGenreToe(films, 1, "klassieker");
console.log(films[0].genres);

// ["actie", "sciencefiction", "klassieker"]

console.log(aangepasteFilms === films);

// true

console.log(aangepasteFilms[0] === films[0]);

// true

const voegGenreToeImmutable = (films, filmId, genre) => {
  return films.map((f) => {
    if (f.id === filmId) {
      return {
        ...f,
        genres: [...f.genres, genre],
      };
    }
    return f;
  });
};

// ============================================================
// DEEL 2: RESILIENT CINEMA LOADER
// De onderstaande API simuleert trage requests en fouten. Wijzig de API zelf
// niet. Schrijf de functies die ze gebruiken onder de test voor uitvoervolgorde.
// ============================================================

const delay = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

const getRandomDelay = () => 200 + Math.floor(Math.random() * 1000);

const api = {
  async getFilms() {
    await delay(getRandomDelay());

    if (Math.random() < 0.2) {
      throw new Error("De films konden niet geladen worden.");
    }

    return films.map((film) => ({ ...film, genres: [...film.genres] }));
  },

  async getFilm(id) {
    await delay(getRandomDelay());

    const film = films.find((film) => film.id === id);

    if (!film) {
      throw new Error(`Film met id ${id} bestaat niet.`);
    }

    return { ...film, genres: [...film.genres] };
  },

  async getVertoningen(filmId) {
    await delay(getRandomDelay());

    if (Math.random() < 0.2) {
      throw new Error("De vertoningen konden niet geladen worden.");
    }

    return vertoningen
      .filter((vertoning) => vertoning.filmId === filmId)
      .map((vertoning) => ({ ...vertoning }));
  },
};

const testUitvoervolgorde = () => {
  console.log("start");

  setTimeout(() => console.log("timer"), 0);

  Promise.resolve()
    .then(() => console.log("promise 1"))
    .then(() => console.log("promise 2"));

  console.log("einde");
};

// Uitvoer
/*
 * "start"
 * "einde"
 * "promise 1"
 * "promise 2"
 * "timer"
 */

/*
 * Voorspel eerst de uitvoervolgorde. Noteer bij iedere regel of ze rechtstreeks,
 * via de microtask queue of via de task queue uitgevoerd wordt. Voer de functie
 * daarna uit en vergelijk het resultaat met je voorspelling.
 */
// testUitvoervolgorde();

const loadFilms = async () => {
  return await api.getFilms();
};

const loadFilm = async (id) => {
  return await api.getFilm(id);
};

const loadFilmDetails = async (id) => {
  const [film, vertoningen] = await Promise.all([
    api.getFilm(id),
    api.getVertoningen(id),
  ]);

  return { film, vertoningen };
};

const loadFilmDetailsMetFallback = async (id) => {
  const film = await api.getFilm(id);

  try {
    const vertoningen = await api.getVertoningen(id);

    return {
      film,
      vertoningen,
      vertoningenGeladen: true,
    };
  } catch (error) {
    return {
      film,
      vertoningen: [],
      vertoningenGeladen: false,
    };
  }
};

const loadFilmTitles = async (ids) => {
  return await Promise.all(ids.map((id) => api.getFilm(id))).map(
    (f) => f.titel,
  );
};

const loadFilmSafely = async (id) => {
  try {
    const film = await api.getFilm(id);

    return { status: "success", data: film };
  } catch (error) {
    return { status: "error", mesage: error.message };
  }
};

// ============================================================
// FOUTIEVE IMPLEMENTATIES
// Beschrijf bij iedere functie eerst wat er fout loopt en wanneer dit zichtbaar
// wordt. Herstel ze daarna zonder de fout enkel te verbergen.
// ============================================================

const brokenLoad1 = () => {
  api.getFilms().then((films) => films);
};

// Geen catch -> Deze promise wordt niet correct afgehandeld
const brokenLoad1Fix = () => {
  api
    .getFilms()
    .then((films) => films)
    .catch((err) => console.log(err));
};

const brokenLoad2 = async () => {
  try {
    api.getFilms();
  } catch (error) {
    console.error(error.message);
  }
};

// Geen await voor api.getFilms -> Kan ook geen data teruggeven want er wordt niet opgewacht
const brokenLoad2Fix = async () => {
  try {
    return await api.getFilms();
  } catch (error) {
    console.error(error.message);
  }
};

const brokenLoad3 = async () => {
  const eersteFilm = await api.getFilm(1);
  const tweedeFilm = await api.getFilm(2);
  return [eersteFilm, tweedeFilm];
};

// Kan veel efficienter namelijk met Promise.all, deze werken onafhankelijk van elkaar
const brokenLoad3Fix = async () => {
  return await Promise.all(api.getFilm(1), api.getFilm(2));
};

// ============================================================
// RACE CONDITION
// Wanneer films snel na elkaar geselecteerd worden, kan een oudere aanvraag pas
// na een nieuwere aanvraag eindigen. Toon dit probleem eerst aan en zorg daarna
// dat alleen het resultaat van de recentste selectie verwerkt wordt.
// ============================================================

let geselecteerdeFilm = null;

const selecteerFilm = async (id) => {
  const film = await api.getFilm(id);
  geselecteerdeFilm = film;
  console.log(`Geselecteerd: ${geselecteerdeFilm.titel}`);
};

selecteerFilm(1);
selecteerFilm(2);
selecteerFilm(3);

let geselecteerdeFilmFix = null;
let laatsteRequestId = 0;

const selecteerFilmFix = async (id) => {
  const requestId = ++laatsteRequestId;

  const film = await api.getFilm(id);

  if (requestId !== laatsteRequestId) {
    return;
  }

  geselecteerdeFilm = film;
};

// Het probleem is niet altijd zichtbaar door dat het over netwerkverkeer gaat, dit is niet altijd hetzelfde en hangt af van bvb de serverbelasting ook
// Beperking aan deze oplossing is nu dat netwerk requesten niet echt geannuleerd worden, ze verbruiken nog steeds netwerkverkeer en servercapaciteit, het resultaat wordt gewoon hier genegeerd.

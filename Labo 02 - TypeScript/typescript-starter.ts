/*
 * DEEL 1 — DOMEINTYPES
 *
 * Een filmstatus mag alleen "concept", "actief" of "gearchiveerd" zijn.
 * Beschrijf hieronder een type dat geen andere waarden aanvaardt.
 */
type FilmStatus = "concept" | "actief" | "gearchiveerd";

interface Film {
  id: number;
  titel: string;
  speelduur: number;
  genres: string[];
  status: FilmStatus;
  beschrijving?: string;
}

interface Vertoning {
  id: number;
  filmId: number;
  starttijd: Date;
  zaal: string;
  vrijePlaatsen: number;
}

/*
 * Leid de volgende types af uit Film. Schrijf de properties van Film niet
 * opnieuw uit. Kies zelf welk TypeScript-hulpmiddel bij ieder resultaat past.
 *
 * FilmPreview: alleen id, titel en status.
 * NieuweFilm: alle nodige filmgegevens behalve id.
 * FilmUpdate: alle filmeigenschappen behalve id, allemaal optioneel.
 * ReadonlyFilm: een film waarvan properties niet opnieuw toegewezen mogen worden.
 */
type FilmPreview = Pick<Film, "id" | "titel" | "status">;
type NieuweFilm = Omit<Film, "id">;
type FilmUpdate = Partial<NieuweFilm>;
// type FilmUpdate = Partial<<Omit<Film, "id">>;
type ReadonlyFilm = Readonly<Film>;

const films: Film[] = [
  {
    id: 1,
    titel: "The Matrix",
    speelduur: 136,
    genres: ["actie", "sciencefiction"],
    status: "actief",
    beschrijving: "Een programmeur ontdekt de waarheid over zijn wereld.",
  },
  {
    id: 2,
    titel: "Inception",
    speelduur: 148,
    genres: ["actie", "sciencefiction"],
    status: "concept",
  },
];

const vertoningen: Vertoning[] = [
  {
    id: 1,
    filmId: 1,
    starttijd: new Date("2026-10-12T20:00:00"),
    zaal: "Zaal 1",
    vrijePlaatsen: 42,
  },
  {
    id: 2,
    filmId: 1,
    starttijd: new Date("2026-10-13T20:00:00"),
    zaal: "Zaal 2",
    vrijePlaatsen: 18,
  },
];

/*
 * DEEL 2 — GETYPEERDE FUNCTIES
 *
 * Voorzie iedere functie van correcte parameter- en returntypes. Controleer ook
 * op de plaatsen waar je ze gebruikt welk type TypeScript afleidt.
 */

const getActieveFilms = (films: Film[]): Film[] => {
  // Return alle films met status "actief". Pas de oorspronkelijke array niet aan.
  return films.filter((film) => film.status === "actief");
};

const findFilmById = (films: Film[], id: number): Film | undefined => {
  // Return de film met dit id. Hou rekening met een id dat niet bestaat.
  return films.find((film) => film.id === id);
};

const maakFilmPreview = (film: Film): FilmPreview => {
  // Return een nieuw object dat alleen id, titel en status bevat.
  return { id: film.id, titel: film.titel, status: film.status };
};

const maakNieuweFilm = (data: NieuweFilm, id: number): Film => {
  // Combineer de aangeleverde filmgegevens met het nieuwe id tot een volledige film.
  return { id: id, ...data };
};

const pasFilmAan = (film: Film, wijzigingen: FilmUpdate): Film => {
  // Return een aangepaste film zonder het oorspronkelijke object te muteren.
  return { ...film, ...wijzigingen };
};

const getVertoningenVoorFilm = (
  vertoningen: Vertoning[],
  filmId: number,
): Vertoning[] => {
  return vertoningen.filter((v) => v.filmId === filmId);
};

/*
 * DEEL 3 — HERBRUIKBARE TYPES
 *
 * ApiResponse moet een boolean success, data van het ontvangen type en een
 * tekstuele message bevatten. Maak daarna zelf minstens één response voor een
 * film en één response voor een array van films.
 */
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

/*
 * Werk deze functie af zodat ze voor films én vertoningen bruikbaar is.
 * Elk ontvangen item moet een numeriek id hebben. Een onbekend id levert geen
 * item op; zorg dat dit zichtbaar is in het returntype.
 */
const findById = <T extends { id: number }>(
  items: T[],
  id: number,
): T | undefined => {
  return items.find((v) => v.id === id);
};

/*
 * DEEL 4 — ONBEKENDE GEGEVENS
 *
 * Data van buiten de applicatie begint als unknown. Controleer de waarde voor
 * je ze als Film gebruikt; omzeil de controles niet met een type assertion.
 */
// Invoer voor je eigen controles. Behoud unknown: de type guard moet
// bepalen of deze waarden geldige films zijn.
const geldigeFilmData: unknown = {
  id: 3,
  titel: "Interstellar",
  speelduur: 169,
  genres: ["sciencefiction", "drama"],
  status: "actief",
  beschrijving: "Een reis voorbij de grenzen van ons zonnestelsel.",
};

const filmMetOngeldigeStatus: unknown = {
  id: 4,
  titel: "Arrival",
  speelduur: 116,
  genres: ["sciencefiction"],
  status: "binnenkort",
};

const filmMetOngeldigeGenres: unknown = {
  id: 5,
  titel: "Dune",
  speelduur: 155,
  genres: ["sciencefiction", 42],
  status: "actief",
};

const isFilmStatus = (waarde: unknown): waarde is FilmStatus => {
  if (
    typeof waarde === "string" &&
    (waarde === "concept" || waarde === "actief" || waarde === "gearchiveerd")
  ) {
    return true;
  }
  return false;
};

const isFilm = (waarde: unknown): waarde is Film => {
  return (
    typeof waarde === "object" &&
    waarde !== null &&
    "id" in waarde &&
    typeof waarde.id === "number" &&
    "titel" in waarde &&
    typeof waarde.titel === "string" &&
    "speelduur" in waarde &&
    typeof waarde.speelduur === "number" &&
    "genres" in waarde &&
    Array.isArray(waarde.genres) &&
    waarde.genres.every((v) => typeof v === "string") &&
    "status" in waarde &&
    isFilmStatus(waarde.status) &&
    (!("beschrijving" in waarde) || typeof waarde.beschrijving === "string")
  );
};

const parseFilm = (waarde: unknown): Film => {
  // Return de film wanneer ze geldig is; gooi anders een duidelijke Error.

  if (isFilm(waarde)) {
    return waarde;
  }

  throw new Error("Waarde kan niet geparsed worden naar een film");
};

/*
 * DEEL 5 — LAADTOESTANDEN
 *
 * LaadResultaat kent drie toestanden:
 * - loading;
 * - success, met data van het ontvangen type;
 * - error, met een foutmelding.
 */
type LaadResultaat<T> =
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; message: string };

const beschrijfLaadResultaat = <T>(resultaat: LaadResultaat<T>): string => {
  switch (resultaat.status) {
    case "loading":
      return "Laden";
    case "success":
      return `Data: ${resultaat.data}`;
    case "error":
      return resultaat.message;
    default:
      const check: never = resultaat;
      return check;
  }
};

/*
 * DEEL 6 — CONTROLEREN EN ONDERZOEKEN
 *
 * Voeg eigen controles toe voor normale en foutieve situaties. Onderzoek ook:
 * - een ongeldige filmstatus;
 * - tekst gebruiken waar een getal verwacht wordt;
 * - een optionele property gebruiken zonder te controleren of ze bestaat;
 * - een property van een ReadonlyFilm proberen aan te passen;
 * - onbekende data gebruiken voordat ze gecontroleerd werd.
 *
 * Noteer kort wat TypeScript bij elk geval meldt en corrigeer de code daarna.
 * Gebruik geen any, @ts-ignore of onveilige type assertion als uitweg.
 */

// CONTROLES
// DEEL 2 — GETYPEERDE FUNCTIES

console.assert(
  getActieveFilms(films).length === 1,
  "Er zou precies één actieve film moeten zijn",
);

console.assert(
  findFilmById(films, 1)?.titel === "The Matrix",
  "Film met id 1 moet The Matrix zijn",
);

console.assert(
  findFilmById(films, 999) === undefined,
  "Een onbekend id moet undefined opleveren",
);

const preview = maakFilmPreview(films[0]);

console.assert(
  preview.id === 1 && preview.titel === "The Matrix",
  "FilmPreview bevat niet de verwachte gegevens",
);

const nieuweFilm = maakNieuweFilm(
  {
    titel: "Interstellar",
    speelduur: 169,
    genres: ["sciencefiction"],
    status: "concept",
  },
  3,
);

console.assert(nieuweFilm.id === 3, "De nieuwe film moet id 3 hebben");

const aangepasteFilm = pasFilmAan(films[0], {
  status: "gearchiveerd",
});

console.assert(
  aangepasteFilm.status === "gearchiveerd",
  "De filmstatus moet aangepast zijn",
);

console.assert(
  films[0].status === "actief",
  "De oorspronkelijke film mag niet gewijzigd zijn",
);

console.assert(
  getVertoningenVoorFilm(vertoningen, 1).length === 2,
  "Film 1 moet twee vertoningen hebben",
);

// DEEL 3 — HERBRUIKBARE TYPES

const filmResponse: ApiResponse<Film> = {
  success: true,
  data: films[0],
  message: "Film opgehaald",
};

const filmsResponse: ApiResponse<Film[]> = {
  success: true,
  data: films,
  message: "Films opgehaald",
};

console.assert(
  filmResponse.data.titel === "The Matrix",
  "De response moet een film bevatten",
);

console.assert(
  filmsResponse.data.length === 2,
  "De response moet twee films bevatten",
);

console.assert(
  findById(vertoningen, 2)?.zaal === "Zaal 2",
  "Vertoning met id 2 moet in Zaal 2 plaatsvinden",
);

console.assert(
  findById(films, 999) === undefined,
  "Een onbekend id moet undefined opleveren",
);

// DEEL 4 — ONBEKENDE GEGEVENS

console.assert(isFilm(geldigeFilmData), "De geldige film moet aanvaard worden");

console.assert(
  !isFilm(filmMetOngeldigeStatus),
  "Een ongeldige status moet geweigerd worden",
);

console.assert(
  !isFilm(filmMetOngeldigeGenres),
  "Ongeldige genres moeten geweigerd worden",
);

const geparsteFilm = parseFilm(geldigeFilmData);

console.assert(
  geparsteFilm.titel === "Interstellar",
  "De geparste film moet Interstellar zijn",
);

try {
  parseFilm(filmMetOngeldigeStatus);
  console.assert(false, "parseFilm had een fout moeten gooien");
} catch (error) {
  console.log("Verwachte fout:", error);
}

// DEEL 5 — LAADTOESTANDEN

const loading: LaadResultaat<Film> = {
  status: "loading",
};

const success: LaadResultaat<Film> = {
  status: "success",
  data: films[0],
};

const error: LaadResultaat<Film> = {
  status: "error",
  message: "Film kon niet geladen worden",
};

console.assert(
  beschrijfLaadResultaat(loading) === "Laden",
  "Loading moet Laden teruggeven",
);

console.assert(
  beschrijfLaadResultaat(success).includes("Data:"),
  "Success moet een databoodschap teruggeven",
);

console.assert(
  beschrijfLaadResultaat(error) === "Film kon niet geladen worden",
  "Error moet de foutmelding teruggeven",
);

console.log("Alle controles zijn uitgevoerd.");

export {};

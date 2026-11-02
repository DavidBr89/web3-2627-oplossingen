export type MovieStatus = 'COMING_SOON' | 'NOW_PLAYING' | 'ARCHIVED';

export type Movie = {
  id: number;
  title: string;
  originalTitle: string;
  overview?: string;
  posterPath: string | null;
  releaseDate: string;
  genreIds: number[];
  minimumAge: number;
  status: MovieStatus;
};

export type Genre = {
  id: number;
  name: string;
};

export const genres: Genre[] = [
  { id: 28, name: 'Actie' },
  { id: 12, name: 'Avontuur' },
  { id: 16, name: 'Animatie' },
  { id: 18, name: 'Drama' },
  { id: 878, name: 'Sciencefiction' },
];

export const movies: Movie[] = [
  {
    id: 603,
    title: 'The Matrix',
    originalTitle: 'The Matrix',
    overview: 'Een hacker ontdekt dat zijn werkelijkheid niet is wat ze lijkt.',
    posterPath: '/example-matrix.jpg',
    releaseDate: '1999-03-31',
    genreIds: [28, 878],
    minimumAge: 16,
    status: 'NOW_PLAYING',
  },
  {
    id: 157336,
    title: 'Interstellar',
    originalTitle: 'Interstellar',
    overview: 'Een team reist door de ruimte op zoek naar een nieuwe thuiswereld.',
    posterPath: '/example-interstellar.jpg',
    releaseDate: '2014-11-05',
    genreIds: [12, 18, 878],
    minimumAge: 12,
    status: 'NOW_PLAYING',
  },
  {
    id: 999001,
    title: 'De film zonder poster',
    originalTitle: 'The Movie Without a Poster',
    releaseDate: '2026-10-01',
    genreIds: [18],
    minimumAge: 9,
    posterPath: null,
    status: 'COMING_SOON',
  },
];

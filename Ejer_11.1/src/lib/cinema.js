const MOVIES = [
  { "id": "tt0133093", "title": "The Matrix", "year": 1999, "director": "Hermanas Wachowski", "poster": "https://placehold.co/300x450?text=The+Matrix", "synopsis": "Un programador de computadoras descubre que su vida es una elaborada farsa creada por máquinas inteligentes." },
  { "id": "tt0816692", "title": "Interstellar", "year": 2014, "director": "Christopher Nolan", "poster": "https://placehold.co/300x450?text=Interstellar", "synopsis": "Un equipo de exploradores viaja a través de un agujero de gusano en un intento de asegurar la supervivencia de la humanidad." },
  { "id": "tt0110912", "title": "Pulp Fiction", "year": 1994, "director": "Quentin Tarantino", "poster": "https://placehold.co/300x450?text=Pulp+Fiction", "synopsis": "Las vidas de dos sicarios de la mafia, un boxeador, la esposa de un gángster y un par de ladrones de poca monta se entrelazan." },
  { "id": "tt1375666", "title": "Inception", "year": 2010, "director": "Christopher Nolan", "poster": "https://placehold.co/300x450?text=Inception", "synopsis": "Un ladrón que roba secretos corporativos utilizando tecnología de compartir sueños tiene la tarea inversa de implantar una idea en la mente de un CEO." },
  { "id": "tt0109830", "title": "Forrest Gump", "year": 1994, "director": "Robert Zemeckis", "poster": "https://placehold.co/300x450?text=Forrest+Gump", "synopsis": "Las presidencias de Kennedy y Johnson, la Guerra de Vietnam, Watergate y otros eventos históricos se desarrollan a través de la perspectiva de un hombre de Alabama." },
  { "id": "tt0266697", "title": "Kill Bill: Vol. 1", "year": 2003, "director": "Quentin Tarantino", "poster": "https://placehold.co/300x450?text=Kill+Bill", "synopsis": "Después de despertar de un coma de cuatro años, una ex asesina busca venganza de su ex equipo." },
  { "id": "tt0434409", "title": "V for Vendetta", "year": 2005, "director": "James McTeigue", "poster": "https://placehold.co/300x450?text=V+for+Vendetta", "synopsis": "En una Gran Bretaña distópica, una joven es salvada por un misterioso justiciero enmascarado." }
];

const ACTORS = [
  { "id": "nm0000206", "name": "Keanu Reeves", "birthYear": 1964, "photo": "https://placehold.co/200x200?text=Keanu", "bio": "Actor canadiense conocido por Neo." },
  { "id": "nm0005230", "name": "Carrie-Anne Moss", "birthYear": 1967, "photo": "https://placehold.co/200x200?text=Carrie", "bio": "Reconocida por su papel como Trinity." },
  { "id": "nm0000401", "name": "Laurence Fishburne", "birthYear": 1961, "photo": "https://placehold.co/200x200?text=Laurence", "bio": "Famoso por Matrix y Apocalypse Now." },
  { "id": "nm0000190", "name": "Matthew McConaughey", "birthYear": 1969, "photo": "https://placehold.co/200x200?text=Matthew", "bio": "Ganador de un Oscar por Dallas Buyers Club." },
  { "id": "nm0000155", "name": "Anne Hathaway", "birthYear": 1982, "photo": "https://placehold.co/200x200?text=Anne", "bio": "Conocida por Los Miserables e Interstellar." },
  { "id": "nm0000201", "name": "Samuel L. Jackson", "birthYear": 1948, "photo": "https://placehold.co/200x200?text=Samuel", "bio": "Uno de los actores más taquilleros." },
  { "id": "nm0000237", "name": "John Travolta", "birthYear": 1954, "photo": "https://placehold.co/200x200?text=John", "bio": "Ícono de Pulp Fiction." },
  { "id": "nm0000235", "name": "Uma Thurman", "birthYear": 1970, "photo": "https://placehold.co/200x200?text=Uma", "bio": "Musa de Tarantino." },
  { "id": "nm0000138", "name": "Leonardo DiCaprio", "birthYear": 1974, "photo": "https://placehold.co/200x200?text=Leo", "bio": "Ganador del Oscar por El Renacido." },
  { "id": "nm0000158", "name": "Tom Hanks", "birthYear": 1956, "photo": "https://placehold.co/200x200?text=Tom", "bio": "Famoso por Forrest Gump." },
  { "id": "nm0000194", "name": "Natalie Portman", "birthYear": 1981, "photo": "https://placehold.co/200x200?text=Natalie", "bio": "Ganadora del Oscar por El Cisne Negro." }
];

const ROLES = [
  {"movieId": "tt0133093", "actorId": "nm0000206", "character": "Neo"},
  {"movieId": "tt0133093", "actorId": "nm0005230", "character": "Trinity"},
  {"movieId": "tt0133093", "actorId": "nm0000401", "character": "Morpheus"},
  {"movieId": "tt0816692", "actorId": "nm0000190", "character": "Cooper"},
  {"movieId": "tt0816692", "actorId": "nm0000155", "character": "Brand"},
  {"movieId": "tt0110912", "actorId": "nm0000237", "character": "Vincent Vega"},
  {"movieId": "tt0110912", "actorId": "nm0000235", "character": "Mia Wallace"},
  {"movieId": "tt0110912", "actorId": "nm0000201", "character": "Jules Winnfield"},
  {"movieId": "tt1375666", "actorId": "nm0000138", "character": "Dom Cobb"},
  {"movieId": "tt1375666", "actorId": "nm0000155", "character": "Mal"},
  {"movieId": "tt0109830", "actorId": "nm0000158", "character": "Forrest Gump"},
  {"movieId": "tt0266697", "actorId": "nm0000235", "character": "Beatrix Kiddo"},
  {"movieId": "tt0266697", "actorId": "nm0000201", "character": "Rufus"},
  {"movieId": "tt0434409", "actorId": "nm0000194", "character": "Evey Hammond"},
  {"movieId": "tt0434409", "actorId": "nm0005230", "character": "Valerie Page"}
];

export const getAllMovies = () => MOVIES;
export const getMovieById = (id) => MOVIES.find(m => m.id === id);
export const getAllActors = () => ACTORS;
export const getActorById = (id) => ACTORS.find(a => a.id === id);

export const getCastByMovieId = (movieId) => {
  return ROLES
    .filter(r => r.movieId === movieId)
    .map(r => ({ ...ACTORS.find(a => a.id === r.actorId), character: r.character }));
};

export const getFilmographyByActorId = (actorId) => {
  return ROLES
    .filter(r => r.actorId === actorId)
    .map(r => ({ ...MOVIES.find(m => m.id === r.movieId), character: r.character }));
};
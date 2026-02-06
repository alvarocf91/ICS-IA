import { getAllMovies } from '../lib/cinema';
import { Link } from 'react-router-dom';

export default function MovieList() {
  const movies = getAllMovies();
  return (
    <div>
      <h1>Listado de Películas</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
        {movies.map(m => (
          <Link key={m.id} to={`/movies/${m.id}`} style={{ textDecoration: 'none', color: 'black' }}>
            <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '10px', textAlign: 'center' }}>
              <img src={m.poster} alt={m.title} style={{ width: '100%', borderRadius: '4px' }} />
              <h3>{m.title}</h3>
              <p>{m.year}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
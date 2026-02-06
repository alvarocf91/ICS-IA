import { useParams, Link } from 'react-router-dom';
import { getMovieById, getCastByMovieId } from '../lib/cinema';

export default function MovieDetail() {
  const { movieId } = useParams();
  const movie = getMovieById(movieId);
  const cast = getCastByMovieId(movieId);

  if (!movie) return <h2>No encontrada</h2>;

  return (
    <div>
      <div style={{ display: 'flex', gap: '30px', marginBottom: '40px' }}>
        <img src={movie.poster} width="250" />
        <div>
          <h1>{movie.title}</h1>
          <p><strong>Director:</strong> {movie.director} | <strong>Año:</strong> {movie.year}</p>
          <p>{movie.synopsis}</p>
        </div>
      </div>
      <h2>Reparto</h2>
      <div style={{ display: 'flex', gap: '20px' }}>
        {cast.map(a => (
          <Link key={a.id} to={`/actors/${a.id}`} style={{ textAlign: 'center', width: '100px', textDecoration: 'none' }}>
            <img src={a.photo} width="80" style={{ borderRadius: '50%' }} />
            <p style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>{a.name}</p>
            <p style={{ fontSize: '0.7rem' }}>{a.character}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
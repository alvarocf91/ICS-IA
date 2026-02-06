import { useParams, Link } from 'react-router-dom';
import { getActorById, getFilmographyByActorId } from '../lib/cinema';

export default function ActorDetail() {
  const { actorId } = useParams();
  const actor = getActorById(actorId);
  const filmography = getFilmographyByActorId(actorId);

  if (!actor) return <h2>Actor no encontrado</h2>;

  return (
    <div>
      <div style={{ display: 'flex', gap: '30px' }}>
        <img src={actor.photo} width="200" style={{ borderRadius: '10px' }} />
        <div>
          <h1>{actor.name}</h1>
          <p>Año de nacimiento: {actor.birthYear}</p>
          <p>{actor.bio}</p>
        </div>
      </div>
      <h2>Filmografía</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '15px' }}>
        {filmography.map(m => (
          <Link key={m.id} to={`/movies/${m.id}`} style={{ textDecoration: 'none', color: 'black' }}>
            <div style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '5px' }}>
              <img src={m.poster} style={{ width: '100%' }} />
              <p style={{ fontWeight: 'bold' }}>{m.title}</p>
              <p style={{ fontSize: '0.8rem' }}>como {m.character}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
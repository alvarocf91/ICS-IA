import { getAllActors } from '../lib/cinema';
import { Link } from 'react-router-dom';

export default function ActorList() {
  const actors = getAllActors();
  return (
    <div>
      <h1>Actores</h1>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {actors.map(a => (
          <li key={a.id} style={{ padding: '10px', borderBottom: '1px solid #eee' }}>
            <Link to={`/actors/${a.id}`} style={{ fontSize: '1.2rem' }}>{a.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
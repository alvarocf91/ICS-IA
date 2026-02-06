import { Link } from 'react-router-dom';

export default function ProjectList({ projects }) {
  return (
    <div className="grid">
      {projects.map(p => (
        <div key={p.id} className="project-card">
          <Link to={`/projects/${p.id}`}><h3>{p.name}</h3></Link>
          <p>{p.description}</p>
        </div>
      ))}
    </div>
  );
}
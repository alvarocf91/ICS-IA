import { NavLink } from 'react-router-dom';

export default function MainNavigation() {
  return (
    <nav className="main-nav">
      <NavLink to="/" end>Inicio</NavLink>
      <NavLink to="/projects">Proyectos</NavLink>
      <NavLink to="/projects/new">Nuevo Proyecto</NavLink>
    </nav>
  );
}
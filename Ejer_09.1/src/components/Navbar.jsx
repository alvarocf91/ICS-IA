import { NavLink } from 'react-router-dom';
import './Navbar.css';

export const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>Inicio</NavLink>
        </li>
        <li>
          <NavLink to="/posts" className={({ isActive }) => (isActive ? 'active' : '')}>Artículos</NavLink>
        </li>
      </ul>
    </nav>
  );
};

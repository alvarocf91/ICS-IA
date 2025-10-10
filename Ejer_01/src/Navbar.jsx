import React from 'react';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-brown shadow-sm">
      <div className="container-fluid">
        <a className="navbar-brand fw-bold" href="#">FLORISTERIAS</a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><a className="nav-link active" href="#">Inicio</a></li>
            <li className="nav-item"><a className="nav-link" href="#">Recomendaciones</a></li>
            <li className="nav-item"><a className="nav-link" href="#">Mapa</a></li>
            <li className="nav-item"><a className="nav-link" href="#">Contacto</a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

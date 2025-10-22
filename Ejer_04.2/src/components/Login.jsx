import React from "react";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ height: "80vh" }}
    >
      <div className="card p-4 shadow text-center">
        <h4 className="mb-3">Bienvenido</h4>
        <p className="text-muted mb-3">
          Haz clic para ir al Dashboard de proyectos
        </p>
        <Link to="/dashboard" className="btn btn-primary">
          Ir al Dashboard
        </Link>
      </div>
    </div>
  );
}

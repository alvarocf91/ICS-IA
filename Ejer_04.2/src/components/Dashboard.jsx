import React, { useEffect, useState } from "react";
import ProjectColumn from "./ProjectColumn";
import { proyectosIniciales } from "../datos/proyectos";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [proyectos, setProyectos] = useState(() => {
    const saved = localStorage.getItem("proyectos");
    return saved ? JSON.parse(saved) : proyectosIniciales;
  });

  useEffect(() => {
    localStorage.setItem("proyectos", JSON.stringify(proyectos));
  }, [proyectos]);

  const handleActualizarEstado = (id, nuevoEstado) => {
    setProyectos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, estado: nuevoEstado } : p))
    );
  };

  const pendientes = proyectos.filter((p) => p.estado === "Pendiente");
  const enProgreso = proyectos.filter((p) => p.estado === "En Progreso");
  const completados = proyectos.filter((p) => p.estado === "Completado");

  return (
    <div className="container mt-4">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div>
          <h3 className="mb-0">
            <i className="bi bi-kanban me-2"></i>Dashboard de Proyectos
          </h3>
          <small className="text-muted">Gestiona el estado de tus proyectos</small>
        </div>
        <div>
          <Link to="/" className="btn btn-outline-secondary btn-sm">
            Volver
          </Link>
        </div>
      </div>

      <div className="row g-3">
        <div className="col-md-4">
          <ProjectColumn
            titulo="Pendiente"
            proyectos={pendientes}
            onActualizarEstado={handleActualizarEstado}
          />
        </div>

        <div className="col-md-4">
          <ProjectColumn
            titulo="En Progreso"
            proyectos={enProgreso}
            onActualizarEstado={handleActualizarEstado}
          />
        </div>

        <div className="col-md-4">
          <ProjectColumn
            titulo="Completado"
            proyectos={completados}
            onActualizarEstado={handleActualizarEstado}
          />
        </div>
      </div>
    </div>
  );
}

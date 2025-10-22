import React from "react";
import ProjectCard from "./ProjectCard";

export default function ProjectColumn({ titulo, proyectos = [], onActualizarEstado }) {
  return (
    <div className="column-card p-3 h-100">
      <div className="mb-3 text-center">
        <h5 className="mb-0">{titulo}</h5>
      </div>

      {proyectos.length === 0 ? (
        <p className="text-muted">Sin proyectos</p>
      ) : (
        proyectos.map((p) => (
          <ProjectCard key={p.id} proyecto={p} onActualizarEstado={onActualizarEstado} />
        ))
      )}
    </div>
  );
}

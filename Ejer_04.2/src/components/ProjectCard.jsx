import React from "react";
import TeamMemberList from "./TeamMemberList";

const prioridadClase = (p) => {
  switch ((p || "").toLowerCase()) {
    case "alta":
      return "bg-danger";
    case "media":
      return "bg-warning";
    case "baja":
      return "bg-success";
    default:
      return "bg-secondary";
  }
};

export default function ProjectCard({ proyecto, onActualizarEstado }) {
  const { id, titulo, descripcion, responsables = [], prioridad, estado } =
    proyecto;

  const opcionesEstados = ["Pendiente", "En Progreso", "Completado"].filter(
    (e) => e !== estado
  );

  const cambiarEstado = (e) => {
    const nuevo = e.target.value;
    if (!nuevo) return;
    onActualizarEstado(id, nuevo);
  };

  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body">
        <div className="d-flex align-items-center justify-content-between mb-2">
          <h5 className="card-title mb-0">{titulo}</h5>

          <div className="d-flex align-items-center">
            <span
              className={`me-2 rounded-circle ${prioridadClase(prioridad)}`}
              style={{ width: 14, height: 14, display: "inline-block" }}
              title={`Prioridad: ${prioridad}`}
            />
            <small className="text-muted">{prioridad}</small>
          </div>
        </div>

        <p className="card-text small text-muted">{descripcion}</p>

        <div className="mb-2">
          <strong className="small">Responsables:</strong>
          <div className="mt-1">
            <TeamMemberList responsables={responsables} />
          </div>
        </div>

        <hr />

        <div className="d-flex justify-content-between align-items-center">
          <div>
            <small className="text-muted">
              Estado: <span className="fw-semibold">{estado}</span>
            </small>
          </div>
          <div style={{ minWidth: 140 }}>
            <select
              className="form-select form-select-sm"
              onChange={cambiarEstado}
              defaultValue=""
              aria-label="Mover proyecto"
            >
              <option value="" disabled>
                Mover a...
              </option>
              {opcionesEstados.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}


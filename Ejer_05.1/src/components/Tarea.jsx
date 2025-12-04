import React from "react";

function Tarea({ tarea, cambiarEstado }) {
  const coloresPrioridad = {
    alta: "danger",
    media: "warning",
    baja: "success",
  };

  return (
    <div
      className={`list-group-item d-flex align-items-center justify-content-between ${
        tarea.completada ? "bg-light text-decoration-line-through" : ""
      }`}
    >
      <div
        className="d-flex align-items-center"
        style={{ cursor: "pointer" }}
        onClick={() => cambiarEstado(tarea.id)}
      >
        <span
          className={`badge bg-${coloresPrioridad[tarea.prioridad]} rounded-circle me-3`}
          style={{ width: "12px", height: "12px" }}
        ></span>
        {tarea.texto}
      </div>
      {tarea.completada && <span className="badge bg-success">✔</span>}
    </div>
  );
}

export default Tarea;

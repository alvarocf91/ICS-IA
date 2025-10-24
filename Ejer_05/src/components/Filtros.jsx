import React from "react";

function Filtros({ setFiltro, filtro }) {
  const opciones = ["todas", "alta", "media", "baja"];

  return (
    <div className="d-flex justify-content-center mb-3">
      {opciones.map((op) => (
        <button
          key={op}
          className={`btn mx-1 ${
            filtro === op ? "btn-primary" : "btn-outline-primary"
          }`}
          onClick={() => setFiltro(op)}
        >
          {op.charAt(0).toUpperCase() + op.slice(1)}
        </button>
      ))}
    </div>
  );
}

export default Filtros;

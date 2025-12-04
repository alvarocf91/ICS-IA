import React from "react";
import Tarea from "./Tarea";

function ListaTareas({ tareas, cambiarEstado }) {
  return (
    <div className="list-group mb-3">
      {tareas.length > 0 ? (
        tareas.map((t) => (
          <Tarea key={t.id} tarea={t} cambiarEstado={cambiarEstado} />
        ))
      ) : (
        <p className="text-center text-muted">No hay tareas para este filtro.</p>
      )}
    </div>
  );
}

export default ListaTareas;

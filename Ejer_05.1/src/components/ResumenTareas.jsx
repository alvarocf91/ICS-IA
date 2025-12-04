import React from "react";

function ResumenTareas({ tareas, total }) {
  const completadas = tareas.filter((t) => t.completada).length;

  if (tareas.length === 0) {
    return <p className="text-center text-muted">No hay tareas para este filtro.</p>;
  }

  if (completadas === tareas.length) {
    return (
      <p className="text-center text-success fw-bold">
        ¡Felicidades! Has completado todas las tareas de esta sección.
      </p>
    );
  }

  return (
    <p className="text-center text-secondary">
      Mostrando {tareas.length} de {total} tareas.
    </p>
  );
}

export default ResumenTareas;

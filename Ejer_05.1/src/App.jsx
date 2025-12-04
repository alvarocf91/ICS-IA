import React, { useState } from "react";
import Filtros from "./components/Filtros";
import ListaTareas from "./components/ListaTareas";
import ResumenTareas from "./components/ResumenTareas";

function App() {
  const [tareas, setTareas] = useState([
    { id: 1, texto: "Aprender sobre renderizado de listas en React", completada: true, prioridad: "alta" },
    { id: 2, texto: "Repasar estados y props", completada: false, prioridad: "media" },
    { id: 3, texto: "Hacer el ejercicio de Dashboard de Tareas", completada: false, prioridad: "baja" },
  ]);

  const [filtro, setFiltro] = useState("todas");

  const cambiarEstado = (id) => {
    setTareas(
      tareas.map((t) =>
        t.id === id ? { ...t, completada: !t.completada } : t
      )
    );
  };

  const tareasFiltradas =
    filtro === "todas"
      ? tareas
      : tareas.filter((t) => t.prioridad === filtro);

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">📋 Dashboard de Tareas</h1>

      <Filtros setFiltro={setFiltro} filtro={filtro} />

      <ListaTareas tareas={tareasFiltradas} cambiarEstado={cambiarEstado} />

      <ResumenTareas tareas={tareasFiltradas} total={tareas.length} />
    </div>
  );
}

export default App;

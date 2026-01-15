import { Outlet, Link } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div style={{ display: "flex" }}>
      <aside style={{ width: 200, borderRight: "1px solid #ccc", padding: "1rem" }}>
        <nav>
          <Link to="/dashboard">Ver Tareas</Link>
          <br />
          <Link to="/dashboard/new">Añadir Tarea</Link>
        </nav>
      </aside>
      <section style={{ flex: 1, padding: "1rem" }}>
        <Outlet />
      </section>
    </div>
  );
}

import { Outlet, Link } from "react-router-dom";

export default function RootLayout() {
  return (
    <div>
      <header style={{ borderBottom: "1px solid #ccc", padding: "1rem" }}>
        <Link to="/">Inicio</Link>{" | "}
        <Link to="/dashboard">Panel de Tareas</Link>{" | "}
        <Link to="/profile">Perfil</Link>
      </header>
      <main style={{ padding: "1rem" }}>
        <Outlet />
      </main>
    </div>
  );
}

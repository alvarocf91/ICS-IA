import { useNavigate } from "react-router-dom";

export default function NewTaskPage() {
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    alert("Tarea guardada (simulado)");
    navigate("/dashboard");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Nueva tarea</h2>
      <input placeholder="Título" required />
      <br />
      <textarea placeholder="Descripción" required />
      <br />
      <button>Guardar</button>
    </form>
  );
}

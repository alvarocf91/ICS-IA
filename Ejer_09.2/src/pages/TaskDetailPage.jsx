import { useParams, useNavigate } from "react-router-dom";
import { TASKS } from "../data/tasks.js";

export default function TaskDetailPage() {
  const { taskId } = useParams();
  const navigate = useNavigate();

  const task = TASKS.find(t => t.id === Number(taskId));
  if (!task) return <h2>Tarea no encontrada</h2>;

  const handleDelete = () => {
    alert("Tarea borrada (simulado)");
    navigate("/dashboard", { replace: true });
  };

  return (
    <>
      <h2>{task.title}</h2>
      <p>{task.description}</p>
      <p>Estado: {task.status}</p>
      <button onClick={handleDelete}>Borrar</button>
    </>
  );
}

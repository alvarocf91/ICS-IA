import { TASKS } from "../data/tasks.js";
import { Link } from "react-router-dom";

export default function TaskListPage() {
  return (
    <>
      <h2>Lista de tareas</h2>
      <ul>
        {TASKS.map(task => (
          <li key={task.id}>
            <Link to={`/dashboard/task/${task.id}`}>
              {task.title} ({task.status})
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

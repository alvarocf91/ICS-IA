import { useFetcher } from 'react-router-dom';

export default function TaskList({ tasks }) {
  const fetcher = useFetcher();

  return (
    <div className="task-section">
      <h3>Tareas:</h3>
      {tasks.map(t => (
        <div key={t.id} className="task-card">
          <span style={{ textDecoration: t.completed ? 'line-through' : 'none' }}>
            {t.title}
          </span>
          <fetcher.Form method="post">
            <input type="hidden" name="taskId" value={t.id} />
            <button name="intent" value="toggle-task">{t.completed ? 'Pendiente' : 'Completada'}</button>
            <button name="intent" value="delete-task" className="btn-danger">Eliminar</button>
          </fetcher.Form>
        </div>
      ))}
    </div>
  );
}
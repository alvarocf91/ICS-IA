import { useLoaderData, useSubmit, Link } from 'react-router-dom';
import { getProject, deleteProject, deleteTask, toggleTask } from '../utils/api';
import { redirect } from 'react-router-dom';
import TaskList from '../components/TaskList';

export async function loader({ params }) { return getProject(params.projectId); }

export async function action({ request, params }) {
  const formData = await request.formData();
  const intent = formData.get("intent");
  if (intent === "delete-project") { await deleteProject(params.projectId); return redirect("/projects"); }
  if (intent === "delete-task") await deleteTask(formData.get("taskId"));
  if (intent === "toggle-task") await toggleTask(formData.get("taskId"));
  return null;
}

export default function ProjectDetailsPage() {
  const project = useLoaderData();
  const submit = useSubmit();

  return (
    <div className="center">
      <h1>{project.name}</h1>
      <div className="actions">
        <button onClick={() => confirm("¿Eliminar?") && submit({intent: "delete-project"}, {method: "post"})}>Eliminar Proyecto</button>
        <Link to="new-task" className="btn-link">Añadir Tarea</Link>
      </div>
      <TaskList tasks={project.tasks} />
    </div>
  );
}
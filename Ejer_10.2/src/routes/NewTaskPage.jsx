import { Form, redirect } from 'react-router-dom';
import { addTask } from '../utils/api';

export async function action({ request, params }) {
  const formData = await request.formData();
  await addTask(params.projectId, formData.get("title"));
  return redirect(`/projects/${params.projectId}`);
}

export default function NewTaskPage() {
  return (
    <div className="form-container">
      <h2>Añadir Nueva Tarea</h2>
      <Form method="post" className="main-form">
        <input name="title" placeholder="Título de la tarea" required />
        <button>Añadir Tarea</button>
      </Form>
    </div>
  );
}
import { Form, useActionData, useNavigation, redirect } from 'react-router-dom';
import { createProject } from '../utils/api';

export async function action({ request }) {
  const formData = await request.formData();
  const name = formData.get("name");
  if (name.length < 5) return { error: "Mínimo 5 caracteres." };
  await createProject({ name, description: formData.get("description") });
  return redirect("/projects");
}

export default function NewProjectPage() {
  const error = useActionData();
  const navigation = useNavigation();
  return (
    <div className="form-container">
      <h2>Nuevo Proyecto</h2>
      <Form method="post" className="main-form">
        <input name="name" placeholder="Nombre" />
        {error?.error && <p className="error">{error.error}</p>}
        <textarea name="description" placeholder="Descripción" />
        <button disabled={navigation.state === "submitting"}>Guardar</button>
      </Form>
    </div>
  );
}
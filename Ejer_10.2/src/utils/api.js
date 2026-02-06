let projects = [
  { id: '1', name: 'Desarrollo de la Aplicación Móvil', description: 'Creación de una aplicación móvil para iOS y Android.' },
  { id: '2', name: 'Diseño de la Nueva Web Corporativa', description: 'Rediseño completo del sitio web principal de la empresa.' }
];

let tasks = [
  { id: 't1', projectId: '1', title: 'Diseñar interfaz de usuario', completed: false },
  { id: 't2', projectId: '1', title: 'Implementar autenticación de usuario', completed: false }
];

export async function getProjects() { return [...projects]; }

export async function getProject(id) {
  const project = projects.find(p => p.id === id);
  if (!project) return null;
  return { ...project, tasks: tasks.filter(t => t.projectId === id) };
}

export async function createProject({ name, description }) {
  const newProject = { id: Math.random().toString(), name, description };
  projects.push(newProject);
  return newProject;
}

export async function deleteProject(id) {
  projects = projects.filter(p => p.id !== id);
  tasks = tasks.filter(t => t.projectId !== id);
}

export async function addTask(projectId, title) {
  tasks.push({ id: Math.random().toString(), projectId, title, completed: false });
}

export async function deleteTask(id) { tasks = tasks.filter(t => t.id !== id); }

export async function toggleTask(id) {
  tasks = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
}
import { useLoaderData } from 'react-router-dom';
import { getProjects } from '../utils/api';
import ProjectList from '../components/ProjectList';

export async function loader() { return getProjects(); }

export default function ProjectsPage() {
  const projects = useLoaderData();
  return (
    <div className="center">
      <h2>Tus Proyectos</h2>
      <ProjectList projects={projects} />
    </div>
  );
}
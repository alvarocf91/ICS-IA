import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();
  return (
    <div>
      <h1>Error</h1>
      <p>No se pudieron cargar los datos.</p>
      <p>{error.message}</p>
    </div>
  );
}
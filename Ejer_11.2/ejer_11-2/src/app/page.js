import { pool } from '@/lib/db';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const [recetas] = await pool.query(
    'SELECT id, titulo, descripcion_corta, tiempo_coccion, fecha_creacion FROM recetas ORDER BY fecha_creacion DESC',
  );

  return (
    <main className="page-shell">
      <section className="page-header">
        <div>
          <p className="eyebrow">Blog de cocina</p>
          <h1>Recetas</h1>
        </div>
        <Link href="/recetas/nueva" className="button button-primary">
          Crear Nueva Receta
        </Link>
      </section>

      {recetas.length === 0 ? (
        <p className="empty-state">Todavia no hay recetas guardadas.</p>
      ) : (
        <section className="recipe-grid" aria-label="Listado de recetas">
          {recetas.map((receta) => (
            <Link key={receta.id} href={`/recetas/${receta.id}`} className="recipe-card">
              <span className="recipe-time">{receta.tiempo_coccion} min</span>
              <h2>{receta.titulo}</h2>
              <p>{receta.descripcion_corta}</p>
            </Link>
          ))}
        </section>
      )}
    </main>
  );
}

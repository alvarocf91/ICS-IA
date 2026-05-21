import { editarReceta } from '@/lib/actions';
import { pool } from '@/lib/db';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function EditarReceta({ params }) {
  const { id } = await params;
  const [[receta]] = await pool.query('SELECT * FROM recetas WHERE id = ?', [id]);

  if (!receta) {
    notFound();
  }

  return (
    <main className="page-shell narrow">
      <Link href={`/recetas/${id}`} className="back-link">
        Volver a la receta
      </Link>

      <form action={editarReceta.bind(null, id)} className="form-panel">
        <h1>Editar Receta</h1>

        <label>
          Titulo
          <input name="titulo" defaultValue={receta.titulo} required maxLength="150" />
        </label>

        <label>
          Descripcion corta
          <input
            name="descripcion_corta"
            defaultValue={receta.descripcion_corta}
            required
            maxLength="255"
          />
        </label>

        <label>
          Ingredientes
          <textarea name="ingredientes" defaultValue={receta.ingredientes} required rows="6" />
        </label>

        <label>
          Instrucciones
          <textarea name="instrucciones" defaultValue={receta.instrucciones} required rows="8" />
        </label>

        <label>
          Tiempo de coccion (minutos)
          <input
            name="tiempo_coccion"
            type="number"
            min="1"
            defaultValue={receta.tiempo_coccion}
            required
          />
        </label>

        <button type="submit" className="button button-primary">
          Actualizar receta
        </button>
      </form>
    </main>
  );
}

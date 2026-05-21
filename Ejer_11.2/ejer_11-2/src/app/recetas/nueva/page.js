import { guardarReceta } from '@/lib/actions';
import Link from 'next/link';

export default function NuevaReceta() {
  return (
    <main className="page-shell narrow">
      <Link href="/" className="back-link">
        Volver al listado
      </Link>

      <form action={guardarReceta} className="form-panel">
        <h1>Nueva Receta</h1>

        <label>
          Titulo
          <input name="titulo" required maxLength="150" />
        </label>

        <label>
          Descripcion corta
          <input name="descripcion_corta" required maxLength="255" />
        </label>

        <label>
          Ingredientes
          <textarea name="ingredientes" required rows="6" />
        </label>

        <label>
          Instrucciones
          <textarea name="instrucciones" required rows="8" />
        </label>

        <label>
          Tiempo de coccion (minutos)
          <input name="tiempo_coccion" type="number" min="1" required />
        </label>

        <button type="submit" className="button button-primary">
          Guardar receta
        </button>
      </form>
    </main>
  );
}

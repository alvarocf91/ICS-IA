import { agregarComentario, borrarReceta } from '@/lib/actions';
import { pool } from '@/lib/db';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function DetalleReceta({ params }) {
  const { id } = await params;
  const [[receta]] = await pool.query('SELECT * FROM recetas WHERE id = ?', [id]);

  if (!receta) {
    notFound();
  }

  const [comentarios] = await pool.query(
    'SELECT id, autor, texto, fecha_creacion FROM comentarios WHERE receta_id = ? ORDER BY fecha_creacion DESC',
    [id],
  );

  return (
    <main className="page-shell detail-shell">
      <Link href="/" className="back-link">
        Volver al listado
      </Link>

      <article className="recipe-detail">
        <header className="detail-header">
          <div>
            <p className="eyebrow">{receta.tiempo_coccion} min de coccion</p>
            <h1>{receta.titulo}</h1>
            <p className="lead">{receta.descripcion_corta}</p>
          </div>

          <div className="actions-row">
            <Link href={`/recetas/${id}/editar`} className="button button-secondary">
              Editar Receta
            </Link>
            <form action={borrarReceta.bind(null, id)}>
              <button type="submit" className="button button-danger">
                Borrar Receta
              </button>
            </form>
          </div>
        </header>

        <section className="content-section">
          <h2>Ingredientes</h2>
          <p className="preserve-lines">{receta.ingredientes}</p>
        </section>

        <section className="content-section">
          <h2>Instrucciones</h2>
          <p className="preserve-lines">{receta.instrucciones}</p>
        </section>
      </article>

      <section className="comments-section">
        <div className="section-title-row">
          <h2>Comentarios</h2>
          <span>{comentarios.length}</span>
        </div>

        {comentarios.length === 0 ? (
          <p className="empty-state compact">Se el primero en comentar esta receta.</p>
        ) : (
          <div className="comments-list">
            {comentarios.map((comentario) => (
              <article key={comentario.id} className="comment">
                <strong>{comentario.autor}</strong>
                <p>{comentario.texto}</p>
              </article>
            ))}
          </div>
        )}

        <form action={agregarComentario.bind(null, id)} className="comment-form">
          <label>
            Nombre
            <input name="autor" required maxLength="100" />
          </label>
          <label>
            Comentario
            <textarea name="texto" required rows="4" />
          </label>
          <button type="submit" className="button button-primary">
            Comentar
          </button>
        </form>
      </section>
    </main>
  );
}

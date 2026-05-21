import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="page-shell narrow">
      <section className="form-panel">
        <p className="eyebrow">404</p>
        <h1>Receta no encontrada</h1>
        <p className="lead">La receta que buscas no existe o ya fue borrada.</p>
        <Link href="/" className="button button-primary">
          Volver al listado
        </Link>
      </section>
    </main>
  );
}

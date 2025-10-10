import './App.css'; 

function App() {
  return (
    <>
      <header className="bg-green text-white py-3">
        <div className="container d-flex justify-content-between align-items-center">
          <h1 className="h3 mb-0">Naturaleza Viva</h1>
          <nav>
            <a href="#" className="text-white mx-2 text-decoration-none">Inicio</a>
            <a href="#" className="text-white mx-2 text-decoration-none">Proyectos</a>
            <a href="#" className="text-white mx-2 text-decoration-none">Recursos</a>
            <a href="#" className="text-white mx-2 text-decoration-none">Contacto</a>
          </nav>
        </div>
      </header>

      <section className="py-5 bg-light">
        <div className="container">
          <div className="row no-gutters justify-content-center">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="col-6 col-md-3 mb-4">
                <div className="card h-100">
                  <img
                    src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6"
                    className="card-img-top"
                    alt="Naturaleza"
                  />
                  <div className="card-body">
                    <h5 className="card-title text-success">Explora la Naturaleza</h5>
                    <p className="card-text">
                      Descubre cómo cuidar el medio ambiente y conectar con la vida natural.
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="footer-green py-3 text-center">
        <div className="container">
          <p className="mb-1">&copy; 2025 Naturaleza Viva. Todos los derechos reservados.</p>
          <p className="mb-0">
            Inspirando respeto por la Tierra | <a href="#" className="footer-link">Política de privacidad</a>
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;

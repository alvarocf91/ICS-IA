function Footer() {
  return (
    <footer className="footer-coffee py-5 mt-auto">
      <div className="container text-center text-white">
        <p className="mb-3">&copy; 2025 CaféLocal. Todos los derechos reservados.</p>
        <div className="mb-3">
          <a href="#" className="footer-link me-4">Política de Privacidad</a>
          <a href="#" className="footer-link me-4">Términos de Uso</a>
          <a href="#" className="footer-link">Contacto</a>
        </div>
        <div>
          <a href="#" className="footer-icon me-3" aria-label="Facebook">
            <i className="bi bi-facebook"></i>
          </a>
          <a href="#" className="footer-icon me-3" aria-label="Twitter">
            <i className="bi bi-twitter"></i>
          </a>
          <a href="#" className="footer-icon" aria-label="Instagram">
            <i className="bi bi-instagram"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="container my-5 mb-0">
      <div className="text-center text-white p-4 py-5 rounded shadow" style={{
        backgroundColor: '#15803d',
        border: '4px solid #fb923c'
      }}>
        <p className="fw-semibold mb-2 fs-5">
          © {currentYear} Naturaleza Viva. Todos los derechos reservados.
        </p>
        <p className="mb-0" style={{ color: '#d1fae5', fontSize: '0.95rem' }}>
          Inspirándonos respeto por la Tierra | <a href="#privacidad" className="text-decoration-none" style={{ color: '#d1fae5' }}>Política de privacidad</a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
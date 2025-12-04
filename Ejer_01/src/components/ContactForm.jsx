import { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.nombre || !formData.email || !formData.mensaje) {
      alert('Por favor completa todos los campos');
      return;
    }

    alert('Solicitud enviada correctamente');
    console.log('Datos del formulario:', formData);

    setFormData({ nombre: '', email: '', mensaje: '' });
  };

  return (
    <div className="container my-5">
      <div className="p-4 p-md-5 rounded" style={{
        background: 'linear-gradient(to bottom, #dbeafe, #f3e8ff)',
        border: '4px solid #3b82f6'
      }}>
        <h2 className="text-center mb-4 mb-md-5 fw-bold" style={{ color: '#0d9488', fontSize: '2rem' }}>
          Solicita más información
        </h2>

        <div className="row justify-content-center">
          <div className="col-12 col-lg-8">
            <form
              name="contact"
              method="POST"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              onSubmit={handleSubmit}
            >
              <input type="hidden" name="form-name" value="contact" />
              <p hidden>
                <label>No llenar esto: <input name="bot-field" /></label>
              </p>

              <div className="mb-4">
                <label htmlFor="nombre" className="form-label fw-semibold text-dark">Nombre completo</label>
                <input
                  type="text"
                  className="form-control form-control-lg border-2"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Tu nombre"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="form-label fw-semibold text-dark">Correo electrónico</label>
                <input
                  type="email"
                  className="form-control form-control-lg border-2"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="nombre@ejemplo.com"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="mensaje" className="form-label fw-semibold text-dark">Mensaje</label>
                <textarea
                  className="form-control form-control-lg border-2"
                  id="mensaje"
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Escribe tu consulta aquí..."
                  required
                ></textarea>
              </div>

              <div className="text-center">
                <button
                  className="btn btn-success btn-lg px-5 py-3 shadow fw-bold"
                  type="submit"
                  style={{ fontSize: '1.1rem' }}
                >
                  Enviar solicitud
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;

import React, { useState } from "react";

function ContactForm() {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    mensaje: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Solicitud enviada:\nNombre: ${formData.nombre}\nCorreo: ${formData.correo}\nTeléfono: ${formData.telefono}\nMensaje: ${formData.mensaje}`);
    setFormData({ nombre: "", correo: "", telefono: "", mensaje: "" });
  };

  return (
    <section className="contact-section" id="contacto">
      <h2>Envíanos una solicitud</h2>
      <form
        name="contact"
        method="POST"
        data-netlify="true"
        onSubmit={handleSubmit}
      >
        <input type="hidden" name="form-name" value="contact" />

        <label htmlFor="nombre">Nombre Completo</label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          value={formData.nombre}
          onChange={handleChange}
          required
          placeholder="Tu nombre completo"
        />

        <label htmlFor="correo">Correo Electrónico</label>
        <input
          id="correo"
          name="correo"
          type="email"
          value={formData.correo}
          onChange={handleChange}
          required
          placeholder="tu@correo.com"
        />

        <label htmlFor="telefono">Teléfono</label>
        <input
          id="telefono"
          name="telefono"
          type="tel"
          value={formData.telefono}
          onChange={handleChange}
          placeholder="(opcional)"
        />

        <label htmlFor="mensaje">Mensaje</label>
        <textarea
          id="mensaje"
          name="mensaje"
          rows="4"
          value={formData.mensaje}
          onChange={handleChange}
          placeholder="Escribe tu mensaje aquí"
          required
        />

        <button type="submit">Enviar</button>
      </form>
    </section>
  );
}

export default ContactForm;

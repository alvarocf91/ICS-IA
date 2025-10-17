import React from 'react'

export default function DetallesProducto({ caracteristicas = [], children }) {
  return (
    <section>
      <h3 style={{margin: '8px 0'}}>Características</h3>
      <ul style={{marginTop: 8, paddingLeft: 18}}>
        {caracteristicas.map((car, idx) => (
          <li key={idx}>{car}</li>
        ))}
      </ul>
      {/* Renderizamos cualquier JSX que llegue como children (por ejemplo, el botón "Más información") */}
      <div style={{marginTop: 12}}>{children}</div>
    </section>
  )
}

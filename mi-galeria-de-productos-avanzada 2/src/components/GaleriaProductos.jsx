import React from 'react'
import FichaProducto from './FichaProducto'

export default function GaleriaProductos({ productos }) {
  if (!productos?.length) {
    return <p>No hay productos para mostrar.</p>
  }

  return (
    <div style={grid}>
      {productos.map((producto) => (
        <FichaProducto key={producto.id} producto={producto}>
          <button style={btnMasInfo}>Más información</button>
        </FichaProducto>
      ))}
    </div>
  )
}

const grid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
  gap: 16
}

const btnMasInfo = {
  padding: '10px 12px',
  border: '1px solid #ddd',
  background: 'white',
  borderRadius: 10,
  cursor: 'pointer'
}

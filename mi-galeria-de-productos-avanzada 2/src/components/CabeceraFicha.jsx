import React from 'react'

export default function CabeceraFicha({ nombre, vendedor }) {
  const vendedorStr = vendedor ? `${vendedor.nombre} · ⭐ ${vendedor.rating}` : '—'
  return (
    <header>
      <h2 style={{margin: 0, fontSize: 18}}>{nombre}</h2>
      <small style={{color: '#666'}}>{vendedorStr}</small>
    </header>
  )
}

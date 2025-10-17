import React from 'react'
import CabeceraFicha from './CabeceraFicha'
import ImagenProducto from './ImagenProducto'
import DetallesProducto from './DetallesProducto'
import PieFicha from './PieFicha'

export default function FichaProducto({ producto, children }) {
  const { nombre, vendedor, imagenes, caracteristicas, precio, enStock } = producto

  return (
    <article style={card}>
      <CabeceraFicha nombre={nombre} vendedor={vendedor} />
      <ImagenProducto url={imagenes?.[0]} alt={nombre} />
      <DetallesProducto caracteristicas={caracteristicas}>
        {children /* Pasamos los children a DetallesProducto */}
      </DetallesProducto>
      <PieFicha precio={precio} enStock={enStock} />
    </article>
  )
}

const card = {
  border: '1px solid #e7e7e7',
  borderRadius: 16,
  padding: 16,
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
  boxShadow: '0 1px 6px rgba(0,0,0,0.06)',
  background: 'white'
}

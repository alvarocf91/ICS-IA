import React from 'react'

export default function PieFicha({ precio, enStock }) {

  if (!enStock) {
    return (
      <footer style={foot}>
        <span style={{color: '#b00020', fontWeight: 600}}>No disponible</span>
      </footer>
    )
  }

  const mostrarOferta = precio?.enOferta
  const valor = typeof precio?.valor === 'number' ? precio.valor.toFixed(2) : '—'
  const currency = precio?.moneda ?? '€'

  return (
    <footer style={foot}>
      <strong style={{fontSize: 18}}>{currency}{valor}</strong>
      {mostrarOferta && <span style={badgeOferta}>¡OFERTA!</span>}
    </footer>
  )
}

const foot = {
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  marginTop: 'auto',
  paddingTop: 8,
  borderTop: '1px solid #eee'
}

const badgeOferta = {
  fontSize: 12,
  border: '1px solid #f0c000',
  background: '#fff7d1',
  padding: '2px 6px',
  borderRadius: 8
}

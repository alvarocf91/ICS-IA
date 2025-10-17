// App.jsx
import React from 'react'
import GaleriaProductos from './components/GaleriaProductos'
import { productos } from './datos/Productos'

export default function App() {
  return (
    <div style={{fontFamily:'system-ui, Arial', padding: 24, maxWidth: 1200, margin: '0 auto'}}>
      <h1 style={{marginBottom: 8}}>Mi Galería de Productos</h1>
      <p style={{marginTop: 0, color: '#555'}}>
        Versión avanzada con composición, prop drilling controlado, listas, renderizado condicional y props.children.
      </p>
      <GaleriaProductos productos={productos} />
    </div>
  )
}

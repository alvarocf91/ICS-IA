import React from 'react'

export default function ImagenProducto({ url, alt }) {
  if (!url) return null
  return (
    <div style={{overflow: 'hidden', borderRadius: 12}}>
      <img src={url} alt={alt} style={{width: '100%', display: 'block', aspectRatio: '4 / 3', objectFit: 'cover'}} />
    </div>
  )
}

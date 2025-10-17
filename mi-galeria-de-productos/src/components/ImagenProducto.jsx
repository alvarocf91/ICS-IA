function ImagenProducto({ url, nombre }) {
  return (
    <img 
      src={url} 
      alt={nombre}
      style={{
        width: '100%',
        height: '200px',
        objectFit: 'cover',
        borderRadius: '8px 8px 0 0'
      }}
    />
  );
}

export default ImagenProducto;

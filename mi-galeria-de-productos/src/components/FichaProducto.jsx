import ImagenProducto from './ImagenProducto';

function FichaProducto({ producto, children }) {
  const { nombre, descripcion, precio, imagenURL } = producto;
  
  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      cursor: 'pointer'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-5px)';
      e.currentTarget.style.boxShadow = '0 8px 12px rgba(0, 0, 0, 0.15)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }}>
      <ImagenProducto url={imagenURL} nombre={nombre} />
      
      <div style={{ padding: '20px' }}>
        <h3 style={{ 
          margin: '0 0 10px 0',
          fontSize: '1.5rem',
          color: '#2d3748'
        }}>
          {nombre}
        </h3>
        
        <p style={{ 
          margin: '0 0 15px 0',
          color: '#718096',
          fontSize: '0.95rem',
          lineHeight: '1.5'
        }}>
          {descripcion}
        </p>
        
        <p style={{ 
          margin: '0 0 15px 0',
          fontSize: '1.8rem',
          fontWeight: 'bold',
          color: '#2b6cb0'
        }}>
          {precio.toFixed(2)} €
        </p>
        
        {children}
      </div>
    </div>
  );
}

export default FichaProducto;

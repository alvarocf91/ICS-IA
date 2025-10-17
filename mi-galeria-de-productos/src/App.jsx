import FichaProducto from './components/FichaProducto';
import { productos } from './datos/productos';

export default function App() {
  const handleAddToCart = (nombreProducto) => {
    alert(`"${nombreProducto}" añadido al carrito`);
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f7fafc',
      padding: '40px 20px'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <h1 style={{
          textAlign: 'center',
          fontSize: '2.5rem',
          color: '#2d3748',
          marginBottom: '10px'
        }}>
          Galería de Productos
        </h1>
        
        <p style={{
          textAlign: 'center',
          color: '#718096',
          marginBottom: '40px',
          fontSize: '1.1rem'
        }}>
          Explora nuestra selección de productos tecnológicos
        </p>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '30px'
        }}>
          {productos.map((producto) => (
            <FichaProducto key={producto.id} producto={producto}>
              <button 
                onClick={() => handleAddToCart(producto.nombre)}
                style={{
                  width: '100%',
                  padding: '12px',
                  backgroundColor: '#3182ce',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#2c5aa0'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#3182ce'}
              >
                🛒 Añadir al carrito
              </button>
            </FichaProducto>
          ))}
        </div>
      </div>
    </div>
  );
}
const CardsSection = () => {
  const cards = [
    { id: 1, destacada: true },
    { id: 2, destacada: false },
    { id: 3, destacada: false },
    { id: 4, destacada: false }
  ];

  return (
    <div className="container my-5">
      <div className="p-4 rounded" style={{
        background: 'linear-gradient(to right, #fed7aa, #d1fae5)',
        border: '4px solid #fb923c'
      }}>
        <div className="row g-4">
          {cards.map((card) => (
            <div key={card.id} className="col-12 col-md-6 col-lg-3">
              <div 
                className={`card h-100 shadow ${card.destacada ? 'border-primary' : 'border-secondary'}`}
                style={{
                  borderWidth: card.destacada ? '4px' : '2px'
                }}
              >
                <div className="card-body text-center d-flex flex-column">
                  <div className="mb-3">
                    <svg 
                      width="64" 
                      height="64" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="#16a34a" 
                      className="mx-auto"
                    >
                      <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
                      <line x1="16" y1="8" x2="2" y2="22" />
                      <line x1="17.5" y1="15" x2="9" y2="15" />
                    </svg>
                  </div>
                  <h5 className="card-title text-success fw-bold mb-3">
                    Explora la Naturaleza
                  </h5>
                  <p className="card-text text-secondary small">
                    Descubre cómo cuidar el medio ambiente y conectar con la vida natural.
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardsSection;
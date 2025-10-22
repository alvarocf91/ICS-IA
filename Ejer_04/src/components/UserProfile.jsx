import React from 'react';

function UserProfile({ usuario }) {
  if (!usuario) {
    return (
      <div className="card p-4">
        <div className="card-body">
          <h5 className="card-title">Información</h5>
          <p className="card-text text-muted">Selecciona un usuario para ver los detalles.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="profile-header mb-3 p-3 text-white">
        <div className="d-flex align-items-center">
          <img src={usuario.avatarUrl} alt={usuario.nombre} className="rounded-circle profile-avatar me-3" />
          <div>
            <h3 className="m-0">{usuario.nombre}</h3>
            <div className="text-muted">{usuario.email}</div>
          </div>
        </div>
      </div>

      <div className="card p-3">
        <div className="card-body">
          <h5>Información de Contacto</h5>
          <p><strong>Calle:</strong> {usuario.direccion.calle}</p>
          <p><strong>Ciudad:</strong> {usuario.direccion.ciudad}</p>

          <h5>Aficiones</h5>
          <div>
            {usuario.aficiones.map((a, i) => (
              <span key={i} className="badge rounded-pill me-2 mb-2 aficion-badge">{a}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;

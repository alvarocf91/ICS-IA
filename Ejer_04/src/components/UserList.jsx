import React, { useState, useEffect } from 'react';

function UserList({ usuarios, onSelectUser, selectedId }) {
  const [query, setQuery] = useState('');
  const [filtered, setFiltered] = useState(usuarios);

  useEffect(() => {
    const q = query.trim().toLowerCase();
    if (!q) setFiltered(usuarios);
    else setFiltered(usuarios.filter(u => u.nombre.toLowerCase().includes(q)));
  }, [query, usuarios]);

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Lista de Usuarios</h5>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar usuario..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="list-group user-list" role="tablist">
          {filtered.map((usuario) => (
            <button
              key={usuario.id}
              className={
                "list-group-item list-group-item-action text-start " +
                (selectedId === usuario.id ? "active" : "")
              }
              onClick={() => onSelectUser(usuario)}
            >
              {usuario.nombre}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserList;
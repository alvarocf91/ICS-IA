import React, { useState } from 'react';
import UserList from './components/UserList';
import UserProfile from './components/UserProfile';
import usuarios from './datos/usuarios';
import './App.css';

function App() {
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

  const manejarSeleccion = (usuario) => {
    setUsuarioSeleccionado(usuario);
  };

  return (
    <div className="container mt-4">
      <div className="mb-4 header-bar p-3 mb-5">
        <h4 className="m-0 text-white">Gestor de Perfiles de Usuario</h4>
      </div>
      <div className="row">
        <div className="col-md-4">
          <UserList 
            usuarios={usuarios} 
            onSelectUser={manejarSeleccion} 
            selectedId={usuarioSeleccionado ? usuarioSeleccionado.id : null} 
          />
        </div>
        <div className="col-md-8">
          <UserProfile usuario={usuarioSeleccionado} />
        </div>
      </div>
    </div>
  );
}

export default App;
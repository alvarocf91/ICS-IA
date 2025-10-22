import React, { useState } from 'react';
import UserList from './src/components/UserList';
import UserProfile from './src/components/UserProfile';
import usuarios from './src/datos/usuarios';

function App() {
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

  const manejarSeleccion = (usuario) => {
    setUsuarioSeleccionado(usuario);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4">
          <UserList usuarios={usuarios} onSelectUser={manejarSeleccion} />
        </div>
        <div className="col-md-8">
          <UserProfile usuario={usuarioSeleccionado} />
        </div>
      </div>
    </div>
  );
}

export default App;

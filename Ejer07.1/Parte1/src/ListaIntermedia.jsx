import TarjetaUsuario from "./TarjetaUsuario";

export default function ListaIntermedia({ users }) {
  console.log("Render: ListaIntermedia");

  return (
    <div style={{ marginTop: 20 }}>
      {users.map((u) => (
        <TarjetaUsuario key={u.id} user={u} />
      ))}
    </div>
  );
}

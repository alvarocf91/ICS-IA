import Avatar from "./Avatar";

export default function TarjetaUsuario({ user }) {
  console.log("Render: TarjetaUsuario", user.id);

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: 8,
        padding: 15,
        margin: "15px auto",
        width: 300
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <Avatar avatar={user.avatar} isOnline={user.isOnline} />
        <div>
          <h4>{user.name}</h4>
          <p style={{ fontSize: 13 }}>{user.email}</p>
        </div>
      </div>
    </div>
  );
}


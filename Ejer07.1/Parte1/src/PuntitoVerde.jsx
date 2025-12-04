export default function PuntitoVerde({ isOnline }) {
  console.log("Render: PuntitoVerde");

  return (
    <div
      style={{
        width: 12,
        height: 12,
        borderRadius: "50%",
        background: isOnline ? "green" : "red",
        position: "absolute",
        bottom: 0,
        right: 0,
        border: "2px solid white"
      }}
    ></div>
  );
}

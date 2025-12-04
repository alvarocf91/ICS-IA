import ContadorPadre from "./ContadorPadre";

export default function App() {
  console.log("Render: App");

  return (
    <div style={{ padding: 20 }}>
      <h1>Ejercicio 1 – El contador descontrolado</h1>
      <ContadorPadre />
    </div>
  );
}

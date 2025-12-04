import { useMemo, useState } from "react";
import ListaIntermedia from "./ListaIntermedia";

export default function ContadorPadre() {
  console.log("Render: ContadorPadre");

  const [count, setCount] = useState(0);

  const users = useMemo(() => {
    console.log("Generando usuarios...");
    return Array.from({ length: 500 }, (_, i) => ({
      id: i + 1,
      name: `Usuario ${i + 1}`,
      email: `usuario${i + 1}@correo.com`,
      avatar: `https://i.pravatar.cc/150?img=${(i + 1) % 70 + 1}`,
      isOnline: Math.random() > 0.5,
    }));
  }, []); // Solo se genera una vez

  return (
    <div style={{ border: "2px solid black", padding: 20 }}>
      <button onClick={() => setCount(count + 1)}>
        Contador: {count}
      </button>

      <ListaIntermedia users={users} />
    </div>
  );
}

import { useState, useMemo } from "react";
import UserList from "./UserList.jsx";
import "./App.css";

const generateUsers = () => {
  const users = [];
  for (let i = 1; i <= 10000; i++) {
    users.push({
      id: i,
      name: `Usuario ${i}`,
      price: Math.floor(Math.random() * 1000),
    });
  }
  return users;
};

function App() {
  const [search, setSearch] = useState("");
  const users = useMemo(() => generateUsers(), []);

  const filteredUsers = useMemo(() => {
    return users.filter((u) =>
      u.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, users]);

  return (
    <div className="App">
      <h1>Filtro de usuarios caro/barato</h1>
      <input
        type="text"
        placeholder="Buscar usuario..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <UserList users={filteredUsers} />
    </div>
  );
}

export default App;

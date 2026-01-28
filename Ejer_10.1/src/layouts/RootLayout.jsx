import { NavLink, Outlet, useLoaderData } from 'react-router-dom';
import { useState } from 'react';

export default function RootLayout() {
  const countries = useLoaderData();

  const [search, setSearch] = useState('');
  const [continent, setContinent] = useState('all');
  const [order, setOrder] = useState('az');

  let filtered = countries.filter((country) =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  );

  if (continent !== 'all') {
    filtered = filtered.filter(
      (country) => country.region === continent
    );
  }

  filtered.sort((a, b) => {
    if (order === 'az') {
      return a.name.common.localeCompare(b.name.common);
    }
    return b.name.common.localeCompare(a.name.common);
  });

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <aside style={{ width: '320px', padding: '1rem', borderRight: '1px solid #ccc', overflowY: 'auto' }}>
        
        <input
          type="text"
          placeholder="Buscar país..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: '100%', marginBottom: '0.5rem' }}
        />

        <select
          value={continent}
          onChange={(e) => setContinent(e.target.value)}
          style={{ width: '100%', marginBottom: '0.5rem' }}
        >
          <option value="all">Todos los continentes</option>
          <option value="Europe">Europa</option>
          <option value="Asia">Asia</option>
          <option value="Africa">África</option>
          <option value="Americas">América</option>
          <option value="Oceania">Oceanía</option>
        </select>

        <select
          value={order}
          onChange={(e) => setOrder(e.target.value)}
          style={{ width: '100%', marginBottom: '1rem' }}
        >
          <option value="az">Nombre A-Z</option>
          <option value="za">Nombre Z-A</option>
        </select>

        <ul style={{ listStyle: 'none', padding: 0 }}>
          {filtered.map((country) => (
            <li key={country.cca3} style={{ marginBottom: '0.5rem' }}>
              <NavLink
  to={`/country/${country.name.common.toLowerCase()}`}
  style={({ isActive }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    textDecoration: 'none',
    color: isActive ? '#1976d2' : '#000',
    fontWeight: isActive ? 'bold' : 'normal',
  })}
>

                <img src={country.flags.svg} width="24" />
                {country.name.common}
              </NavLink>
            </li>
          ))}
        </ul>
      </aside>

      <main style={{ flex: 1, padding: '2rem' }}>
        <Outlet />
      </main>
    </div>
  );
}
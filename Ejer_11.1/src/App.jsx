import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import MovieList from './pages/MovieList';
import MovieDetail from './pages/MovieDetail';
import ActorList from './pages/ActorList';
import ActorDetail from './pages/ActorDetail';

function App() {
  return (
    <BrowserRouter>
      <nav style={{ padding: '20px', backgroundColor: '#282c34', color: 'white', marginBottom: '20px' }}>
        <Link to="/movies" style={{ color: 'white', marginRight: '20px', textDecoration: 'none', fontWeight: 'bold' }}>🎬 Películas</Link>
        <Link to="/actors" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>👤 Actores</Link>
      </nav>

      <div style={{ padding: '0 20px', maxWidth: '1000px', margin: '0 auto' }}>
        <Routes>
          {}
          <Route path="/" element={<MovieList />} />
          <Route path="/movies" element={<MovieList />} />
          <Route path="/movies/:movieId" element={<MovieDetail />} />
          <Route path="/actors" element={<ActorList />} />
          <Route path="/actors/:actorId" element={<ActorDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
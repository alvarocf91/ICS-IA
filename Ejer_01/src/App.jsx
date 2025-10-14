import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Navbar from './components/Navbar';
import CardsSection from './components/CardsSection';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="app-container" style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom, #374151, #1f2937)'
    }}>
      <Navbar />
      <main>
        <CardsSection />
        <ContactForm />
        <Footer />
      </main>
    </div>
  );
}

export default App;
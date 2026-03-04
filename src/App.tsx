import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import Home from './pages/Home';
import About from './pages/About';
import Offer from './pages/Offer';
import Category from './pages/Category';
import Contact from './pages/Contact';
import Laboratoria from './pages/Laboratoria';
import Calculator from './pages/Calculator';
import Blog from './pages/Blog';
import Colors from './pages/Colors';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/o-nas" element={<About />} />
        <Route path="/oferta" element={<Offer />} />
        <Route path="/oferta/:slug" element={<Category />} />
        <Route path="/kontakt" element={<Contact />} />
        <Route path="/laboratoria" element={<Laboratoria />} />
        <Route path="/kalkulator" element={<Calculator />} />
        <Route path="/kolory" element={<Colors />} />
        <Route path="/blog" element={<Blog />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans transition-colors">
        <Toaster position="bottom-right" toastOptions={{ style: { background: '#333', color: '#fff' } }} />
        <Navbar />
        <CartDrawer />
        <main className="flex-grow flex flex-col">
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

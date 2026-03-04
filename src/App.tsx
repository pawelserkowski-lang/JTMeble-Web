import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X, Phone, Mail, MapPin, Armchair, FileText } from 'lucide-react';
import Home from './pages/Home';
import About from './pages/About';
import Offer from './pages/Offer';
import Category from './pages/Category';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900 font-sans">
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <div className="flex-shrink-0 flex items-center">
                <Link to="/" className="flex items-center gap-2 group">
                  <div className="bg-gradient-to-br from-orange-400 to-orange-600 text-white p-2 rounded-xl shadow-md group-hover:shadow-orange-500/20 transition-all duration-300 group-hover:-translate-y-0.5">
                    <Armchair size={22} strokeWidth={2.5} />
                  </div>
                  <span className="text-2xl font-black tracking-tighter text-gray-900">
                    JT<span className="text-orange-500 font-medium">Meble.</span>
                  </span>
                </Link>
              </div>
              <div className="hidden md:flex space-x-8">
                <Link
                  to="/"
                  className="text-gray-600 hover:text-orange-500 px-3 py-2 text-sm font-medium transition-colors"
                >
                  Strona główna
                </Link>
                <Link
                  to="/o-nas"
                  className="text-gray-600 hover:text-orange-500 px-3 py-2 text-sm font-medium transition-colors"
                >
                  O nas
                </Link>
              </div>
              <div className="md:hidden flex items-center">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-gray-600 hover:text-gray-900"
                >
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
          </div>
          {isMenuOpen && (
            <div className="md:hidden bg-white border-t border-gray-100">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <Link
                  to="/"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-orange-500"
                >
                  Strona główna
                </Link>
                <Link
                  to="/o-nas"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-orange-500"
                >
                  O nas
                </Link>
              </div>
            </div>
          )}
        </nav>

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/o-nas" element={<About />} />
            <Route path="/oferta" element={<Offer />} />
            <Route path="/oferta/:slug" element={<Category />} />
          </Routes>
        </main>

        <footer className="bg-white border-t border-gray-200 pt-16 pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
              <div>
                <span className="text-2xl font-bold tracking-tight text-gray-900">
                  JT<span className="text-orange-500">Meble</span>
                </span>
                <p className="mt-4 text-gray-600 max-w-sm">
                  Tworzymy funkcjonalne i estetyczne meble na wymiar. Jakość i precyzja to nasze
                  priorytety w każdym projekcie.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-4">Kontakt</h4>
                <ul className="space-y-4 text-gray-600">
                  <li className="flex items-center">
                    <Phone size={20} className="mr-3 text-orange-500" /> +48 123 456 789
                  </li>
                  <li className="flex items-center">
                    <Mail size={20} className="mr-3 text-orange-500" /> kontakt@jtmebel.pl
                  </li>
                  <li className="flex items-center">
                    <MapPin size={20} className="mr-3 text-orange-500" /> ul. Przykładowa 12, Polska
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-4">Szybkie linki</h4>
                <ul className="space-y-2">
                  <li>
                    <Link to="/" className="text-gray-600 hover:text-orange-500 transition-colors">
                      Strona główna
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/o-nas"
                      className="text-gray-600 hover:text-orange-500 transition-colors"
                    >
                      O nas
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-100 pt-8 text-center text-gray-500 text-sm">
              &copy; $(Get-Date -Format 'yyyy') JTMeble. Wszelkie prawa zastrzeżone. Projekt oparty
              o najnowsze technologie.
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

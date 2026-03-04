import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Armchair, ShoppingCart, Moon, Sun, Search } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import catalog from '../data/catalog.json';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { items, toggleCart } = useCartStore();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isDarkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDarkMode]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const searchResults =
    searchQuery.trim() === ''
      ? []
      : catalog.products
          .filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
          .slice(0, 5);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-2 group">
              <img src="/images/logo.png" alt="JTMeble Logo" className="h-10 w-auto object-contain transition-transform group-hover:scale-105" onError={(e) => { e.currentTarget.style.display='none'; e.currentTarget.nextElementSibling.style.display='block'; }} />
              <span style={{display: 'none'}} className="text-2xl font-black tracking-tighter text-gray-900 dark:text-white">JT<span className="text-orange-500 font-medium">Meble.</span></span>
            </Link>
          </div>

          <div className="flex-1 max-w-md px-4 sm:px-8" ref={searchRef}>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Szukaj produktów..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowResults(true);
                }}
                onFocus={() => setShowResults(true)}
                className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 border-transparent focus:bg-white dark:focus:bg-gray-900 border focus:border-orange-500 dark:text-white rounded-full text-sm outline-none transition-all shadow-sm"
              />
              {showResults && searchResults.length > 0 && (
                <div className="absolute mt-2 w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden z-50">
                  {searchResults.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => {
                        navigate(`/oferta/${product.categoryId}`);
                        setShowResults(false);
                        setSearchQuery('');
                      }}
                      className="flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer border-b border-gray-50 dark:border-gray-700 last:border-0"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-10 h-10 object-contain rounded bg-gray-50 dark:bg-gray-600 mix-blend-multiply dark:mix-blend-normal"
                        onError={(e) =>
                          (e.currentTarget.src =
                            'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80')
                        }
                      />
                      <span className="text-sm font-medium text-gray-900 dark:text-white line-clamp-1">
                        {product.name}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/oferta"
              className="text-gray-600 dark:text-gray-300 hover:text-orange-500 px-2 py-2 text-sm font-medium transition-colors"
            >
              Oferta
            </Link>
            <Link
              to="/laboratoria"
              className="text-gray-600 dark:text-gray-300 hover:text-orange-500 px-2 py-2 text-sm font-medium transition-colors whitespace-nowrap"
            >
              Laboratoria
            </Link>
            <Link
              to="/kontakt"
              className="text-gray-600 dark:text-gray-300 hover:text-orange-500 px-2 py-2 text-sm font-medium transition-colors"
            >
              Kontakt
            </Link>

            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 text-gray-500 hover:text-orange-500 transition-colors"
              title="Zmień motyw"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <button
              onClick={toggleCart}
              className="relative p-2 text-gray-700 dark:text-gray-300 hover:text-orange-500 transition-colors"
              title="Zapytanie ofertowe"
            >
              <ShoppingCart size={24} />
              {items.length > 0 && (
                <span className="absolute top-0 right-0 bg-orange-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center transform translate-x-1 -translate-y-1 shadow-sm">
                  {items.length}
                </span>
              )}
            </button>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <button onClick={toggleCart} className="relative p-2 text-gray-700 dark:text-gray-300">
              <ShoppingCart size={24} />
              {items.length > 0 && (
                <span className="absolute top-0 right-0 bg-orange-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center transform translate-x-1 -translate-y-1">
                  {items.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-600 dark:text-gray-300"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 shadow-xl">
          <div className="px-4 py-4 space-y-2">
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              Strona główna
            </Link>
            <Link
              to="/oferta"
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              Oferta
            </Link>
            <Link
              to="/laboratoria"
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              Laboratoria Przyszłości
            </Link>
            <Link
              to="/kontakt"
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              Kontakt
            </Link>
            <div className="pt-4 mt-2 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center px-3">
              <span className="text-gray-500 font-medium">Motyw</span>
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-700 dark:text-gray-300"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}



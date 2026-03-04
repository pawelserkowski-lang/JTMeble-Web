import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Armchair, FileText, ShoppingCart, Moon, Sun } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cartItems = useCartStore((state) => state.items);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDarkMode]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-gradient-to-br from-orange-400 to-orange-600 text-white p-2 rounded-xl shadow-md group-hover:shadow-orange-500/20 transition-all duration-300 group-hover:-translate-y-0.5">
                <Armchair size={22} strokeWidth={2.5} />
              </div>
              <span className="text-2xl font-black tracking-tighter text-gray-900 dark:text-white">
                JT<span className="text-orange-500 font-medium">Meble.</span>
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 px-3 py-2 text-sm font-medium transition-colors"
            >
              Strona główna
            </Link>
            <Link
              to="/o-nas"
              className="text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 px-3 py-2 text-sm font-medium transition-colors"
            >
              O nas
            </Link>
            <Link
              to="/oferta"
              className="text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 px-3 py-2 text-sm font-medium transition-colors"
            >
              Oferta
            </Link>
            <Link
              to="/kontakt"
              className="text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 px-3 py-2 text-sm font-medium transition-colors"
            >
              Kontakt
            </Link>
            <a
              href="/files/Katalog_JT_Mebel_2022.pdf"
              target="_blank"
              className="flex items-center gap-1 text-orange-600 hover:text-orange-500 px-3 py-2 text-sm font-bold transition-colors"
            >
              Katalog PDF
            </a>

            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 text-gray-500 dark:text-gray-400 hover:text-orange-500 transition-colors"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <div className="relative">
              <ShoppingCart size={24} className="text-gray-700 dark:text-gray-300" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </div>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 text-gray-500 dark:text-gray-400"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 dark:text-gray-300"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-orange-500"
            >
              Strona główna
            </Link>
            <Link
              to="/o-nas"
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-orange-500"
            >
              O nas
            </Link>
            <Link
              to="/oferta"
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-orange-500"
            >
              Oferta
            </Link>
            <Link
              to="/kontakt"
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-orange-500"
            >
              Kontakt
            </Link>
            <a
              href="/files/Katalog_JT_Mebel_2022.pdf"
              target="_blank"
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 text-base font-bold text-orange-600 hover:bg-orange-50 dark:hover:bg-gray-800"
            >
              Katalog PDF
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

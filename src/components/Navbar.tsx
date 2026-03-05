import { useState, useEffect, useRef, useMemo } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart, Moon, Sun, Search, Globe, ChevronDown, User } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { useUserStore } from '../store/useUserStore';
import catalog from '../data/catalog.json';
import scrapedData from '../data/scraped_products.json';
import { useTranslation } from 'react-i18next';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { items, toggleCart } = useCartStore();
  const { isLoggedIn } = useUserStore();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const searchRef = useRef<HTMLDivElement>(null);

  const { t, i18n } = useTranslation();

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

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'pl' ? 'en' : i18n.language === 'en' ? 'de' : 'pl';
    i18n.changeLanguage(nextLang);
  };

  const categories = useMemo(() => {
    const cats = new Set<string>();
    if (scrapedData && scrapedData.products) {
      scrapedData.products.forEach((p: any) => {
        if (p.category) cats.add(p.category);
      });
    }
    return Array.from(cats).sort();
  }, []);

  const searchResults =
    searchQuery.trim() === ''
      ? []
      : catalog.products
          .filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
          .slice(0, 5);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 dark:bg-gray-950/70 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60 border-b border-gray-200 dark:border-gray-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-2 group">
              <img
                src="/images/logo.png"
                alt="JTMeble Logo"
                className="h-10 w-auto object-contain transition-transform group-hover:scale-105"
                onError={(e) => {
                  (e.currentTarget.style as any).display = 'none';
                  (e.currentTarget.nextElementSibling as HTMLElement).style.display = 'block';
                }}
              />
              <span
                style={{ display: 'none' }}
                className="text-2xl font-black tracking-tighter text-gray-900 dark:text-white"
              >
                JT<span className="text-blue-600 font-medium">Meble.</span>
              </span>
            </Link>
          </div>

          <div className="flex-1 max-w-md px-4 sm:px-8" ref={searchRef}>
            <div className="relative hidden sm:block">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder={t('search')}
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowResults(true);
                }}
                onFocus={() => setShowResults(true)}
                className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 border-transparent focus:bg-white dark:focus:bg-gray-900 border focus:border-blue-600 dark:text-white rounded-full text-sm outline-none transition-all shadow-sm"
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
                            '/images/hero-bg-1.jpg')
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

          <div className="hidden md:flex items-center space-x-4">
            <div className="relative group">
              <Link
                to="/katalog"
                className={`flex items-center text-sm font-medium transition-colors px-2 py-6 ${isActive('/katalog') ? 'text-blue-600' : 'text-gray-600 dark:text-gray-300 hover:text-blue-600'}`}
              >
                Katalog <ChevronDown size={14} className="ml-1 group-hover:rotate-180 transition-transform duration-200" />
              </Link>
              
              {/* MegaMenu Dropdown */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-[800px] bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-2xl rounded-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50 p-6">
                <div className="grid grid-cols-3 gap-6">
                  {categories.map((cat, idx) => (
                    <Link
                      key={idx}
                      to="/katalog"
                      state={{ category: cat }}
                      className="block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group/item"
                    >
                      <span className="text-sm font-medium text-gray-900 dark:text-white group-hover/item:text-blue-600 transition-colors line-clamp-1">
                        {cat}
                      </span>
                    </Link>
                  ))}
                </div>
                <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800 text-center">
                  <Link to="/katalog" className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors">
                    Zobacz wszystkie produkty &rarr;
                  </Link>
                </div>
              </div>
            </div>

            <Link
              to="/oferta"
              className={`text-sm font-medium transition-colors px-2 py-2 ${isActive('/oferta') ? 'text-blue-600' : 'text-gray-600 dark:text-gray-300 hover:text-blue-600'}`}
            >
              {t('offer')}
            </Link>
            <Link
              to="/laboratoria"
              className={`text-sm font-medium transition-colors px-2 py-2 whitespace-nowrap ${isActive('/laboratoria') ? 'text-blue-600' : 'text-gray-600 dark:text-gray-300 hover:text-blue-600'}`}
            >
              {t('labs')}
            </Link>
            <Link
              to="/blog"
              className={`text-sm font-medium transition-colors px-2 py-2 ${isActive('/blog') ? 'text-blue-600' : 'text-gray-600 dark:text-gray-300 hover:text-blue-600'}`}
            >
              {t('blog')}
            </Link>
            <Link
              to="/kontakt"
              className={`text-sm font-medium transition-colors px-2 py-2 ${isActive('/kontakt') ? 'text-blue-600' : 'text-gray-600 dark:text-gray-300 hover:text-blue-600'}`}
            >
              {t('contact')}
            </Link>

            <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 mx-1"></div>

            <button
              onClick={toggleLanguage}
              className="p-2 text-gray-500 hover:text-blue-600 transition-colors flex items-center gap-1 font-bold text-xs uppercase"
              title="Zmień język"
            >
              <Globe size={18} /> {i18n.language}
            </button>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
              title="Zmień motyw"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <Link
              to={isLoggedIn ? '/profil' : '/login'}
              className={`p-2 transition-colors ${isLoggedIn ? 'text-blue-600' : 'text-gray-500 hover:text-blue-600'}`}
              title="Panel B2B"
            >
              <User size={24} />
            </Link>
            <button
              onClick={toggleCart}
              className="relative p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors"
              title="Zapytanie ofertowe"
            >
              <ShoppingCart size={24} />
              {items.length > 0 && (
                <span className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center transform translate-x-1 -translate-y-1 shadow-sm">
                  {items.length}
                </span>
              )}
            </button>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleLanguage}
              className="p-2 text-gray-500 font-bold text-xs uppercase"
            >
              {i18n.language}
            </button>
            <button onClick={toggleCart} className="relative p-2 text-gray-700 dark:text-gray-300">
              <ShoppingCart size={24} />
              {items.length > 0 && (
                <span className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center transform translate-x-1 -translate-y-1">
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
              {t('home')}
            </Link>
            <Link
              to="/oferta"
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              {t('offer')}
            </Link>
            <Link
              to="/laboratoria"
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              {t('labs')}
            </Link>
            <Link
              to="/blog"
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              {t('blog')}
            </Link>
            <Link
              to="/kontakt"
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              {t('contact')}
            </Link>
            <Link
              to={isLoggedIn ? '/profil' : '/login'}
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              Panel B2B
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

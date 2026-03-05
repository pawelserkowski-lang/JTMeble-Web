import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import PageWrapper from '../components/PageWrapper';
import scrapedData from '../data/scraped_products.json';

const ITEMS_PER_PAGE = 24;

export default function Catalog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = useMemo(() => {
    const cats = new Set<string>();
    scrapedData.products.forEach(p => {
      if (p.category) cats.add(p.category);
    });
    return Array.from(cats).sort();
  }, []);

  const filteredProducts = useMemo(() => {
    return scrapedData.products.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory ? p.category === selectedCategory : true;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <PageWrapper>
      <Helmet>
        <title>Katalog Produktów | JTMeble</title>
        <meta name="description" content="Pełen katalog produktów JTMeble - meble szkolne, przedszkolne i biurowe." />
      </Helmet>

      <div className="pt-24 pb-16 bg-gray-50 dark:bg-gray-950 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Katalog Produktów</h1>
            
            <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
              <div className="relative w-full md:max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Szukaj produktów..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all shadow-sm"
                />
              </div>

              <select
                value={selectedCategory || ''}
                onChange={(e) => {
                  setSelectedCategory(e.target.value || null);
                  setCurrentPage(1);
                }}
                className="w-full md:w-auto px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none shadow-sm"
              >
                <option value="">Wszystkie kategorie</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {paginatedProducts.map((product, idx) => (
              <motion.div
                key={`${product.name}-${idx}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: idx * 0.05 }}
                className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 group hover:shadow-md transition-shadow"
              >
                <div className="aspect-square relative p-4 bg-white flex items-center justify-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/hero-bg-1.jpg';
                    }}
                  />
                </div>
                <div className="p-4">
                  <p className="text-xs font-semibold text-blue-600 mb-1 uppercase tracking-wider line-clamp-1">{product.category}</p>
                  <h3 className="font-bold text-gray-900 dark:text-white line-clamp-2 mb-2" title={product.name}>
                    {product.name}
                  </h3>
                  {product.price && (
                    <p className="font-medium text-gray-900 dark:text-gray-100">{product.price}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20 text-gray-500 dark:text-gray-400">
              Nie znaleziono produktów spełniających kryteria.
            </div>
          )}

          {totalPages > 1 && (
            <div className="mt-12 flex justify-center items-center gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-gray-200 dark:border-gray-800 disabled:opacity-50 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <ChevronLeft size={20} className="text-gray-600 dark:text-gray-300" />
              </button>
              
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum = i + 1;
                  if (totalPages > 5) {
                    if (currentPage > 3) pageNum = currentPage - 2 + i;
                    if (currentPage > totalPages - 2) pageNum = totalPages - 4 + i;
                  }
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                        currentPage === pageNum
                          ? 'bg-blue-600 text-white'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-gray-200 dark:border-gray-800 disabled:opacity-50 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <ChevronRight size={20} className="text-gray-600 dark:text-gray-300" />
              </button>
            </div>
          )}
        </div>
      </div>
    </PageWrapper>
  );
}

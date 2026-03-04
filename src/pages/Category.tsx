import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ChevronLeft, ShoppingCart, Check } from 'lucide-react';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import PageWrapper from '../components/PageWrapper';
import catalog from '../data/catalog.json';
import { useCartStore, type Product } from '../store/useCartStore';

export default function Category() {
  const { slug } = useParams();
  const category = catalog.categories.find((c) => c.slug === slug);
  const products = catalog.products.filter((p) => p.categoryId === slug);
  const addItem = useCartStore((state) => state.addItem);
  const cartItems = useCartStore((state) => state.items);
  const [addedItems, setAddedItems] = useState<Record<number, boolean>>({});

  const handleAdd = (product: Product) => {
    if (!cartItems.find((i) => i.id === product.id)) {
      addItem(product);
      setAddedItems({ ...addedItems, [product.id]: true });
      setTimeout(() => setAddedItems((prev) => ({ ...prev, [product.id]: false })), 2000);
    }
  };

  if (!category) {
    return (
      <div className="pt-32 text-center min-h-screen dark:bg-gray-950 dark:text-white">
        <h1 className="text-3xl font-bold">Kategoria nie znaleziona</h1>
        <Link to="/oferta" className="text-orange-500 mt-4 inline-block hover:underline">
          Wróć do oferty
        </Link>
      </div>
    );
  }

  return (
    <PageWrapper>
      <Helmet>
        <title>{category.title} - JTMeble</title>
      </Helmet>
      <div className="pt-24 pb-16 bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/oferta"
          className="inline-flex items-center text-gray-500 dark:text-gray-400 hover:text-orange-500 mb-8 transition-colors"
        >
          <ChevronLeft size={20} className="mr-1" /> Wróć do pełnej oferty
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm overflow-hidden border border-gray-100 dark:border-gray-800">
            <div className="h-48 md:h-64 bg-gray-200 relative">
              <img
                src={category.image}
                alt={category.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <h1 className="text-4xl md:text-5xl font-bold text-white text-center px-4 drop-shadow-lg">
                  {category.title}
                </h1>
              </div>
            </div>

            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                Produkty w tej kategorii ({products.length})
              </h2>

              {products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {products.map((product) => (
                    <motion.div
                      key={product.id}
                      whileHover={{ y: -5 }}
                      className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col"
                    >
                      <div className="h-48 bg-gray-100 dark:bg-gray-700 p-4 flex items-center justify-center">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="max-h-full object-contain mix-blend-multiply dark:mix-blend-normal"
                          onError={(e) =>
                            (e.currentTarget.src =
                              'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80')
                          }
                        />
                      </div>
                      <div className="p-4 flex flex-col flex-grow">
                        <h3 className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-2 mb-2 flex-grow">
                          {product.name}
                        </h3>
                        <div className="flex items-center justify-between mt-4">
                          <span className="text-orange-500 font-bold">{product.price} PLN</span>
                          <button
                            onClick={() => handleAdd(product)}
                            className={`p-2 rounded-lg transition-colors ${addedItems[product.id] || cartItems.find((i) => i.id === product.id) ? 'bg-green-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-orange-500 hover:text-white'}`}
                            title="Dodaj do zapytania"
                          >
                            {addedItems[product.id] ||
                            cartItems.find((i) => i.id === product.id) ? (
                              <Check size={18} />
                            ) : (
                              <ShoppingCart size={18} />
                            )}
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-center py-12">
                  Brak produktów w tej kategorii do wyświetlenia. Skontaktuj się z nami po więcej
                  szczegółów.
                </p>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
      </PageWrapper>
  );
}
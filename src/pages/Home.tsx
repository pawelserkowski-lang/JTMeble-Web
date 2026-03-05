import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import PageWrapper from '../components/PageWrapper';
import ProductModal from '../components/ProductModal';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import scrapedData from '../data/scraped_products.json';

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<{ product: any, idx: number } | null>(null);

  return (
    <PageWrapper>
      <Helmet>
        <title>JT Mebel - Producent Mebli Szkolnych, Biurowych i Przedszkolnych</title>
        <meta name="description" content="Firma specjalizuje się w seryjnej produkcji mebli szkolnych, krzeseł, stołów, biurek i regałów. Wyposażenie klas, szatni dla szkół i przedszkoli." />
        <meta property="og:title" content="JT Mebel - Producent Mebli Szkolnych, Biurowych i Przedszkolnych" />
        <meta property="og:description" content="Firma specjalizuje się w seryjnej produkcji mebli szkolnych, krzeseł, stołów, biurek i regałów. Wyposażenie klas, szatni dla szkół i przedszkoli." />
      </Helmet>
<div className="page-content">
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-white">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero-bg-new-main.jpg"
            alt="Nowoczesne meble"
            className="w-full h-full object-cover opacity-90"
            onError={(e) => {
              e.currentTarget.src =
                '/images/hero-bg-new-main.jpg';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/70 via-blue-800/50 to-white backdrop-blur-[1px]" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight drop-shadow-lg"
          >
            JT Mebel -{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-100 to-white">
              Producent Mebli
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 text-xl sm:text-2xl text-blue-50 max-w-3xl mx-auto font-light drop-shadow-md"
          >
            Firma specjalizuje się przede wszystkim w produkcji seryjnej mebli szkolnych, krzeseł, stołów, biurek, regałów. Kompleksowe wyposażenie instytucji.
          </motion.p>
        </div>
      </section>

      <section className="py-24 bg-white dark:bg-slate-900 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
              Nasze Specjalizacje
            </h2>
            <div className="mt-4 w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'Szkoły',
                subtitle: 'Kompleksowe wyposażenie sal lekcyjnych',
                img: '/images/hero-bg-2.jpg',
                link: '/katalog?kategoria=Biurka i stoły',
                fallback:
                  '/images/hero-bg-2.jpg',
              },
              {
                title: 'Przedszkola',
                subtitle: 'Bezpieczne meble dla najmłodszych',
                img: '/images/hero-bg-3.jpg',
                link: '/katalog?kategoria=Kolekcja Mini',
                fallback:
                  '/images/hero-bg-3.jpg',
              },
              {
                title: 'Uczelnie',
                subtitle: 'Nowoczesne rozwiązania edukacyjne',
                img: '/images/product-1.jpg',
                link: '/katalog?kategoria=Elektronika i Edukacja',
                fallback:
                  '/images/product-1.jpg',
              },
              {
                title: 'Instytucje',
                subtitle: 'Meble biurowe i specjalistyczne',
                img: '/images/hero-bg-1.jpg',
                link: '/katalog?kategoria=Krzesła i fotele',
                fallback:
                  '/images/hero-bg-1.jpg',
              },
            ].map((item, idx) => (
              <Link to={item.link} key={idx} className="block">
                <motion.div
                  whileHover={{ y: -10 }}
                  className="group relative rounded-[2rem] overflow-hidden shadow-xl shadow-blue-900/5 cursor-pointer h-96 border border-blue-50 dark:border-slate-800"
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = item.fallback;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-900/30 to-transparent flex flex-col justify-end p-8">
                    <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-sm text-blue-100">{item.subtitle}</p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recommended Products Slider */}
      <section className="py-24 bg-blue-50/50 dark:bg-slate-800 border-y border-blue-100 dark:border-slate-700 transition-colors overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
                Polecane produkty
              </h2>
              <div className="mt-4 w-24 h-1 bg-blue-600 rounded-full"></div>
            </div>
            <Link to="/katalog" className="hidden sm:flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors">
              Zobacz cały katalog <ChevronRight size={20} className="ml-1" />
            </Link>
          </div>
          
          <div className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory hide-scrollbar">
            {(scrapedData.products || []).slice(0, 8).map((product, idx) => (
              <motion.div
                key={`${product.name}-${idx}`}
                whileHover={{ y: -5 }}
                className="snap-start flex-none w-[280px] bg-white dark:bg-slate-900 rounded-2xl shadow-md hover:shadow-xl hover:shadow-blue-900/5 border border-blue-50 dark:border-slate-700 overflow-hidden group cursor-pointer transition-all"
                onClick={() => setSelectedProduct({ product, idx })}
              >
                <div className="aspect-square relative p-6 bg-white flex items-center justify-center">
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
                <div className="p-5">
                  <p className="text-xs font-semibold text-blue-500 mb-1 uppercase tracking-wider line-clamp-1">{product.category}</p>
                  <h3 className="font-bold text-slate-900 dark:text-white line-clamp-2 mb-2" title={product.name}>
                    {product.name}
                  </h3>
                  {product.price && (
                    <p className="font-medium text-blue-700 dark:text-blue-400">{product.price}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-4 text-center sm:hidden">
            <Link to="/katalog" className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors">
              Zobacz cały katalog <ChevronRight size={20} className="ml-1" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {[
              { number: '15+', label: 'Lat doświadczenia' },
              { number: '2000+', label: 'Zrealizowanych projektów' },
              { number: '100%', label: 'Gwarancja jakości' },
              { number: 'Zadowoleni', label: 'Klienci w całej Polsce' },
            ].map((stat, idx) => (
              <div key={idx} className="p-6">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2 drop-shadow-md">
                  {stat.number}
                </div>
                <div className="text-blue-100 font-medium uppercase tracking-wider text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal Produktu */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductModal
            product={selectedProduct.product}
            idx={selectedProduct.idx}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </AnimatePresence>
    </div>
</PageWrapper>
  );
}
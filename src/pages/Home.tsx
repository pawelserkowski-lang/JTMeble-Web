import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import PageWrapper from '../components/PageWrapper';
import { Star, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import scrapedData from '../data/scraped_products.json';

export default function Home() {
  const testimonials = [
    {
      name: 'Dyrektor SP nr 4',
      text: 'Znakomite meble, które przetrwają lata. Dzieci są zachwycone kolorami, a nauczyciele ergonomią.',
    },
    {
      name: 'Przedszkole "Słoneczko"',
      text: 'Zamówiliśmy pełne wyposażenie szatni. Świetny kontakt, szybka realizacja i najwyższa jakość.',
    },
    {
      name: 'Firma IT',
      text: 'Biurka z regulacją wysokości od JTMeble to strzał w dziesiątkę. Nasi pracownicy chwalą sobie wygodę.',
    },
  ];

  return (
    <PageWrapper>
      <Helmet>
        <title>JTMeble - Nowoczesne meble szkolne, biurowe i przedszkolne</title>
        <meta name="description" content="Meble na wymiar najwyższej jakości. Od projektu po montaż. Zadbamy o każdy detal w Twoim domu i biurze." />
        <meta property="og:title" content="JTMeble - Nowoczesne meble szkolne, biurowe i przedszkolne" />
        <meta property="og:description" content="Meble na wymiar najwyższej jakości. Od projektu po montaż. Zadbamy o każdy detal w Twoim domu i biurze." />
      </Helmet>
<div className="page-content">
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero-bg-1.jpg"
            alt="Nowoczesne meble"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src =
                '/images/hero-bg-1.jpg';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80 backdrop-blur-[2px]" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight"
          >
            Tworzymy{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-amber-300">
              przestrzeń
            </span>{' '}
            Twoich marzeń
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 text-xl sm:text-2xl text-gray-200 max-w-3xl mx-auto font-light"
          >
            Meble na wymiar najwyższej jakości. Od projektu po montaż. Zadbamy o każdy detal w Twoim
            domu i biurze.
          </motion.p>
        </div>
      </section>

      <section className="py-24 bg-white dark:bg-gray-950 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
              Nasze Specjalizacje
            </h2>
            <div className="mt-4 w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Kuchnie na wymiar',
                img: '/images/hero-bg-2.jpg',
                fallback:
                  '/images/hero-bg-2.jpg',
              },
              {
                title: 'Szafy i Garderoby',
                img: '/images/hero-bg-3.jpg',
                fallback:
                  '/images/hero-bg-3.jpg',
              },
              {
                title: 'Meble Biurowe',
                img: '/images/product-1.jpg',
                fallback:
                  '/images/product-1.jpg',
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -10 }}
                className="group relative rounded-[2rem] overflow-hidden shadow-2xl shadow-blue-900/10 cursor-pointer h-96"
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => {
                    e.currentTarget.src = item.fallback;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8">
                  <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recommended Products Slider */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900 border-y border-gray-100 dark:border-gray-800 transition-colors overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
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
                className="snap-start flex-none w-[280px] bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden group cursor-pointer"
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
          <div className="mt-4 text-center sm:hidden">
            <Link to="/katalog" className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors">
              Zobacz cały katalog <ChevronRight size={20} className="ml-1" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {[
              { number: '15+', label: 'Lat doświadczenia' },
              { number: '2000+', label: 'Zrealizowanych projektów' },
              { number: '100%', label: 'Gwarancja jakości' },
              { number: 'Zadowoleni', label: 'Klienci w całej Polsce' },
            ].map((stat, idx) => (
              <div key={idx} className="p-6">
                <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-400 font-medium uppercase tracking-wider text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
</PageWrapper>
  );
}

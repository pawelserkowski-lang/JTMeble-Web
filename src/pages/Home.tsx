import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import PageWrapper from '../components/PageWrapper';
import { Star } from 'lucide-react';

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
                'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80';
            }}
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight"
          >
            Tworzymy{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">
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
            <div className="mt-4 w-24 h-1 bg-orange-500 mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Kuchnie na wymiar',
                img: '/images/hero-bg-2.jpg',
                fallback:
                  'https://images.unsplash.com/photo-1556910103-1c02745a872f?auto=format&fit=crop&q=80',
              },
              {
                title: 'Szafy i Garderoby',
                img: '/images/hero-bg-3.jpg',
                fallback:
                  'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&q=80',
              },
              {
                title: 'Meble Biurowe',
                img: '/images/product-1.jpg',
                fallback:
                  'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80',
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -10 }}
                className="group relative rounded-2xl overflow-hidden shadow-lg cursor-pointer h-96"
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

      {/* Opinions Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900 border-y border-gray-100 dark:border-gray-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
              Opinie naszych klientów
            </h2>
            <div className="mt-4 w-24 h-1 bg-orange-500 mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700"
              >
                <div className="flex text-orange-400 mb-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} size={18} fill="currentColor" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 italic mb-6">"{t.text}"</p>
                <div className="font-bold text-gray-900 dark:text-white">{t.name}</div>
              </div>
            ))}
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
                <div className="text-4xl md:text-5xl font-bold text-orange-500 mb-2">
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

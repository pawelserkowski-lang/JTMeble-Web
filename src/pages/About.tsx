import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import PageWrapper from '../components/PageWrapper';

export default function About() {
  return (
    <PageWrapper>
      <Helmet>
        <title>O nas - JT Mebel</title>
        <meta name="description" content="Poznaj historię firmy JT Mebel. Od lat zajmujemy się produkcją certyfikowanych mebli dla szkół, przedszkoli i instytucji." />
        <meta property="og:title" content="O nas - JT Mebel" />
        <meta property="og:description" content="Poznaj historię firmy JT Mebel. Od lat zajmujemy się produkcją certyfikowanych mebli dla szkół, przedszkoli i instytucji." />
      </Helmet>
<div className="page-content">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-6">O nas</h1>
          <div className="w-24 h-1 bg-blue-600 rounded-full mb-10"></div>

          <div className="prose prose-lg text-gray-600">
            <p className="lead text-xl">
              JT Mebel to firma z wieloletnią tradycją, która od wielu lat specjalizuje się w seryjnej produkcji
              mebli dla placówek edukacyjnych i instytucji.
            </p>
            <p>
              Nasza historia to ciągły rozwój i dążenie do doskonałości. Wyposażyliśmy w nasze certyfikowane 
              meble tysiące sal lekcyjnych, przedszkoli i biur. Kładziemy ogromny nacisk na ergonomię, 
              bezpieczeństwo użytkowania oraz wytrzymałość naszych wyrobów, aby służyły przez wiele lat.
            </p>
            <p>
              Oferujemy kompleksowe usługi – od doradztwa i projektu, po produkcję i dostawę własnym transportem. 
              Posiadamy nowoczesny park maszynowy, który gwarantuje najwyższą jakość wykonania.
            </p>
            <div className="mt-10 rounded-2xl overflow-hidden shadow-lg h-80">
              <img
                src="/images/hero-bg-4.jpg"
                alt="Nasz warsztat"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src =
                    '/images/hero-bg-7.jpg';
                }}
              />
            </div>
          </div>

          <div className="mt-20 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Nasze realizacje</h2>
            <div className="w-16 h-1 bg-blue-600 rounded-full mb-8"></div>
            <p className="text-gray-600 dark:text-gray-400 mb-10 text-lg">
              Zobacz wybrane realizacje dla szkół i przedszkoli na terenie Kaszub i całego Pomorza.
              Dzięki własnej flocie transportowej i doświadczonej ekipie montażowej, dostarczamy i skręcamy meble prosto w docelowych salach lekcyjnych.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { img: '/images/hero-bg-1.jpg', title: 'Szkoła Podstawowa w Kartuzach' },
                { img: '/images/hero-bg-2.jpg', title: 'Kompleks przedszkolny na Kaszubach' },
                { img: '/images/hero-bg-3.jpg', title: 'Nowoczesna sala w Gdańsku' },
                { img: '/images/hero-bg-5.jpg', title: 'Biblioteka szkolna' },
                { img: '/images/hero-bg-6.jpg', title: 'Wielofunkcyjna szatnia uczniowska' },
                { img: '/images/product-2.jpg', title: 'Gabinety administracyjne' }
              ].map((item, idx) => (
                <motion.div 
                  key={idx} 
                  whileHover={{ scale: 1.03 }}
                  className="relative h-64 rounded-xl overflow-hidden shadow-sm group border border-gray-100 dark:border-gray-800"
                >
                  <img 
                    src={item.img} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    onError={(e) => { e.currentTarget.src = '/images/hero-bg-1.jpg'; }} 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-5">
                    <h3 className="text-white font-semibold text-lg drop-shadow-md">{item.title}</h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </motion.div>
      </div>
    </div>
</PageWrapper>
  );
}

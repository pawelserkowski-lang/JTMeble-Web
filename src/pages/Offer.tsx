import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import PageWrapper from '../components/PageWrapper';
import { Link } from 'react-router-dom';
import catalog from '../data/catalog.json';

export default function Offer() {
  return (
    <PageWrapper>
      <Helmet>
        <title>Pełna Oferta - JTMeble</title>
        <meta name="description" content="Zobacz pełną ofertę ponad 1100 mebli: od biurek, przez szafki, aż po meble dla przedszkoli i szkół." />
        <meta property="og:title" content="Pełna Oferta - JTMeble" />
        <meta property="og:description" content="Zobacz pełną ofertę ponad 1100 mebli: od biurek, przez szafki, aż po meble dla przedszkoli i szkół." />
      </Helmet>
<div className="page-content">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Pełna oferta i kategorie</h1>
          <div className="w-24 h-1 bg-orange-500 rounded-full mb-10"></div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {catalog.categories.map((category) => (
              <Link to={`/oferta/${category.slug}`} key={category.id}>
                <motion.div
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-gray-50 border border-gray-100 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-all cursor-pointer h-full flex flex-col items-center justify-center group"
                >
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm group-hover:bg-orange-50 transition-colors">
                    <span className="text-orange-500 font-bold">{category.title.charAt(0)}</span>
                  </div>
                  <h3 className="font-semibold text-gray-800 text-sm">{category.title}</h3>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
</PageWrapper>
  );
}

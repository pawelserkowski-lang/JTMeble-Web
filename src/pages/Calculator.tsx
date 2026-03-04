import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import PageWrapper from '../components/PageWrapper';
import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import PageWrapper from '../components/PageWrapper';
import { Calculator as CalcIcon } from 'lucide-react';

export default function Calculator() {
  const [area, setArea] = useState<number | ''>('');

  // Szacunki: 1 biurko z fotelem i szafką potrzebuje ok. 6 m2
  const desks = area ? Math.floor(Number(area) / 6) : 0;
  const cabinets = area ? Math.floor(Number(area) / 10) : 0;

  return (
    <PageWrapper>
      <Helmet>
        <title>Kalkulator Powierzchni - JTMeble</title>
        <meta name="description" content="Oszacuj, ile stanowisk pracy zmieści się w Twoim nowym biurze z naszym kalkulatorem." />
        <meta property="og:title" content="Kalkulator Powierzchni - JTMeble" />
        <meta property="og:description" content="Oszacuj, ile stanowisk pracy zmieści się w Twoim nowym biurze z naszym kalkulatorem." />
      </Helmet>
<div className="page-content">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-orange-500 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <CalcIcon size={32} />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Kalkulator Powierzchni Biurowej
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Oszacuj, ile stanowisk pracy zmieści się w Twoim nowym biurze.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 dark:border-gray-800">
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Powierzchnia biura (w metrach kwadratowych)
              </label>
              <input
                type="number"
                value={area}
                onChange={(e) => setArea(Number(e.target.value))}
                placeholder="np. 50"
                className="w-full px-4 py-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-lg focus:ring-2 focus:ring-orange-500 outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-orange-50 dark:bg-orange-500/10 p-6 rounded-2xl border border-orange-100 dark:border-orange-500/20 text-center">
                <span className="block text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                  {desks}
                </span>
                <span className="text-sm font-medium text-orange-800 dark:text-orange-300">
                  Stanowisk pracy
                  <br />
                  (Biurko + Fotel)
                </span>
              </div>
              <div className="bg-blue-50 dark:bg-blue-500/10 p-6 rounded-2xl border border-blue-100 dark:border-blue-500/20 text-center">
                <span className="block text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {cabinets}
                </span>
                <span className="text-sm font-medium text-blue-800 dark:text-blue-300">
                  Regałów i szaf
                  <br />
                  aktowych
                </span>
              </div>
            </div>

            <p className="mt-8 text-xs text-gray-500 dark:text-gray-400 text-center">
              * Powyższe wyliczenia są orientacyjne i zakładają optymalny rozkład przestrzeni oraz
              ciągów komunikacyjnych (ok. 6m² na osobę).
            </p>
          </div>
        </motion.div>
      </div>
    </div>
</PageWrapper>
  );
}

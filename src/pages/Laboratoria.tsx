import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import PageWrapper from '../components/PageWrapper';
import { Lightbulb, Code, BookOpen, Monitor } from 'lucide-react';

export default function Laboratoria() {
  const labs = [
    {
      title: 'Pracownia Druku 3D',
      icon: <Monitor size={32} />,
      desc: 'Kompleksowe wyposażenie w drukarki 3D, filamenty oraz stacje robocze.',
      color: 'bg-blue-500',
    },
    {
      title: 'Robotyka i Kodowanie',
      icon: <Code size={32} />,
      desc: 'Zestawy edukacyjne z robotami i mikrokontrolerami dla wszystkich klas.',
      color: 'bg-green-500',
    },
    {
      title: 'Pracownia Audio-Wideo',
      icon: <BookOpen size={32} />,
      desc: 'Sprzęt do nagrywania, zielone ekrany, mikrofony i oświetlenie.',
      color: 'bg-purple-500',
    },
    {
      title: 'Stacje Lutownicze',
      icon: <Lightbulb size={32} />,
      desc: 'Bezpieczne stacje lutownicze i akcesoria do elektroniki.',
      color: 'bg-orange-500',
    },
  ];

  return (
    <PageWrapper>
      <Helmet>
        <title>Laboratoria Przyszłości - JTMeble</title>
        <meta name="description" content="Zrealizuj z nami program Laboratoria Przyszłości. Dostarczamy sprzęt do druku 3D, robotyki i multimediów." />
        <meta property="og:title" content="Laboratoria Przyszłości - JTMeble" />
        <meta property="og:description" content="Zrealizuj z nami program Laboratoria Przyszłości. Dostarczamy sprzęt do druku 3D, robotyki i multimediów." />
      </Helmet>
<div className="page-content">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Laboratoria Przyszłości
          </h1>
          <div className="w-24 h-1 bg-orange-500 rounded-full mb-10"></div>

          <div className="mb-16">
            <div className="bg-gray-50 dark:bg-gray-900 rounded-3xl p-8 md:p-12 border border-gray-100 dark:border-gray-800 text-center shadow-sm">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Tworzymy nowoczesne pracownie
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
                Wspieramy szkoły w ramach rządowego programu "Laboratoria Przyszłości". Dostarczamy
                najnowocześniejszy sprzęt, meble oraz gotowe koncepcje pracowni, które inspirują
                uczniów do odkrywania nowych technologii.
              </p>
              <img
                src="/images/projektor-laserowy-epson-eb-720.jpg"
                alt="Laboratorium"
                className="w-full h-80 object-cover rounded-2xl shadow-md mix-blend-multiply dark:mix-blend-normal bg-white"
                onError={(e) => {
                  e.currentTarget.src =
                    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80';
                }}
              />
            </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            Nasze rozwiązania
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {labs.map((lab, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-8 rounded-2xl shadow-sm hover:shadow-md transition-all text-center"
              >
                <div
                  className={`w-16 h-16 ${lab.color} text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}
                >
                  {lab.icon}
                </div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {lab.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {lab.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
</PageWrapper>
  );
}

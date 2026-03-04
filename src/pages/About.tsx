import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import PageWrapper from '../components/PageWrapper';

export default function About() {
  return (
    <PageWrapper>
      <Helmet>
        <title>O nas - JTMeble</title>
        <meta name="description" content="Poznaj historię firmy JTMeble. Od ponad dekady zajmujemy się produkcją certyfikowanych mebli dla szkół i przedszkoli." />
        <meta property="og:title" content="O nas - JTMeble" />
        <meta property="og:description" content="Poznaj historię firmy JTMeble. Od ponad dekady zajmujemy się produkcją certyfikowanych mebli dla szkół i przedszkoli." />
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
              JTMeble to firma z wieloletnią tradycją, która od ponad dekady zajmuje się tworzeniem
              mebli na wymiar dla domów i biur.
            </p>
            <p>
              Nasza historia zaczęła się z pasji do drewna i chęci tworzenia rozwiązań, które łączą
              w sobie doskonały design, najwyższą jakość wykonania oraz pełną funkcjonalność.
              Projektując meble, nieustannie śledzimy najnowsze trendy oraz innowacyjne rozwiązania
              technologiczne, aby dostarczać naszym klientom produkty, które spełniają ich najwyższe
              oczekiwania.
            </p>
            <p>
              Oferujemy kompleksowe usługi – od pierwszych pomiarów i projektowania, po precyzyjną
              produkcję i profesjonalny montaż u klienta. Nasz zespół składa się z doświadczonych
              projektantów i stolarzy, którzy każdemu projektowi poświęcają maksimum uwagi.
            </p>
            <div className="mt-10 rounded-2xl overflow-hidden shadow-lg h-80">
              <img
                src="/images/hero-bg-4.jpg"
                alt="Nasz warsztat"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src =
                    'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80';
                }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
</PageWrapper>
  );
}

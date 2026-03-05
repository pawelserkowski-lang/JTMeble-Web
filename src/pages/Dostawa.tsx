import { Helmet } from 'react-helmet-async';
import PageWrapper from '../components/PageWrapper';
import { motion } from 'motion/react';

export default function Dostawa() {
  return (
    <PageWrapper>
      <Helmet>
        <title>Dostawa - JT Mebel</title>
        <meta name="description" content="Informacje o kosztach i terminach wysyłki mebli szkolnych i biurowych JT Mebel." />
      </Helmet>
      <div className="pt-24 pb-16 min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Koszty i termin wysyłki</h1>
            <div className="w-24 h-1 bg-blue-600 rounded-full mb-10"></div>
            <div className="prose prose-lg dark:prose-invert text-gray-600 dark:text-gray-300">
              <p>Towar wysyłany jest pod adres wskazany w formularzu zamówienia lub podany telefonicznie albo drogą mailową. Sklep poinformuje Klienta niezwłocznie o nieprawidłowo wypełnionym formularzu zamówienia, który uniemożliwia dokonanie wysyłki lub może ją opóźnić.</p>
              
              <p>Towar jest dostarczany własnym transportem lub za pomocą wyspecjalizowanych firm kurierskich. W niektórych przypadkach istnieje możliwość odbioru osobistego towarów w siedzibie sprzedającego.</p>

              <p>Realizacja zamówienia trwa do 28 dni od dnia otrzymania zamówienia. Jednakże w przypadku dużej ilości zamówień, termin ten może ulec wydłużeniu. Wszelkie dosyłki brakujących towarów z pierwotnego zamówienia, odbywają się na koszt naszej firmy.</p>

              <p>Klient jest obciążany kosztami dostawy (wysyłki) w wysokości <strong>200 zł netto do każdego punktu dostawy</strong>. Powyższa opłata jest stała i niezależna od wartości zamówienia.</p>

              <p>Podane wyżej koszty dotyczą dostaw na terenie całego kraju dla jednego adresu / punktu dostawy.</p>

              <p>Cena transportu nie obejmuje rozładunku, wniesienia towaru, rozpakowania oraz ewentualnego montażu zakupionych produktów. Istnieje możliwość zamówienia rozładunku, wniesienia oraz montażu za dodatkową opłatą (koszt ustalany jest indywidualnie na podstawie wielkości zamówienia).</p>
            </div>
          </motion.div>
        </div>
      </div>
    </PageWrapper>
  );
}
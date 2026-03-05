import { Helmet } from 'react-helmet-async';
import PageWrapper from '../components/PageWrapper';
import { motion } from 'motion/react';

export default function Platnosci() {
  return (
    <PageWrapper>
      <Helmet>
        <title>Płatności - JT Mebel</title>
        <meta name="description" content="Warunki płatności, numery kont bankowych dla JT Mebel." />
      </Helmet>
      <div className="pt-24 pb-16 min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Warunki płatności</h1>
            <div className="w-24 h-1 bg-blue-600 rounded-full mb-10"></div>
            <div className="prose prose-lg dark:prose-invert text-gray-600 dark:text-gray-300">
              <p>Podstawową formą płatności jest przedpłata na podstawie faktury proforma na rachunek bankowy Sprzedawcy. Sprzedający i Kupujący mogą w drodze indywidualnych ustaleń ustalić odmienne warunki lub terminy płatności, które określone są na fakturze.</p>
              
              <p>W razie nieuiszczenia płatności przez Kupującego w ciągu 14 dni od złożenia zamówienia przez Kupującego, zamówienie jest anulowane. Do każdego zamówienia zostaje wystawiona faktura VAT.</p>

              <h3>Dostępne formy płatności:</h3>
              <ul>
                <li>Przelewy24</li>
                <li>BLIK</li>
                <li>Karta płatnicza</li>
                <li>PayPo</li>
                <li>Przelew tradycyjny</li>
              </ul>

              <h3>Dane do przelewu bankowego</h3>
              <p>
                <strong>JT Mebel Sp. z o.o.</strong><br/>
                Numer konta bankowego:<br/>
                <span className="font-mono text-xl">96 8324 0001 0000 0387 2000 0010</span><br/>
                (BS Sierakowice)
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </PageWrapper>
  );
}
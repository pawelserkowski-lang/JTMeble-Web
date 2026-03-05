import { Helmet } from 'react-helmet-async';
import PageWrapper from '../components/PageWrapper';
import { motion } from 'motion/react';

export default function ZwrotyIReklamacje() {
  return (
    <PageWrapper>
      <Helmet>
        <title>Zwroty i Reklamacje - JT Mebel</title>
        <meta name="description" content="Informacje dotyczące zwrotu towarów oraz zgłaszania reklamacji w JT Mebel." />
      </Helmet>
      <div className="pt-24 pb-16 min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Zwroty i Reklamacje</h1>
            <div className="w-24 h-1 bg-blue-600 rounded-full mb-10"></div>
            <div className="prose prose-lg dark:prose-invert text-gray-600 dark:text-gray-300">
              
              <h2>Zwrot towaru</h2>
              <p>Aby zwrócić zakupiony produkt prosimy o skorzystanie z przygotowanego formularza. Wypełniony formularz zgłoszenia zwrotu należy przesłać na maila: <strong>biuro@jtmebel.pl</strong>.</p>
              <p>Konsument może odstąpić od umowy sprzedaży towarów bez podania przyczyny, składając stosowne oświadczenie na piśmie w terminie 14 dni, licząc od dnia wydania towaru.</p>

              <h2>Reklamacje</h2>
              <p>Produkty sprzedawane są fabrycznie nowe i najwyższej jakości, posiadają gwarancję producenta, importera lub sprzedawcy, obowiązujące na terenie Polski. Na towary sprzedawane przez Usługodawcę udzielamy 2-letniej gwarancji.</p>
              
              <p>Aby zareklamować zakupiony produkt prosimy o kontakt. Wypełniony formularz zgłoszenia reklamacyjnego należy przesłać na maila: <strong>biuro@jtmebel.pl</strong>.</p>
              
              <p>Składając reklamację należy dostarczyć do sprzedającego dowód zakupu oraz szczegółowy opis przedmiotu reklamacji.</p>
              
              <p>Reklamacje rozpatrywane będą niezwłocznie, jednak nie później niż w ciągu 14 dni (lub w określonych przypadkach 30 dni) licząc od dnia zgłoszenia. W przypadku rozpatrzenia reklamacji na korzyść Klienta usługodawca naprawi lub wymieni reklamowany towar na nowy, pełnowartościowy lub zwróci wartość kupionego towaru.</p>
              
            </div>
          </motion.div>
        </div>
      </div>
    </PageWrapper>
  );
}
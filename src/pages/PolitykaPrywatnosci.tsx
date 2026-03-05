import { Helmet } from 'react-helmet-async';
import PageWrapper from '../components/PageWrapper';
import { motion } from 'motion/react';

export default function PolitykaPrywatnosci() {
  return (
    <PageWrapper>
      <Helmet>
        <title>Polityka prywatności - JT Mebel</title>
        <meta name="description" content="Polityka prywatności sklepu internetowego JTMebel." />
      </Helmet>
      <div className="pt-24 pb-16 min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Polityka Prywatności</h1>
            <div className="w-24 h-1 bg-blue-600 rounded-full mb-10"></div>
            <div className="prose prose-lg dark:prose-invert text-gray-600 dark:text-gray-300">
              
              <p>Polityka prywatności obowiązująca w JT Mebel sp. z o.o. z siedzibą w Kartuzach.</p>

              <h3>Administrator Danych</h3>
              <p>Administratorem Twoich danych osobowych przekazanych w formularzu rejestracyjnym, kontaktowym oraz w formularzu zamówienia a także podanych podczas wyrażania zgody na otrzymywanie oferty handlowej (newsletter) jest <strong>JT Mebel sp. z o.o. z siedzibą w Kartuzach, ul. Gdańska 45</strong>, zwany dalej: „Administratorem”.</p>
              
              <p>Możesz skontaktować się z Administratorem pisząc na adres: JT Mebel sp. z o.o., 83-300 Kartuzy, ul. Gdańska 45, telefonując pod numer: (058) 684 75 25, za pomocą poczty elektronicznej: biuro@jtmebel.pl</p>

              <h3>Podstawa prawna</h3>
              <p>Podstawą prawną przetwarzania Twoich danych jest: umowa pomiędzy Tobą a Administratorem, ciążący na Administratorze obowiązek prawny (wynikający m.in. z przepisów podatkowych), oraz uzasadniony interes Administratora.</p>

              <h3>Cel przetwarzania</h3>
              <p>Twoje dane osobowe przetwarzane są wyłącznie dla celów związanych z realizacją Umowy oraz do podjęcia niezbędnych działań przed zawarciem umowy (udzielenie odpowiedzi na pytania zadane za pomocą formularza), a także w celu marketingu bezpośredniego za odrębną zgodą.</p>

              <h3>Prawa użytkownika</h3>
              <p>Masz prawo żądać od Administratora dostępu do swoich danych, ich sprostowania, przenoszenia i usunięcia, a także prawo do ograniczenia przetwarzania danych.</p>
              <p>W oparciu o Twoje dane osobowe Administrator nie będzie podejmował wobec Ciebie zautomatyzowanych decyzji, jednak może wykorzystać za Twoją zgodą do profilowania z wykorzystaniem technologii cookies i innych podobnych technologii.</p>

              <h3>Pliki Cookies</h3>
              <p>Pliki cookies (tzw. "ciasteczka") stanowią dane informatyczne, w szczególności pliki tekstowe, które przechowywane są w urządzeniu końcowym użytkownika. Wykorzystywane są w celu optymalizacji korzystania ze stron, tworzenia statystyk oraz dostosowywania wyświetlanych reklam (np. przez Google Analytics). Możesz w każdej chwili zablokować pliki cookies z poziomu swojej przeglądarki.</p>

            </div>
          </motion.div>
        </div>
      </div>
    </PageWrapper>
  );
}
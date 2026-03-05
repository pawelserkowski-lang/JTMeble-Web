import { Helmet } from 'react-helmet-async';
import PageWrapper from '../components/PageWrapper';
import { motion } from 'motion/react';

export default function Regulamin() {
  return (
    <PageWrapper>
      <Helmet>
        <title>Regulamin - JT Mebel</title>
        <meta name="description" content="Regulamin sklepu intenetowego JTMebel - krzesła szkolne, stoły szkolne, szafy i regały dla przedszkoli i szkół." />
      </Helmet>
      <div className="pt-24 pb-16 min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Regulamin sklepu</h1>
            <div className="w-24 h-1 bg-blue-600 rounded-full mb-10"></div>
            <div className="prose prose-lg dark:prose-invert text-gray-600 dark:text-gray-300">
              <p>Sprzedającym jest JT Mebel spółka z o.o. z siedzibą w Kartuzach 83-300 przy ulicy Gdańskiej 45 i wpisaną przez Sąd Rejonowy Gdańsk-Północ VIII Wydział Gospodarczy do Krajowego Rejestru Sądowego - Rejestru Przedsiębiorców pod numerem KRS 0000331351. Spółka zarejestrowana jest pod numerem NIP: 589-196-20-96, Regon:220798559.</p>
              
              <h3>§ 1 Definicje</h3>
              <ol>
                <li>Regulamin – niniejszy regulamin. W zakresie usług świadczonych drogą elektroniczną regulamin jest regulaminem, o którym mowa w art. 8 ustawy z dnia 18 lipca 2002 r. o świadczeniu usług drogą elektroniczną.</li>
                <li>Klient – osoba fizyczna, osoba prawna lub jednostka organizacyjna dokonująca Zamówienia.</li>
                <li>Konsument – Klient będący osobą fizyczną, dokonujący zakupów niezwiązanych bezpośrednio z jej działalnością gospodarczą.</li>
                <li>Sprzedawca – podmiot świadczący usługi sprzedaży na zasadach określonych w niniejszym Regulaminie.</li>
                <li>Przedmiot transakcji - Towary wymienione i opisane na stronie.</li>
              </ol>

              <h3>§ 2 Zasady ogólne</h3>
              <p>Warunkiem złożenia Zamówienia w Sklepie Internetowym przez Klienta jest zapoznanie się z niniejszym Regulaminem i akceptacja jego postanowień. Wszystkie Towary oferowane w sklepie www.jtmebel.pl są fabrycznie nowe i wolne od wad.</p>

              <h3>§ 3 Składanie zamówień</h3>
              <p>Wszystkie ceny podane na stronach są cenami brutto (w PLN). Zamówienia można składać przez sklep internetowy, mailowo (biuro@jtmebel.pl), telefonicznie (58 684 75 25) lub faxem.</p>

              <h3>§ 4 Koszty i termin wysyłki</h3>
              <p>Towar jest dostarczany własnym transportem lub za pomocą wyspecjalizowanych firm kurierskich. Realizacja zamówienia trwa do 28 dni. Koszt dostawy to 200,00 zł netto do każdego punktu dostawy na terenie całego kraju (nie obejmuje rozładunku i wniesienia).</p>

              <h3>§ 5 Płatności</h3>
              <p>Podstawową formą płatności jest przedpłata na podstawie faktury proforma na rachunek bankowy Sprzedawcy. Do każdego zamówienia zostaje wystawiona faktura VAT.</p>

              <h3>§ 6 Odstąpienie od umowy</h3>
              <p>Konsument może odstąpić od umowy sprzedaży towarów bez podania przyczyny, składając stosowne oświadczenie na piśmie w terminie 14 dni, licząc od dnia wydania towaru.</p>

              <h3>§ 7 Procedura reklamacji</h3>
              <p>Produkty posiadają 2-letnią gwarancję. Reklamacje należy składać na adres e-mail sprzedającego z dołączonym dowodem zakupu i opisem wady.</p>

              <h3>§ 8 Polityka prywatności</h3>
              <p>Administratorem danych jest JT Mebel Sp. z o.o. Zobowiązujemy się do ochrony danych osobowych zgodnie z aktualnymi przepisami RODO.</p>

              <h3>§ 9 Postanowienia końcowe</h3>
              <p>Informacje o towarach zamieszczone na stronie nie stanowią oferty handlowej w rozumieniu art. 66 lecz zaproszenie do zawarcia umowy określone w art. 71 Kodeksu cywilnego. Wykorzystane zdjęcia mają charakter poglądowy.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </PageWrapper>
  );
}
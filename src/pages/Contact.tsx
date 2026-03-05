import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import PageWrapper from '../components/PageWrapper';
import { Phone, Mail, MapPin, Send } from 'lucide-react';

export default function Contact() {
  return (
    <PageWrapper>
      <Helmet>
        <title>Kontakt - JT Mebel</title>
        <meta name="description" content="Skontaktuj się z nami. Oferujemy pełne doradztwo w zakresie mebli szkolnych, przedszkolnych i biurowych." />
        <meta property="og:title" content="Kontakt - JT Mebel" />
        <meta property="og:description" content="Skontaktuj się z nami. Oferujemy pełne doradztwo w zakresie mebli szkolnych, przedszkolnych i biurowych." />
      </Helmet>
<div className="page-content">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Skontaktuj się z nami
          </h1>
          <div className="w-24 h-1 bg-blue-600 rounded-full mb-10"></div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Napisz do nas
              </h3>
              <form action="https://formspree.io/f/placeholder" method="POST" className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Imię i nazwisko
                  </label>
                  <input
                    type="text"
                    name="name"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Adres E-mail
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Treść wiadomości
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl flex items-center justify-center transition-colors"
                >
                  Wyślij wiadomość <Send size={18} className="ml-2" />
                </button>
              </form>
            </div>

            <div className="space-y-8">
              <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  Dane kontaktowe
                </h3>
                <ul className="space-y-6 text-gray-600 dark:text-gray-300">
                  <li className="flex items-start">
                    <MapPin className="text-blue-600 mr-4 mt-1" size={24} />{' '}
                    <div>
                      <strong>Adres:</strong>
                      <br />
                      ul. Gdańska 45
                      <br />
                      83-300 Kartuzy
                    </div>
                  </li>
                  <li className="flex items-center">
                    <Phone className="text-blue-600 mr-4" size={24} />{' '}
                    <div>
                      <strong>Telefon:</strong>
                      <br />
                      58 684 75 25 / 58 684 76 07
                    </div>
                  </li>
                  <li className="flex items-center">
                    <Mail className="text-blue-600 mr-4" size={24} />{' '}
                    <div>
                      <strong>E-mail:</strong>
                      <br />
                      biuro@jtmebel.pl
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  Dział Handlowy
                </h3>
                <div className="space-y-4 text-sm text-gray-600 dark:text-gray-300">
                  <div>
                    <strong>Agnieszka Bukowska</strong> - Kierownik regionalny<br/>
                    <span className="text-xs text-gray-500">woj. kujawsko-pomorskie (centr./poł.), mazowieckie, łódzkie, świętokrzyskie, lubelskie, podkarpackie</span><br/>
                    📞 690 88 22 52
                  </div>
                  <div>
                    <strong>Klaudia Grzelak</strong> - Kierownik regionalny<br/>
                    <span className="text-xs text-gray-500">woj. zachodniopomorskie (zach.), wielkopolskie, lubuskie, dolnośląskie, opolskie, śląskie, małopolskie</span><br/>
                    📞 690 88 22 21
                  </div>
                  <div>
                    <strong>Piotr Jarecki</strong> - Kierownik regionalny<br/>
                    <span className="text-xs text-gray-500">woj. pomorskie (wsch.), warmińsko-mazurskie, podlaskie</span><br/>
                    📞 601 88 43 49
                  </div>
                  <div>
                    <strong>Joanna Dowbusz</strong> - Przedstawiciel handlowy<br/>
                    <span className="text-xs text-gray-500">woj. zachodniopomorskie (wsch.), pomorskie (zach.), wielkopolskie (półn.), kujawsko-pomorskie (półn.)</span><br/>
                    📞 577 22 20 19
                  </div>
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden shadow-sm h-64 border border-gray-100 dark:border-gray-800">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2328.6702685741617!2d18.1969443!3d54.3311111!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46fda9e9c8b7c7b1%3A0x8e8b8b8b8b8b8b8b!2sKartuzy!5e0!3m2!1spl!2spl!4v1620000000000!5m2!1spl!2spl"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
</PageWrapper>
  );
}

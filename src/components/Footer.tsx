import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Armchair } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 pt-16 pb-8 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 text-orange-500 p-2 rounded-xl shadow-md">
                <Armchair size={22} strokeWidth={2.5} />
              </div>
              <span className="text-2xl font-black tracking-tighter text-gray-900 dark:text-white">
                JT<span className="text-orange-500 font-medium">Meble.</span>
              </span>
            </div>
            <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-sm">
              Tworzymy funkcjonalne i estetyczne meble na wymiar. Jakość i precyzja to nasze
              priorytety w każdym projekcie.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Kontakt</h4>
            <ul className="space-y-4 text-gray-600 dark:text-gray-400">
              <li className="flex items-center">
                <Phone size={20} className="mr-3 text-orange-500" /> +48 123 456 789
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-3 text-orange-500" /> kontakt@jtmebel.pl
              </li>
              <li className="flex items-center">
                <MapPin size={20} className="mr-3 text-orange-500" /> ul. Przykładowa 12, Polska
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Szybkie linki</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-600 dark:text-gray-400 hover:text-orange-500 transition-colors"
                >
                  Strona główna
                </Link>
              </li>
              <li>
                <Link
                  to="/oferta"
                  className="text-gray-600 dark:text-gray-400 hover:text-orange-500 transition-colors"
                >
                  Oferta
                </Link>
              </li>
              <li>
                <Link
                  to="/kontakt"
                  className="text-gray-600 dark:text-gray-400 hover:text-orange-500 transition-colors"
                >
                  Kontakt
                </Link>
              </li>
              <li>
                <a
                  href="/files/Katalog_JT_Mebel_2022.pdf"
                  target="_blank"
                  className="text-gray-600 dark:text-gray-400 hover:text-orange-500 transition-colors font-medium"
                >
                  Katalog PDF
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-100 dark:border-gray-800 pt-8 text-center text-gray-500 dark:text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} JTMeble. Wszelkie prawa zastrzeżone. Projekt oparty o
          najnowsze technologie.
        </div>
      </div>
    </footer>
  );
}

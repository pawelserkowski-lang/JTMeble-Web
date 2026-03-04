import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  pl: {
    translation: {
      "home": "Strona główna",
      "about": "O nas",
      "offer": "Oferta",
      "labs": "Laboratoria",
      "calc": "Kalkulator",
      "colors": "Kolory",
      "contact": "Kontakt",
      "catalog": "Katalog PDF",
      "search": "Szukaj produktów...",
      "hero_title": "Tworzymy przestrzeń Twoich marzeń",
      "hero_desc": "Meble na wymiar najwyższej jakości. Od projektu po montaż. Zadbamy o każdy detal w Twoim domu i biurze.",
      "see_offer": "Zobacz ofertę",
      "blog": "Aktualności"
    }
  },
  en: {
    translation: {
      "home": "Home",
      "about": "About Us",
      "offer": "Offer",
      "labs": "Labs",
      "calc": "Calculator",
      "colors": "Colors",
      "contact": "Contact",
      "catalog": "PDF Catalog",
      "search": "Search products...",
      "hero_title": "We create the space of your dreams",
      "hero_desc": "Custom-made furniture of the highest quality. From design to assembly. We take care of every detail in your home and office.",
      "see_offer": "See Offer",
      "blog": "News"
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'pl', // domyślny język
  fallbackLng: 'pl',
  interpolation: { escapeValue: false }
});

export default i18n;

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
      "hero_title": "JT Mebel - Producent Mebli Szkolnych",
      "hero_desc": "Firma specjalizuje się w seryjnej produkcji mebli szkolnych, krzeseł, stołów, biurek i regałów.",
      "see_offer": "Zobacz ofertę",
      "blog": "Aktualności"
    }
  },
  en: {
    translation: {
      "home": "Home",
      "about": "About Us",
      "offer": "Offer",
      "labs": "Laboratories",
      "calc": "Calculator",
      "colors": "Colors",
      "contact": "Contact",
      "catalog": "PDF Catalog",
      "search": "Search products...",
      "hero_title": "JT Mebel - School Furniture Manufacturer",
      "hero_desc": "The company specializes in the mass production of school furniture, chairs, tables, desks, and shelving.",
      "see_offer": "See Offer",
      "blog": "News"
    }
  },
  de: {
    translation: {
      "home": "Startseite",
      "about": "Über uns",
      "offer": "Angebot",
      "labs": "Labore",
      "calc": "Rechner",
      "colors": "Farben",
      "contact": "Kontakt",
      "catalog": "PDF Katalog",
      "search": "Produkte suchen...",
      "hero_title": "JT Mebel - Schulmöbelhersteller",
      "hero_desc": "Das Unternehmen ist auf die Serienproduktion von Schulmöbeln, Stühlen, Tischen, Schreibtischen und Regalen spezialisiert.",
      "see_offer": "Angebot ansehen",
      "blog": "Aktuelles"
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
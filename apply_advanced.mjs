import fs from 'fs';
import path from 'path';

const srcDir = 'C:\\Users\\BIURODOM\\Desktop\\JTMeble-Web\\src';

// 1. ZMIANA KOLORYSTYKI (Globalny Find & Replace orange -> blue)
function replaceColorsInDirectory(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            replaceColorsInDirectory(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts') || fullPath.endsWith('.css')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let newContent = content
                .replace(/orange-600/g, 'blue-700')
                .replace(/orange-500/g, 'blue-600')
                .replace(/orange-400/g, 'blue-500')
                .replace(/orange-300/g, 'blue-400')
                .replace(/orange-100/g, 'blue-100')
                .replace(/orange-50/g, 'blue-50');
            if (content !== newContent) {
                fs.writeFileSync(fullPath, newContent);
            }
        }
    }
}
replaceColorsInDirectory(srcDir);

// 2. KONFIGURACJA i18n
const i18nContent = `import i18n from 'i18next';
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
`;
fs.writeFileSync(path.join(srcDir, 'i18n.ts'), i18nContent);

// Podpiecie i18n i Vercel Analytics do main.tsx
const mainPath = path.join(srcDir, 'main.tsx');
let mainContent = fs.readFileSync(mainPath, 'utf8');
if (!mainContent.includes('Analytics')) {
    mainContent = `import { Analytics } from '@vercel/analytics/react';\nimport './i18n';\n` + mainContent;
    mainContent = mainContent.replace('</HelmetProvider>', '<Analytics />\n  </HelmetProvider>');
    fs.writeFileSync(mainPath, mainContent);
}

// 3. BLOG PAGE
const blogContent = `import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import PageWrapper from '../components/PageWrapper';
import { Calendar, User } from 'lucide-react';

const posts = [
  { id: 1, title: 'Wdrażamy nowy system mebli modułowych', date: '2026-03-01', author: 'Zespół JTMeble', excerpt: 'Nasza najnowsza kolekcja stawia na elastyczność. Zobacz, jak łatwo dopasować przestrzeń do dynamicznego środowiska biurowego.', image: '/images/product-2.jpg' },
  { id: 2, title: 'Sukces w programie Laboratoria Przyszłości', date: '2026-02-15', author: 'Jan Kowalski', excerpt: 'Kolejne 50 szkół w Polsce otrzymało od nas dedykowane pracownie druku 3D i robotyki. Dziękujemy za zaufanie!', image: '/images/hero-bg-4.jpg' },
  { id: 3, title: 'Jak wybrać idealny fotel ergonomiczny?', date: '2026-01-20', author: 'Anna Nowak', excerpt: 'Ból pleców w pracy to przeszłość. Przygotowaliśmy krótki poradnik o kluczowych cechach dobrego fotela.', image: '/images/hero-bg-5.jpg' },
];

export default function Blog() {
  return (
    <PageWrapper>
      <Helmet>
        <title>Aktualności i Blog - JTMeble</title>
        <meta name="description" content="Najnowsze informacje z życia firmy JTMeble, porady wnętrzarskie i relacje z wdrożeń." />
      </Helmet>
      
      <div className="pt-24 pb-16 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Aktualności</h1>
          <div className="w-24 h-1 bg-blue-600 rounded-full mb-10"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.map(post => (
              <motion.article key={post.id} whileHover={{ y: -5 }} className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm flex flex-col">
                <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
                <div className="p-6 flex-grow flex flex-col">
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-3 gap-4">
                    <span className="flex items-center"><Calendar size={14} className="mr-1" /> {post.date}</span>
                    <span className="flex items-center"><User size={14} className="mr-1" /> {post.author}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{post.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 flex-grow">{post.excerpt}</p>
                  <button className="text-blue-600 dark:text-blue-400 font-semibold text-sm hover:underline mt-auto text-left">Czytaj więcej &rarr;</button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
`;
fs.writeFileSync(path.join(srcDir, 'pages', 'Blog.tsx'), blogContent);

// 4. Update App.tsx (add Blog Route)
let appContent = fs.readFileSync(path.join(srcDir, 'App.tsx'), 'utf8');
if(!appContent.includes('Blog')) {
    appContent = appContent.replace("import Calculator from './pages/Calculator';", "import Calculator from './pages/Calculator';\nimport Blog from './pages/Blog';");
    appContent = appContent.replace('<Route path="/kolory" element={<Colors />} />', '<Route path="/kolory" element={<Colors />} />\n        <Route path="/blog" element={<Blog />} />');
    fs.writeFileSync(path.join(srcDir, 'App.tsx'), appContent);
}

console.log("Skrypt zakoczony sukcesem!");

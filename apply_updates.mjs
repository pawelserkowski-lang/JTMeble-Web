import fs from 'fs';
import path from 'path';

const srcDir = 'C:\\Users\\BIURODOM\\Desktop\\JTMeble-Web\\src';
const pagesDir = path.join(srcDir, 'pages');

const pages = [
  { file: 'Home.tsx', title: 'JTMeble - Nowoczesne meble szkolne, biurowe i przedszkolne', desc: 'Meble na wymiar najwyższej jakości. Od projektu po montaż. Zadbamy o każdy detal w Twoim domu i biurze.' },
  { file: 'About.tsx', title: 'O nas - JTMeble', desc: 'Poznaj historię firmy JTMeble. Od ponad dekady zajmujemy się produkcją certyfikowanych mebli dla szkół i przedszkoli.' },
  { file: 'Contact.tsx', title: 'Kontakt - JTMeble', desc: 'Skontaktuj się z nami. Oferujemy pełne doradztwo w zakresie mebli na wymiar i wyposażenia biur.' },
  { file: 'Laboratoria.tsx', title: 'Laboratoria Przyszłości - JTMeble', desc: 'Zrealizuj z nami program Laboratoria Przyszłości. Dostarczamy sprzęt do druku 3D, robotyki i multimediów.' },
  { file: 'Offer.tsx', title: 'Pełna Oferta - JTMeble', desc: 'Zobacz pełną ofertę ponad 1100 mebli: od biurek, przez szafki, aż po meble dla przedszkoli i szkół.' },
  { file: 'Calculator.tsx', title: 'Kalkulator Powierzchni - JTMeble', desc: 'Oszacuj, ile stanowisk pracy zmieści się w Twoim nowym biurze z naszym kalkulatorem.' }
];

pages.forEach(p => {
    const pPath = path.join(pagesDir, p.file);
    if (!fs.existsSync(pPath)) return;
    
    let content = fs.readFileSync(pPath, 'utf8');
    
    if (!content.includes('react-helmet-async')) {
        content = content.replace("import { motion } from 'motion/react';", "import { motion } from 'motion/react';\nimport { Helmet } from 'react-helmet-async';\nimport PageWrapper from '../components/PageWrapper';");
        content = content.replace("import { useState } from 'react';", "import { useState } from 'react';\nimport { Helmet } from 'react-helmet-async';\nimport PageWrapper from '../components/PageWrapper';");
        
        // Specjalne dla strony bez wczesniejszych importow
        if (!content.includes('PageWrapper')) {
           content = "import { Helmet } from 'react-helmet-async';\nimport PageWrapper from '../components/PageWrapper';\n" + content;
        }

        const helmetTags = `
      <Helmet>
        <title>${p.title}</title>
        <meta name="description" content="${p.desc}" />
        <meta property="og:title" content="${p.title}" />
        <meta property="og:description" content="${p.desc}" />
      </Helmet>`;
        
        // Zwijanie głownego kontenera w PageWrapper
        content = content.replace(/(return \(\s*)(?:<>|<div[^>]*>)/, `$1<PageWrapper>${helmetTags}\n<div className="page-content">`);
        content = content.replace(/(<\/div>|<\/>)\s*\);\s*}\s*$/, `</div>\n</PageWrapper>\n  );\n}\n`);
        
        fs.writeFileSync(pPath, content);
    }
});

// Category.tsx (dynamiczny tytul)
const catPath = path.join(pagesDir, 'Category.tsx');
let catContent = fs.readFileSync(catPath, 'utf8');
if (!catContent.includes('react-helmet-async')) {
    catContent = catContent.replace("import { useState } from 'react';", "import { useState } from 'react';\nimport { Helmet } from 'react-helmet-async';\nimport PageWrapper from '../components/PageWrapper';");
    catContent = catContent.replace(/(return \(\s*)<div className="pt-24/, `$1<PageWrapper>\n      <Helmet>\n        <title>{category.title} - JTMeble</title>\n      </Helmet>\n      <div className="pt-24`);
    catContent = catContent.replace(/(<\/div>\s*)\);\s*}\s*$/, `$1    </PageWrapper>\n  );\n}`);
    fs.writeFileSync(catPath, catContent);
}

// Podmiana logo w Navbar.tsx i Footer.tsx
const navPath = path.join(srcDir, 'components', 'Navbar.tsx');
let navContent = fs.readFileSync(navPath, 'utf8');
const oldNavLogo = /<div className="bg-gradient-to-br from-orange-400 to-orange-600 text-white p-2 rounded-xl shadow-md group-hover:shadow-orange-500\/20 transition-all duration-300 group-hover:-translate-y-0.5">\s*<Armchair size=\{22\} strokeWidth=\{2.5\} \/>\s*<\/div>\s*<span className="text-2xl font-black tracking-tighter text-gray-900 dark:text-white hidden sm:block">\s*JT<span className="text-orange-500 font-medium">Meble.<\/span>\s*<\/span>/;
const newLogo = `<img src="/images/logo.png" alt="JTMeble Logo" className="h-10 w-auto object-contain transition-transform group-hover:scale-105" onError={(e) => { e.currentTarget.style.display='none'; e.currentTarget.nextElementSibling.style.display='block'; }} />\n              <span style={{display: 'none'}} className="text-2xl font-black tracking-tighter text-gray-900 dark:text-white">JT<span className="text-orange-500 font-medium">Meble.</span></span>`;
navContent = navContent.replace(oldNavLogo, newLogo);
// Dodanie linku do konfiguratora
if(!navContent.includes('href="/kolory"')) {
   navContent = navContent.replace('</nav>', '</nav>'); // placeholder logiczny
}
fs.writeFileSync(navPath, navContent);

const footerPath = path.join(srcDir, 'components', 'Footer.tsx');
let footerContent = fs.readFileSync(footerPath, 'utf8');
const oldFooterLogo = /<div className="bg-gradient-to-br from-gray-800 to-gray-900 text-orange-500 p-2 rounded-xl shadow-md">\s*<Armchair size=\{22\} strokeWidth=\{2.5\} \/>\s*<\/div>\s*<span className="text-2xl font-black tracking-tighter text-gray-900 dark:text-white">\s*JT<span className="text-orange-500 font-medium">Meble.<\/span>\s*<\/span>/;
footerContent = footerContent.replace(oldFooterLogo, newLogo);
fs.writeFileSync(footerPath, footerContent);

console.log("SEO, Logo i przejscia zintegrowane!");

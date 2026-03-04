import fs from 'fs';
import path from 'path';

const srcDir = 'C:\\Users\\BIURODOM\\Desktop\\JTMeble-Web\\src';

// 1. Navbar.tsx
let navPath = path.join(srcDir, 'components', 'Navbar.tsx');
let navContent = fs.readFileSync(navPath, 'utf8');
navContent = navContent.replace('Armchair, ', '');
navContent = navContent.replace('e.currentTarget.nextElementSibling.style.display', '(e.currentTarget.nextElementSibling as HTMLElement).style.display');
fs.writeFileSync(navPath, navContent);

// 2. Footer.tsx
let footerPath = path.join(srcDir, 'components', 'Footer.tsx');
let footerContent = fs.readFileSync(footerPath, 'utf8');
footerContent = footerContent.replace('Armchair }', '}');
footerContent = footerContent.replace('e.currentTarget.nextElementSibling.style.display', '(e.currentTarget.nextElementSibling as HTMLElement).style.display');
fs.writeFileSync(footerPath, footerContent);

// 3. PageWrapper.tsx
let pwPath = path.join(srcDir, 'components', 'PageWrapper.tsx');
let pwContent = fs.readFileSync(pwPath, 'utf8');
pwContent = pwContent.replace('import { ReactNode } from \'react\';', 'import { type ReactNode } from \'react\';');
fs.writeFileSync(pwPath, pwContent);

// 4. Calculator.tsx
let calcPath = path.join(srcDir, 'pages', 'Calculator.tsx');
let calcContent = fs.readFileSync(calcPath, 'utf8');
calcContent = calcContent.replace(/import { Helmet } from 'react-helmet-async';\nimport PageWrapper from '\.\.\/components\/PageWrapper';\n/g, ''); // Usun wszystkie
calcContent = "import { Helmet } from 'react-helmet-async';\nimport PageWrapper from '../components/PageWrapper';\n" + calcContent; // Dodaj tylko raz
fs.writeFileSync(calcPath, calcContent);

// 5. Category.tsx
let catPath = path.join(srcDir, 'pages', 'Category.tsx');
let catContent = fs.readFileSync(catPath, 'utf8');
if(catContent.includes('import toast') && !catContent.includes('toast.')) {
   catContent = catContent.replace("import toast from 'react-hot-toast';\n", "");
}
fs.writeFileSync(catPath, catContent);

// 6. Home.tsx
let homePath = path.join(srcDir, 'pages', 'Home.tsx');
let homeContent = fs.readFileSync(homePath, 'utf8');
homeContent = homeContent.replace('ChevronRight, ', '');
fs.writeFileSync(homePath, homeContent);

console.log("TypeScript errors fixed.");

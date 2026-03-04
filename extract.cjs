const fs = require('fs');
const path = require('path');

const sourceDir = 'C:\\Users\\BIURODOM\\Desktop\\JTMeble';
const outputDir = 'C:\\Users\\BIURODOM\\Desktop\\JTMeble-Web\\src\\data';

if (!fs.existsSync(outputDir)){
    fs.mkdirSync(outputDir, { recursive: true });
}

let categories = [];
let products = [];

// Odczyt plikow HTML i proba wyciagniecia nazw kategorii
const files = fs.readdirSync(sourceDir).filter(f => f.endsWith('.html') && f !== 'index.html' && f !== 'koszyk.html');

files.forEach(file => {
  const name = file.replace('.html', '').replace(/^\d+-/, '').replace(/-/g, ' ');
  const title = name.charAt(0).toUpperCase() + name.slice(1);
  const id = file.split('-')[0];
  
  categories.push({
    id: isNaN(parseInt(id)) ? file.replace('.html', '') : id,
    title: title,
    slug: file.replace('.html', ''),
    image: '/images/hero-bg-2.jpg' // domyslny obrazek
  });
});

fs.writeFileSync(path.join(outputDir, 'catalog.json'), JSON.stringify({ categories, products }, null, 2));
console.log('Wyodrebniono ' + categories.length + ' podstron/kategorii.');

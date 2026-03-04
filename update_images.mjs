import fs from 'fs';
import path from 'path';

const sourceDir = 'C:\\Users\\BIURODOM\\Desktop\\JTMeble';
const targetImagesDir = 'C:\\Users\\BIURODOM\\Desktop\\JTMeble-Web\\public\\images';
const catalogPath = 'C:\\Users\\BIURODOM\\Desktop\\JTMeble-Web\\src\\data\\catalog.json';

const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));

// Wyrazenie regularne szukajace tagow IMG i wyciagajace atrybut src
const imgRegex = /<img[^>]+src=["']([^"']+)["']/gi;

const files = fs.readdirSync(sourceDir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    const slug = file.replace('.html', '');
    const content = fs.readFileSync(path.join(sourceDir, file), 'utf8');
    
    let match;
    let mainImage = null;
    
    // Szukamy wszystkich obrazkow na danej podstronie
    while ((match = imgRegex.exec(content)) !== null) {
        let imgSrc = match[1];
        // Ignoruj icony, logo i tła uzywane na calej stronie
        if (!imgSrc.includes('logo') && !imgSrc.includes('icon') && imgSrc.includes('images/')) {
            // Wyciagamy sama nazwe pliku
            mainImage = path.basename(imgSrc);
            break; // bierzemy pierwsze znaczace zdjecie z podstrony jako okladke
        }
    }

    // Aktualizujemy baze danych
    const catIndex = catalog.categories.findIndex(c => c.slug === slug);
    if (catIndex !== -1 && mainImage) {
        catalog.categories[catIndex].image = `/images/${mainImage}`;
    }
});

fs.writeFileSync(catalogPath, JSON.stringify(catalog, null, 2));
console.log('Zaktualizowano plik catalog.json o poprawne zdjecia!');

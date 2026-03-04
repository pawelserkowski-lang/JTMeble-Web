import fs from 'fs';
import path from 'path';

const sourceDir = 'C:\\Users\\BIURODOM\\Desktop\\JTMeble';
const catalogPath = 'C:\\Users\\BIURODOM\\Desktop\\JTMeble-Web\\src\\data\\catalog.json';

const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
catalog.products = [];

const files = fs
  .readdirSync(sourceDir)
  .filter((f) => f.endsWith('.html') && f !== 'index.html' && f !== 'koszyk.html');

let globalProductId = 1;

files.forEach((file) => {
  const categorySlug = file.replace('.html', '');
  const content = fs.readFileSync(path.join(sourceDir, file), 'utf8');

  // Szukamy blokow article z klasa product-miniature
  const articleRegex =
    /<article[^>]*class=["'][^"']*product-miniature[^"']*["'][^>]*>([\s\S]*?)<\/article>/gi;
  let articleMatch;
  let count = 0;

  while ((articleMatch = articleRegex.exec(content)) !== null) {
    if (count >= 12) break; // Limit 12 produktów na kategorię (żeby nie obciążać zbytnio JSON-a)

    const block = articleMatch[1];

    // Szukamy obrazka i nazwy
    const imgMatch = /<img[^>]+src=["']([^"']+)["'][^>]*alt=["']([^"']+)["']/i.exec(block);
    const titleMatch =
      /<h[1-6][^>]*><a[^>]*>([^<]+)<\/a><\/h[1-6]>/i.exec(block) ||
      /<a[^>]*>([^<]+)<\/a>/i.exec(block);

    if (imgMatch && imgMatch[2]) {
      let imgSrc = imgMatch[1];
      if (imgSrc.startsWith('/')) imgSrc = 'https://jtmebel.pl' + imgSrc;

      let title = imgMatch[2].trim();
      if (titleMatch && titleMatch[1]) title = titleMatch[1].trim();

      // Unikamy duplikatów w tej samej kategorii
      if (!catalog.products.find((p) => p.name === title && p.categoryId === categorySlug)) {
        catalog.products.push({
          id: globalProductId++,
          categoryId: categorySlug,
          name: title,
          price: Math.floor(Math.random() * 800) + 200, // Losowa cena do celów podglądu (ponieważ oryginalne ceny są ukryte)
          image: imgSrc,
        });
        count++;
      }
    }
  }
});

fs.writeFileSync(catalogPath, JSON.stringify(catalog, null, 2));
console.log(`Pomyślnie wyodrębniono ${catalog.products.length} pojedynczych produktów!`);

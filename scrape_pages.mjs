import fs from 'fs';
import https from 'https';

const urls = [
  'https://jtmebel.pl/content/1-regulamin',
  'https://jtmebel.pl/content/2-dostawa',
  'https://jtmebel.pl/content/5-polityka-prywatnosci',
  'https://jtmebel.pl/content/7-platnosci',
  'https://jtmebel.pl/content/8-reklamacje',
  'https://jtmebel.pl/content/14-zwrot-towaru',
  'https://jtmebel.pl/content/4-o-nas',
  'https://jtmebel.pl/content/6-dzial-sprzedazy'
];

const fetchUrl = (url) => {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ url, data }));
    }).on('error', err => resolve({ url, data: '', error: err.message }));
  });
};

async function run() {
  console.log('Fetching all static pages...');
  const results = await Promise.all(urls.map(fetchUrl));
  const output = {};
  
  for (const result of results) {
    if (result.error) {
      console.log(`Failed to fetch ${result.url}: ${result.error}`);
      continue;
    }
    
    // Proste wyciągnięcie zawartości tekstowej z głównego diva
    // Szukamy <section id="content" ...>
    const match = result.data.match(/<section id="content"[^>]*>([\s\S]*?)<\/section>/i);
    let content = match ? match[1] : '';
    
    // Usuwamy tagi HTML
    content = content.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    
    const name = result.url.split('/').pop();
    output[name] = content;
    console.log(`Pobrano i przeanalizowano: ${name}`);
  }
  
  fs.writeFileSync('C:\\Users\\BIURODOM\\Desktop\\JTMeble-Web\\scraped_static_pages.json', JSON.stringify(output, null, 2));
  console.log('Zapisano do scraped_static_pages.json');
}

run();
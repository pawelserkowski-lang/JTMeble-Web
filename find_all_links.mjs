import fs from 'fs';
const content = fs.readFileSync(
  'C:\\Users\\BIURODOM\\Desktop\\JTMeble\\11-katalog-i-cennik-pdf.html',
  'utf8'
);
const regex = /<a[^>]+href=["']([^"']+)["']/gi;
let match;
const links = new Set();
while ((match = regex.exec(content)) !== null) {
  if (!match[1].startsWith('#') && !match[1].includes('javascript')) {
    links.add(match[1]);
  }
}
console.log('Wszystkie linki wychodzace na podstronie katalogow:');
links.forEach((l) => console.log(l));

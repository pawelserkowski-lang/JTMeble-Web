import fs from 'fs';
import path from 'path';
import https from 'https';

const catalogPath = 'C:\\Users\\BIURODOM\\Desktop\\JTMeble-Web\\src\\data\\scraped_products.json';
const targetDir = 'C:\\Users\\BIURODOM\\Desktop\\JTMeble-Web\\public\\images';

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const data = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));

const downloadFile = (url, dest) => {
  return new Promise((resolve) => {
    if (fs.existsSync(dest)) return resolve(true);
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        fs.unlink(dest, () => {});
        return resolve(false);
      }
      response.pipe(file);
      file.on('finish', () => { file.close(() => resolve(true)); });
    }).on('error', () => {
      fs.unlink(dest, () => {});
      resolve(false);
    });
  });
};

async function run() {
  let count = 0;
  for (const product of data.products || []) {
    if (product.image) {
      const filename = path.basename(product.image);
      const dest = path.join(targetDir, filename);
      if (!fs.existsSync(dest)) {
        await downloadFile(product.image, dest);
        count++;
        console.log(`Pobrano (${count}): ${filename}`);
      }
    }
  }
  console.log(`Gotowe! Pomyślnie pobrano ${count} nowych obrazów z jtmebel.pl.`);
}
run();
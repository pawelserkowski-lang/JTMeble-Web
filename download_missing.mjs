import fs from 'fs';
import path from 'path';
import https from 'https';

const imagesToDownload = [
  'wizualizer-ipevo-do-cam-zolty.jpg',
  'regal-domki-dk02.jpg',
  'regal-mini-mn03.jpg',
  'kosz-na-smieci-swinka-10l.jpg',
  'regal-bun04.jpg',
];

const targetDir = 'C:\\Users\\BIURODOM\\Desktop\\JTMeble-Web\\public\\images';

const downloadFile = (url, dest) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https
      .get(url, function (response) {
        if (response.statusCode !== 200) {
          fs.unlink(dest, () => {});
          return resolve(false);
        }
        response.pipe(file);
        file.on('finish', function () {
          file.close(() => resolve(true));
        });
      })
      .on('error', function (err) {
        fs.unlink(dest, () => {});
        resolve(false);
      });
  });
};

async function downloadMissing() {
  for (const img of imagesToDownload) {
    // Ponieważ nie znamy ścisłej ścieżki w katalogach serwera, sprawdzamy kilka najpopularniejszych folderów:
    const paths = ['/images/', '/images/watermark/'];
    let downloaded = false;

    for (const p of paths) {
      const url = `https://jtmebel.pl${p}${img}`;
      const dest = path.join(targetDir, img);
      console.log(`Próba pobrania ${url}...`);
      const success = await downloadFile(url, dest);
      if (success) {
        console.log(`✅ Pomyślnie pobrano: ${img}`);
        downloaded = true;
        break;
      }
    }

    if (!downloaded) console.log(`❌ Nie udało się znaleźć: ${img}`);
  }
}

downloadMissing();

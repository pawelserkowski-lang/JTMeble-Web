import fs from 'fs';
import path from 'path';
import https from 'https';

const sourceDir = 'C:\\Users\\BIURODOM\\Desktop\\JTMeble';
const targetDir = 'C:\\Users\\BIURODOM\\Desktop\\JTMeble-Web\\public\\files';

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const downloadFile = (url, dest) => {
  return new Promise((resolve, reject) => {
    if (!url.startsWith('http')) return resolve();

    const file = fs.createWriteStream(dest);
    https
      .get(url, function (response) {
        if (response.statusCode !== 200) {
          fs.unlink(dest, () => {});
          return resolve(); // ignoruj bledy 404
        }
        response.pipe(file);
        file.on('finish', function () {
          file.close(resolve);
        });
      })
      .on('error', function (err) {
        fs.unlink(dest, () => {});
        resolve();
      });
  });
};

const extractAndDownload = async () => {
  const files = fs.readdirSync(sourceDir).filter((f) => f.endsWith('.html'));
  const linkRegex = /href=["']([^"']*\.(pdf|doc|docx|xls|xlsx|zip))["']/gi;
  const allLinks = new Set();

  files.forEach((file) => {
    const content = fs.readFileSync(path.join(sourceDir, file), 'utf8');
    let match;
    while ((match = linkRegex.exec(content)) !== null) {
      let link = match[1];
      if (!link.startsWith('http')) {
        if (link.startsWith('/')) {
          link = 'https://jtmebel.pl' + link;
        } else {
          link = 'https://jtmebel.pl/' + link;
        }
      }
      if (link.includes('jtmebel.pl')) {
        allLinks.add(link);
      }
    }
  });

  console.log(`Znaleziono ${allLinks.size} zalacznikow do pobrania.`);

  let downloaded = 0;
  for (const link of allLinks) {
    const fileName = path.basename(link);
    const destPath = path.join(targetDir, fileName);
    if (!fs.existsSync(destPath)) {
      console.log(`Pobieranie: ${fileName}...`);
      await downloadFile(link, destPath);
      downloaded++;
    }
  }

  console.log(`Zakonczono. Pobrano nowych plikow: ${downloaded}`);
};

extractAndDownload();

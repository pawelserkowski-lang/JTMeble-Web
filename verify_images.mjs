import fs from 'fs';
import path from 'path';

const sourceDir = 'C:\\Users\\BIURODOM\\Desktop\\JTMeble';
const targetImagesDir = 'C:\\Users\\BIURODOM\\Desktop\\JTMeble-Web\\public\\images';
const catalogPath = 'C:\\Users\\BIURODOM\\Desktop\\JTMeble-Web\\src\\data\\catalog.json';

const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
let missingCount = 0;

// Funkcja rekursywna do szukania plikow
function findFile(dir, fileName) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      const result = findFile(fullPath, fileName);
      if (result) return result;
    } else if (file === fileName) {
      return fullPath;
    }
  }
  return null;
}

catalog.categories.forEach((category) => {
  const imageName = category.image.replace('/images/', '');
  const destPath = path.join(targetImagesDir, imageName);

  // Jesli plik nie istnieje w folderze public
  if (!fs.existsSync(destPath) && imageName !== 'hero-bg-2.jpg') {
    // Poszukaj go w calej pobranej stronie
    const foundPath = findFile(sourceDir, imageName);
    if (foundPath) {
      fs.copyFileSync(foundPath, destPath);
      console.log(`Skopiowano brakujacy plik: ${imageName}`);
    } else {
      missingCount++;
      console.log(`Nie znaleziono pliku nigdzie w pobranych plikach: ${imageName}`);
    }
  }
});

console.log(
  `Weryfikacja zakonczona. Brakujacych plikow z bazy, ktorych nie udalo sie znalezc: ${missingCount}`
);

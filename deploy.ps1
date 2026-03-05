# Skrypt wdrażający projekt JTMeble-Web na produkcję (Vercel)
# Wymaga zainstalowanego Vercel CLI (npm i -g vercel)

$ErrorActionPreference = "Stop"
$ProjectDir = "C:\Users\BIURODOM\Desktop\JTMeble-Web"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host " Rozpoczynam wdrażanie JTMeble-Web" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

cd $ProjectDir

Write-Host "`n[1/4] Czyszczenie i instalacja zależności..." -ForegroundColor Yellow
npm install

Write-Host "`n[2/4] Weryfikacja typów TypeScript..." -ForegroundColor Yellow
npx tsc -b

Write-Host "`n[3/4] Budowanie aplikacji Vite..." -ForegroundColor Yellow
npm run build

Write-Host "`n[4/4] Wdrażanie na produkcję (Vercel)..." -ForegroundColor Yellow
# Opcja --prod wymusza wdrożenie bezpośrednio na domenę produkcyjną
# Opcja --yes pomija potwierdzenia
npx vercel --prod --yes

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n========================================" -ForegroundColor Green
    Write-Host " ✅ Sukces! Aplikacja została wdrożona na produkcję." -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
} else {
    Write-Host "`n========================================" -ForegroundColor Red
    Write-Host " ❌ Wystąpił błąd podczas wdrażania." -ForegroundColor Red
    Write-Host "========================================" -ForegroundColor Red
}
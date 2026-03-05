import os
import json
import urllib.request
import base64
import time
from urllib.error import HTTPError, URLError

JSON_PATH = r"C:\Users\BIURODOM\Desktop\JTMeble-Web\src\data\scraped_products.json"
OUTPUT_DIR = r"C:\Users\BIURODOM\Desktop\JTMeble-Web\public\images\products"
API_URL = "http://localhost:8080/api/restore"

def ensure_dir(path):
    if not os.path.exists(path):
        os.makedirs(path)

def download_image(url, save_path):
    # Pobieramy oryginalny plik jeśli to możliwe
    url = url.replace("home_default", "large_default") 
    
    try:
        req = urllib.request.Request(
            url, 
            headers={'User-Agent': 'Mozilla/5.0'}
        )
        with urllib.request.urlopen(req) as response:
            with open(save_path, 'wb') as f:
                f.write(response.read())
        return True
    except Exception as e:
        print(f"Błąd pobierania {url}: {e}")
        return False

def enhance_with_tissaia(file_path):
    filename = os.path.basename(file_path)
    print(f"[{filename}] Upscaling Tissaia (ONNX + Real-ESRGAN)...")
    
    try:
        with open(file_path, "rb") as f:
            raw_data = f.read()
    except Exception as e:
        print(f"Nie można odczytać pliku {file_path}: {e}")
        return False
        
    b64_img = base64.b64encode(raw_data).decode('utf-8')
    mime_type = "image/png" if filename.lower().endswith(".png") else "image/jpeg"
    
    payload = {
        "image_base64": b64_img,
        "mime_type": mime_type,
        "file_name": filename,
        "mode": "object" # Używamy tego samego udanego trybu
    }
    
    max_retries = 3
    for attempt in range(max_retries):
        req = urllib.request.Request(API_URL, data=json.dumps(payload).encode('utf-8'), headers={"Content-Type": "application/json"})
        try:
            t0 = time.time()
            with urllib.request.urlopen(req, timeout=300) as resp:
                data = json.loads(resp.read().decode('utf-8'))
                if "restored_base64" in data:
                    out_data = base64.b64decode(data["restored_base64"])
                    with open(file_path, "wb") as f_out:
                        f_out.write(out_data)
                    print(f"[{time.time()-t0:.1f}s] Zoptymalizowano! -> {filename}")
                    return True
                else:
                    print(f"Brak zrestaurowanego obrazu w odpowiedzi.")
                    return False
        except urllib.error.HTTPError as e:
            print(f"HTTP Error {e.code}: {e.read().decode('utf-8', errors='ignore')}")
            if e.code == 429:
                print("Rate limit reached. Sleeping 60s...")
                time.sleep(60)
            else:
                time.sleep(10)
        except Exception as e:
            print(f"Błąd Tissaia dla {filename} (Attempt {attempt+1}/{max_retries}): {e}")
            time.sleep(30)
            
    return False

def process_products():
    ensure_dir(OUTPUT_DIR)
    
    try:
        with open(JSON_PATH, 'r', encoding='utf-8') as f:
            data = json.load(f)
    except Exception as e:
        print(f"Błąd odczytu {JSON_PATH}: {e}")
        return
        
    products = data.get('products', [])
    print(f"Pobieranie i analizowanie AI dla {len(products)} zdjęć produktów...")
    
    # Przetwarzamy najpierw 10 jako demo, by nie zablokować serwera z miejsca setkami plików
    limit = 10
    processed = 0
    
    for product in products:
        if processed >= limit:
            break
            
        img_url = product.get('image')
        if not img_url:
            continue
            
        filename = img_url.split('/')[-1]
        local_path = os.path.join(OUTPUT_DIR, filename)
        
        if os.path.exists(local_path):
            print(f"Plik {filename} już istnieje. Pomijam pobieranie.")
            continue
            
        print(f"\n--- Produkt {processed+1}/{limit}: {product.get('name')} ---")
        if download_image(img_url, local_path):
            if enhance_with_tissaia(local_path):
                processed += 1
                time.sleep(15) # Chłodzenie po każdym wyrenderowanym przez ONNX pliku
            else:
                print("Tissaia zwróciła błąd. Zatrzymanie pliku w wersji bazowej.")
                processed += 1 # I tak pobrany

if __name__ == "__main__":
    process_products()
    print("\nZakończono demontaż i ulepszanie partii zdjęć produktów!")
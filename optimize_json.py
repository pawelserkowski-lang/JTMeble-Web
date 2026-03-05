import json
import os

JSON_PATH = r"C:\Users\BIURODOM\Desktop\JTMeble-Web\src\data\scraped_products.json"

def optimize_json():
    if not os.path.exists(JSON_PATH):
        print("Plik JSON nie istnieje.")
        return
        
    with open(JSON_PATH, 'r', encoding='utf-8') as f:
        data = json.load(f)
        
    products = data.get('products', [])
    print(f"Ilość przed optymalizacją: {len(products)}")
    
    unique_products = {}
    
    for p in products:
        name = p.get('name', '').strip()
        # Pomijamy puste nazwy
        if not name:
            continue
            
        # Jeśli produkt już jest w słowniku, aktualizujemy go tylko gdy nowy ma więcej danych (np. opis)
        if name in unique_products:
            existing = unique_products[name]
            if not existing.get('description') and p.get('description'):
                existing['description'] = p['description']
            if not existing.get('price') and p.get('price'):
                existing['price'] = p['price']
        else:
            unique_products[name] = p
            
    optimized_list = list(unique_products.values())
    print(f"Ilość po optymalizacji (usunięcie duplikatów i pustych): {len(optimized_list)}")
    
    with open(JSON_PATH, 'w', encoding='utf-8') as f:
        json.dump({"products": optimized_list}, f, ensure_ascii=False, indent=2)

if __name__ == "__main__":
    optimize_json()
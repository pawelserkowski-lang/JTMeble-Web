import json
import os

def analyze_descriptions():
    json_path = os.path.join('src', 'data', 'scraped_products.json')
    
    if not os.path.exists(json_path):
        print(f"Błąd: Nie znaleziono pliku {json_path}")
        return

    with open(json_path, 'r', encoding='utf-8') as f:
        data = json.load(f)

    products = data.get('products', [])
    total_products = len(products)
    
    if total_products == 0:
        print("Brak produktów do analizy.")
        return

    empty_descriptions = []
    short_descriptions = [] # poniżej 10 słów
    good_descriptions = []
    
    total_words = 0

    for idx, product in enumerate(products):
        name = product.get('name', f'Produkt #{idx}')
        desc = product.get('description', '')
        
        if not desc or desc.strip() == '':
            empty_descriptions.append(name)
            continue
            
        # Zliczanie słów (proste podzielenie po spacji)
        words = desc.split()
        word_count = len(words)
        total_words += word_count
        
        if word_count < 10:
            short_descriptions.append((name, word_count, desc))
        else:
            good_descriptions.append((name, word_count))

    print("=" * 50)
    print(" RAPORT ANALIZY OPISÓW PRODUKTÓW (PrestaShop -> JSON)")
    print("=" * 50)
    print(f"Całkowita liczba produktów: {total_products}")
    print(f"Produkty z całkowicie pustym opisem: {len(empty_descriptions)} ({len(empty_descriptions)/total_products*100:.1f}%)")
    print(f"Produkty ze zbyt krótkim opisem (< 10 słów): {len(short_descriptions)} ({len(short_descriptions)/total_products*100:.1f}%)")
    print(f"Produkty z poprawnym opisem: {len(good_descriptions)} ({len(good_descriptions)/total_products*100:.1f}%)")
    
    if len(good_descriptions) + len(short_descriptions) > 0:
        avg_words = total_words / (len(good_descriptions) + len(short_descriptions))
        print(f"Średnia długość niepustego opisu: {avg_words:.1f} słów")
    
    print("\n--- TOP 10 produktów bez opisu (wymagają copywritingu!) ---")
    for name in empty_descriptions[:10]:
        print(f" [BRAK] {name}")
        
    if len(short_descriptions) > 0:
        print("\n--- Przykładowe produkty z krótkim opisem ---")
        for name, count, text in short_descriptions[:5]:
            print(f" [INFO] {name} ({count} słów) -> \"{text[:50]}...\"")

if __name__ == "__main__":
    analyze_descriptions()
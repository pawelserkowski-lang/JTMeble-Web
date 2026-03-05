import os
import json
from bs4 import BeautifulSoup
import re

WGET_DIR = r"C:\Users\BIURODOM\Desktop\jtmebel_wget\jtmebel.pl"
OUTPUT_JSON = r"C:\Users\BIURODOM\Desktop\JTMeble-Web\src\data\scraped_products.json"

def clean_text(text):
    if not text:
        return ""
    return " ".join(text.replace('\n', ' ').split())

def fast_scrape():
    products = {}
    print(f"Szybkie skanowanie wybranych plików w: {WGET_DIR}")
    
    # Przeszukujemy tylko kilka głównych plików dla szybkości
    files_to_check = ['index.html', '322-plac-zabaw.html', '360-krzesla-przedszkolne.html', '368-stoly-przedszkolne.html', '499-kolekcja-mini.html']
    
    for filename in files_to_check:
        file_path = os.path.join(WGET_DIR, filename)
        if not os.path.exists(file_path):
            continue
            
        try:
            with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                soup = BeautifulSoup(f, 'html.parser')
                
                # 1. Sprawdzanie list produktów
                articles = soup.find_all('article', class_='product-miniature')
                for article in articles:
                    title_tag = article.find('h3', class_='product-title') or article.find('span', class_='product-title') or article.find('a', class_='product-miniature__title')
                    title = clean_text(title_tag.get_text()) if title_tag else ""
                    
                    price_tag = article.find('span', class_='price') or article.find('span', class_='product-miniature__price')
                    price = clean_text(price_tag.get_text()) if price_tag else ""
                    
                    img_tag = article.find('img')
                    img_url = img_tag['src'] if img_tag and 'src' in img_tag.attrs else ""
                    
                    if title and title not in products:
                        products[title] = {
                            "name": title,
                            "price": price,
                            "image": img_url,
                            "category": filename.replace('.html', '').replace('-', ' ').title(),
                            "description": "Opis zaimportowany ze starej strony."
                        }
        except Exception as e:
            print(f"Błąd pliku {filename}: {e}")
            
    product_list = list(products.values())
    print(f"Znaleziono {len(product_list)} produktów w szybkim skanie.")
    
    os.makedirs(os.path.dirname(OUTPUT_JSON), exist_ok=True)
    with open(OUTPUT_JSON, 'w', encoding='utf-8') as f:
        json.dump({"products": product_list}, f, ensure_ascii=False, indent=2)

if __name__ == "__main__":
    fast_scrape()
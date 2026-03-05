import os
import json
from bs4 import BeautifulSoup

WGET_DIR = r"C:\Users\BIURODOM\Desktop\jtmebel_wget\jtmebel.pl"
OUTPUT_JSON = r"C:\Users\BIURODOM\Desktop\JTMeble-Web\src\data\scraped_products.json"

def clean_text(text):
    if not text:
        return ""
    return " ".join(text.replace('\n', ' ').split())

def scrape_products():
    products = {}
    
    print(f"Przeszukiwanie folderu: {WGET_DIR}")
    
    if not os.path.exists(WGET_DIR):
        print("Folder pobierania wget jeszcze nie istnieje.")
        return
        
    for root, dirs, files in os.walk(WGET_DIR):
        for file in files:
            if file.endswith('.html'):
                file_path = os.path.join(root, file)
                
                try:
                    with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                        soup = BeautifulSoup(f, 'html.parser')
                        
                        # 1. Sprawdzanie list produktów (na stronach kategorii)
                        articles = soup.find_all('article', class_='product-miniature')
                        for article in articles:
                            title_tag = article.find('h3', class_='product-title') or article.find('span', class_='product-title') or article.find('a', class_='product-miniature__title')
                            title = clean_text(title_tag.get_text()) if title_tag else ""
                            
                            price_tag = article.find('span', class_='price') or article.find('span', class_='product-miniature__price')
                            price = clean_text(price_tag.get_text()) if price_tag else ""
                            
                            img_tag = article.find('img')
                            img_url = img_tag['src'] if img_tag and 'src' in img_tag.attrs else ""
                            
                            url_tag = article.find('a', class_='thumbnail')
                            url = url_tag['href'] if url_tag and 'href' in url_tag.attrs else ""
                            
                            if title and title not in products:
                                products[title] = {
                                    "name": title,
                                    "price": price,
                                    "image": img_url,
                                    "url": url,
                                    "source": "category_listing",
                                    "description": ""
                                }
                                
                        # 2. Sprawdzanie strony pojedynczego produktu (szczegóły)
                        product_block = soup.find('div', id='product-info-container') or soup.find('div', class_='product-container')
                        if product_block:
                            title_tag = soup.find('h1', class_='h1') or soup.find('h1', itemprop='name')
                            title = clean_text(title_tag.get_text()) if title_tag else ""
                            
                            if title:
                                price_tag = soup.find('span', itemprop='price') or soup.find('span', class_='current-price')
                                price = clean_text(price_tag.get_text()) if price_tag else ""
                                
                                desc_tag = soup.find('div', id='description') or soup.find('div', class_='product-description')
                                description = clean_text(desc_tag.get_text()) if desc_tag else ""
                                
                                img_tag = soup.find('img', class_='js-qv-product-cover') or soup.find('img', itemprop='image')
                                img_url = img_tag['src'] if img_tag and 'src' in img_tag.attrs else ""
                                
                                if title in products:
                                    products[title]["description"] = description
                                    if img_url:
                                        products[title]["image"] = img_url
                                    products[title]["source"] = "product_page"
                                else:
                                    products[title] = {
                                        "name": title,
                                        "price": price,
                                        "image": img_url,
                                        "url": "",
                                        "description": description,
                                        "source": "product_page"
                                    }
                                
                except Exception as e:
                    pass
                    
    product_list = list(products.values())
    print(f"\nProces zakończony. Znaleziono łącznie {len(product_list)} unikalnych produktów.")
    
    # Zapis do pliku JSON
    os.makedirs(os.path.dirname(OUTPUT_JSON), exist_ok=True)
    with open(OUTPUT_JSON, 'w', encoding='utf-8') as f:
        json.dump({"products": product_list}, f, ensure_ascii=False, indent=2)
        
    print(f"Zapisano dane do: {OUTPUT_JSON}")

if __name__ == "__main__":
    scrape_products()
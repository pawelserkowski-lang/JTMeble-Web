import https from 'https';

https.get('https://jtmebel.pl/11-katalog-i-cennik-pdf', (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
        const regex = /<a[^>]+href=["']([^"']+)["']/gi;
        let match;
        const links = new Set();
        while ((match = regex.exec(data)) !== null) {
            if(match[1].includes('pdf') || match[1].includes('katalog') || match[1].includes('cennik') || match[1].includes('drive') || match[1].includes('dropbox')) {
                links.add(match[1]);
            }
        }
        console.log("Znalezione linki ofert/katalogow:");
        links.forEach(l => console.log(l));
    });
});

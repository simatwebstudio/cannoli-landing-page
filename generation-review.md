# Generation review - Cannolì

## Controllo finale

### Specificità cliente

Il sito è costruito su Cannolì come boutique siciliana a Bra: headline, menu, prodotti, indirizzo, Deliveroo, Instagram, foto del locale, foto del proprietario e orari trascritti sono tutti specifici del cliente. Non usa testi generici da attività locale.

### Landing memorabile o scheda informativa?

Sembra una landing memorabile o una scheda informativa? Sembra una landing memorabile: la prima schermata dà priorità a promessa, foto prodotto e due CTA, mentre telefono, orari, indirizzo e dati legali restano più sotto.

### Differenza da layout generico

La sequenza non è la classica hero/about/menu/gallery/contact. Il menu arriva subito dopo la hero perché è una priorità commerciale, lo slider split-image dà ritmo ai prodotti, la sezione artigianale usa la foto del proprietario come prova di manualità e la parte operativa chiude la pagina.

### Uso reale di asset, logo e menu

- Logo usato nella nav e come favicon/manifest.
- Foto hero usata sopra la piega con crop prodotto-locale.
- Foto prodotti usate nello slider, una alla volta.
- Foto proprietario usata nella sezione artigianalità.
- Immagini menu lette e trascritte in testo accessibile; sono disponibili anche come lavagne originali consultabili.
- Immagine orari non pubblicata: gli orari sono stati trascritti nel contenuto.

### Responsive

Il layout passa da due colonne a verticale su tablet/mobile. Lo slider diventa immagine sopra e testo sotto, il menu mobile usa `aria-expanded`, i prezzi restano leggibili e i bottoni si impilano senza overflow.

### SEO

Presenti title, meta description, robots, Open Graph, Twitter card, JSON-LD per attività food, manifest, robots.txt e sitemap.xml. Canonical e sitemap usano un dominio previsto `https://cannoli-bra.it/`, da aggiornare se il dominio finale sarà diverso.

### Accessibilità

Presenti struttura semantica, skip link, alt text descrittivi, focus visibile, contrasto alto, navigazione tastiera per slider, controlli con aria-label, badge apertura con aria-live e rispetto di `prefers-reduced-motion`.

### Compromessi

- Privacy e Cookie Policy sono pagine placeholder tecniche, non testi legali definitivi.
- La mappa Google è incorporata come richiesto; prima della pubblicazione definitiva va collegata alla gestione consenso se necessario.
- Il controllo `node --check output/script.js` diretto è stato bloccato dal sandbox sul percorso utente, ma la stessa verifica sintattica è passata leggendo il file da stdin.

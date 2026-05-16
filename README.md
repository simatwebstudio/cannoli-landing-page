# Cannolì Bra static site

Sito statico HTML/CSS/JS per Cannolì, locale siciliano a Bra specializzato in cannoli artigianali, ricotta fresca e specialità dolci e salate.

## Struttura

- `index.html`: landing principale con hero, menu, slider prodotti, artigianalità, orari e mappa.
- `styles.css`: stile globale responsive, palette, layout e animazioni leggere.
- `script.js`: menu mobile, stato apertura, slider accessibile, reveal e parallax leggero.
- `404.html`: pagina errore coerente con il sito.
- `privacy.html` e `cookie.html`: URL predisposti con testo provvisorio da validare.
- `assets/`: immagini reali copiate dagli asset forniti.
- `design-brief.json`, `creative-brief.md`, `generation-review.md`: documentazione del processo creativo e della revisione.

## Decisioni distintive

1. Hero editoriale chiara con foto reale del cannolo davanti al locale, invece di una scheda contatti.
2. Menu completo trascritto dalle lavagne, leggibile e accessibile, con immagini originali solo come supporto.
3. Slider split-image dedicato alle specialità, una immagine alla volta, con controlli accessibili e swipe mobile.

## Come aprire

Il sito è statico: aprire `index.html` in browser oppure servire la cartella `output/` con qualsiasi server statico.

## Note operative

- Google Fonts è l'unica dipendenza esterna di design.
- La mappa usa un iframe Google Maps per Via Audisio 19, Bra.
- Canonical, `robots.txt` e `sitemap.xml` usano `https://cannoli-bra.it/` come URL di produzione previsto: aggiornarlo se il dominio finale è diverso.
- Privacy e Cookie Policy sono placeholder tecnici, non testi legali definitivi.

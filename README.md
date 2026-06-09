# Crafted Stories — Technische documentatie

Statische website voor [Crafted Stories](https://www.craftedstories.nl), een sociale onderneming van Scharlaken Koord op Noordermarkt 45, Amsterdam.

---

## Hosting

- **Platform:** GitHub Pages (gratis, automatisch gedeployed bij push naar `main`)
- **Domeinnaam:** geconfigureerd via `CNAME`-bestand (`www.craftedstories.nl`)
- **Repository:** `https://github.com/raket-online/craftedstories`

Elke `git push` naar `main` triggert automatisch een nieuwe deploy. Dit duurt doorgaans 1–2 minuten.

---

## Structuur

```
craftedstories/
├── index.html          # Homepage
├── producten.html      # Collectie-pagina
├── over-ons.html       # Over ons-pagina
├── contact.html        # Contactpagina + FAQ accordion
├── 404.html            # Slimme redirect voor oude geïndexeerde URLs
├── sitemap.xml         # Sitemap voor zoekmachines
├── robots.txt          # Instructies voor crawlers
├── favicon.svg         # Favicon (maroon cirkel met "CS")
├── logo.webp           # Logo (gebruikt in navigatie en footer)
├── CNAME               # Domeinconfiguratie voor GitHub Pages
│
├── images/
│   ├── *.webp          # Geoptimaliseerde afbeeldingen (gebruik deze)
│   ├── *_ORG.jpg       # Originele afbeeldingen (archief, niet gebruikt)
│   └── logos/          # Leverancierslogo's (PNG/JPG)
│
├── src/
│   └── input.css       # CSS-bronbestand (Tailwind directives + custom CSS)
│
├── tailwind.css        # Gebouwde CSS (gegenereerd, niet handmatig aanpassen)
├── tailwind.config.js  # Tailwind-configuratie (kleuren, fonts)
├── build.js            # Build-script (zie hieronder)
├── package.json        # NPM-configuratie
└── node_modules/       # NPM-packages (niet in git, via .gitignore)
```

---

## CSS aanpassen

De CSS wordt gebouwd met [Tailwind CSS v3](https://tailwindcss.com). Aanpassingen doe je altijd in `src/input.css`, nooit direct in `tailwind.css`.

### Kleuren (brand tokens)

Gedefinieerd in `tailwind.config.js`:

| Token         | Hex-waarde | Gebruik                        |
|---------------|------------|-------------------------------|
| `primary`     | `#941a10`  | Rood — knoppen, accenten       |
| `primary-dark`| `#6d1209`  | Donkerrood — hover-states      |
| `primary-light`| `#b82214` | Lichtrood                      |
| `cream`       | `#f0ebe0`  | Crème — achtergrond            |
| `cream-dark`  | `#e2d9c8`  | Donkercreme — randen           |
| `warm-brown`  | `#2c1810`  | Donkerbruin — tekst            |
| `warm-gray`   | `#6b5a52`  | Warmgrijs — subtekst           |

### Fonts

- **Koppen** (h1–h4): Playfair Display (serif) — geladen via Google Fonts
- **Broodtekst**: Lato (sans-serif) — geladen via Google Fonts

### Na een CSS-aanpassing: build uitvoeren

```bash
npm run build
```

Dit doet twee dingen automatisch:
1. Tailwind compileert `src/input.css` → `tailwind.css` (alleen gebruikte classes, geminificeerd)
2. `build.js` injecteert de CSS inline in alle HTML-bestanden (verwijdert een extern request)

Daarna gewoon committen en pushen:

```bash
git add -A
git commit -m "Beschrijving van de aanpassing"
git push
```

---

## Meertaligheid (NL/EN)

De site is volledig Nederlandstalig met een Engelse vertaling, geschakeld via JavaScript zonder extra pagina's.

- Teksten in het NL zijn gewikkeld in `<span data-lang="nl">` of `<div data-lang="nl">`
- Teksten in het EN zijn gewikkeld in `<span data-lang="en">` of `<div data-lang="en">`
- De actieve taal wordt opgeslagen in `localStorage` onder de key `cs-lang`
- Bij laden wordt `html[lang]` ingesteld op `nl` of `en`, wat de CSS-regels in `src/input.css` triggert

Voorbeeld:
```html
<span data-lang="nl">Welkom in onze winkel</span>
<span data-lang="en">Welcome to our shop</span>
```

---

## Formulier (contact)

Het contactformulier verzendt via [Formspark](https://formspark.io).

- **Endpoint:** `https://submit-form.com/lHV7w6vWl`
- Verzending via `fetch()` met JSON body
- Spambescherming via een honeypot-veld (`name="_honeypot"`, verborgen met CSS)
- Formspark stuurt e-mailnotificaties naar het gekoppelde adres

---

## SEO & Local Business

- **Structured data** (JSON-LD in `<head>` van `index.html`): type `Store` + `LocalBusiness`, inclusief openingstijden, adres, Google Maps-link en Instagram
- **hreflang** op alle pagina's: `nl`, `en`, `x-default` — allemaal verwijzend naar de NL-URL (zelfde pagina, JS-taalwisseling)
- **Open Graph + Twitter Card** meta-tags op alle pagina's
- **Sitemap:** `sitemap.xml` in de root, geregistreerd in `robots.txt`
- **Google Business Profile:** afzonderlijk beheerd via Google, gekoppeld via `sameAs` in structured data

---

## Afbeeldingen

Alle productfoto's staan in `images/` als geoptimaliseerde WebP (max 900px breed, ~150KB per stuk). De originele JPG's staan als `*_ORG.jpg` als archief.

Bij het toevoegen van nieuwe afbeeldingen:
1. Sla het origineel op als `beschrijvende-naam_ORG.jpg`
2. Maak een geoptimaliseerde WebP-versie (max 900px, kwaliteit 82):
   ```bash
   python3 -c "
   from PIL import Image
   img = Image.open('images/naam_ORG.jpg').convert('RGB')
   w, h = img.size
   if max(w,h) > 900:
       scale = 900 / max(w,h)
       img = img.resize((round(w*scale), round(h*scale)))
   img.save('images/naam.webp', 'WEBP', quality=82)
   "
   ```
3. Gebruik de `.webp`-versie in de HTML met een beschrijvende `alt`-tekst

---

## Leverancierslogo's

Logo's staan in `images/logos/`. Sommige hebben een CSS-filter nodig voor zichtbaarheid op de crème achtergrond:

| Logo             | Filter                     | Reden                    |
|------------------|---------------------------|--------------------------|
| `imbarro.png`    | `filter: invert(1)`       | Wit logo                 |
| `coffeelovers.png`| `filter: invert(1)`      | Wit logo                 |
| `clothed.png`    | `filter: brightness(0)`   | Deels wit logo           |
| `vmr.png`        | `filter: brightness(0)`   | Deels wit/paarse achtergrond |

---

## Lokale ontwikkeling

```bash
# Vereisten: Node.js, Python 3 met Pillow
npm install          # eerste keer

# CSS aanpassen en live preview
npm run watch        # herbouwt tailwind.css bij elke save
# Open index.html direct in de browser (geen server nodig)

# Klaar om te deployen
npm run build        # bouwt + injecteert CSS in alle HTML
git add -A && git commit -m "..." && git push
```

---

## Veelvoorkomende taken

**Openingstijden aanpassen**
→ Zoek in `index.html` naar `openingHoursSpecification` (JSON-LD) én naar de zichtbare openingstijdentekst in de HTML zelf. Beide aanpassen.

**Nieuw leveranciersmerk toevoegen**
→ Voeg het logo toe aan `images/logos/` en kopieer een bestaand `<div class="...">` blok in de merken-sectie van zowel `index.html` als `producten.html`.

**Tekst aanpassen**
→ Alle teksten staan direct in de HTML-bestanden. Pas zowel `data-lang="nl"` als `data-lang="en"` versies aan.

**Formulier-ontvanger wijzigen**
→ Log in op [formspark.io](https://formspark.io) en pas het gekoppelde e-mailadres aan via het dashboard. De code hoeft niet aangepast te worden.

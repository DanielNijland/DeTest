# De Mol - Testomgeving

Deze map bevat een statische testomgeving voor GitHub Pages met Google Sheets-koppeling.

## Bestanden

- `index.html` - de webpagina
- `style.css` - de vormgeving
- `config.js` - kandidaten, vragen, juiste antwoorden en Google Script URL
- `app.js` - de testlogica
- `logo.png` - het logo
- `google-apps-script.gs` - script voor Google Sheets

## Vragen aanpassen

Open `config.js`.

Een vraag met alle kandidaten als antwoordopties:

```js
{
  question: "Wie is de Mol?",
  options: "candidates",
  correctAnswer: "Hanneke"
}
```

Een vraag met losse meerkeuze-opties:

```js
{
  question: "Waar bevond de Mol zich tijdens opdracht 5?",
  options: ["Links", "Rechts", "Midden", "Niet aanwezig"],
  correctAnswer: "Links"
}
```

## Google Sheets koppelen

1. Maak een nieuwe Google Sheet.
2. Ga naar `Extensies > Apps Script`.
3. Plak de inhoud van `google-apps-script.gs`.
4. Klik op `Deploy > New deployment`.
5. Kies type: `Web app`.
6. Execute as: `Me`.
7. Who has access: `Anyone`.
8. Kopieer de Web app URL.
9. Plak die URL in `config.js` bij `googleScriptUrl`.

## GitHub Pages publiceren

1. Maak een nieuwe GitHub repository.
2. Upload alle bestanden uit deze map.
3. Ga naar `Settings > Pages`.
4. Kies `Deploy from branch`.
5. Kies branch `main` en folder `/root`.
6. Na ongeveer een minuut staat de test online.

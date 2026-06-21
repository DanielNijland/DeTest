// PAS DIT BESTAND AAN VOOR JULLIE TEST

const CONFIG = {
  testName: "Test 1",
  durationMinutes: 20,

  // Plak hier de URL van je Google Apps Script Web App.
  // Zolang deze leeg is, werkt de test lokaal maar wordt niets online opgeslagen.
  googleScriptUrl: "https://script.google.com/macros/s/AKfycbwe07yrbPZPlD3uK2T7COSUnsYym_Scqcdvolqq0w8MhhE9NEoAJHpwJEBxSEFZhGX5/exec",

  candidates: [
    "Hanneke",
    "Jelle",
    "Pascalle",
    "Matthias",
    "Luuk",
    "Julliette",
    "Pim",
    "David",
    "Roomy",
    "Robert Jan"
  ],

  // Je mag per vraag zelf opties invullen.
  // Gebruik options: "candidates" als alle kandidaten antwoordopties zijn.
  questions: [
    {
      question: "Wie is de Mol?",
      options: "candidates",
      correctAnswer: "Hanneke"
    },
    {
      question: "Wie stond links tijdens opdracht 1?",
      options: ["Hanneke", "Jelle", "Pascalle", "Matthias"],
      correctAnswer: "Jelle"
    },
    {
      question: "Waar bevond de Mol zich tijdens opdracht 5?",
      options: ["Links", "Rechts", "Midden", "Niet aanwezig"],
      correctAnswer: "Links"
    },
    {
      question: "Wie droeg tijdens opdracht 2 iets groens?",
      options: "candidates",
      correctAnswer: "Pascalle"
    },
    {
      question: "Met wie werkte de Mol samen tijdens opdracht 3?",
      options: "candidates",
      correctAnswer: "Luuk"
    },
    {
      question: "Wat deed de Mol bij de foto-opdracht?",
      options: ["Foto's maken", "Mensen aanspreken", "Tijd bewaken", "Niets opvallends"],
      correctAnswer: "Tijd bewaken"
    },
    {
      question: "In welke groep zat de Mol tijdens opdracht 4?",
      options: ["Groep 1", "Groep 2", "Groep 3", "De Mol werkte alleen"],
      correctAnswer: "Groep 2"
    },
    {
      question: "Wie zat er naast de Mol tijdens het ontbijt?",
      options: "candidates",
      correctAnswer: "David"
    },
    {
      question: "Welke kleur had het kledingstuk van de Mol bij opdracht 6?",
      options: ["Zwart", "Wit", "Groen", "Blauw"],
      correctAnswer: "Zwart"
    },
    {
      question: "Hoe gedroeg de Mol zich tijdens de laatste opdracht?",
      options: ["Fanatiek", "Rustig", "Chaotisch", "Afwachtend"],
      correctAnswer: "Afwachtend"
    },
    {
      question: "Wie vertrouwde de Mol het minst?",
      options: "candidates",
      correctAnswer: "Roomy"
    },
    {
      question: "Welke rol nam de Mol vooral op zich?",
      options: ["Leider", "Volger", "Rekenaar", "Onderhandelaar"],
      correctAnswer: "Volger"
    },
    {
      question: "Waar stond de Mol bij de uitleg van opdracht 2?",
      options: ["Links", "Rechts", "Vooraan", "Achteraan"],
      correctAnswer: "Achteraan"
    },
    {
      question: "Wie maakte de meeste oogcontact met de Mol?",
      options: "candidates",
      correctAnswer: "Robert Jan"
    },
    {
      question: "Wat koos de Mol tijdens de keuzeopdracht?",
      options: ["Geld", "Tijd", "Informatie", "Niets"],
      correctAnswer: "Informatie"
    },
    {
      question: "Welke kandidaat noemde de Mol als verdacht?",
      options: "candidates",
      correctAnswer: "Pim"
    },
    {
      question: "Wat was de houding van de Mol tijdens de briefing?",
      options: ["Actief", "Afwezig", "Grappig", "Serieus"],
      correctAnswer: "Afwezig"
    },
    {
      question: "In welk team zat de Mol bij de stadsopdracht?",
      options: ["Team Noord", "Team Zuid", "Team Centrum", "Geen team"],
      correctAnswer: "Team Centrum"
    },
    {
      question: "Wie liep er vlak achter de Mol?",
      options: "candidates",
      correctAnswer: "Matthias"
    },
    {
      question: "Wie is de Mol?",
      options: "candidates",
      correctAnswer: "Hanneke"
    }
  ]
};

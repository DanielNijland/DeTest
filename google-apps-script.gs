function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  let sheet = ss.getSheetByName("Inzendingen");
  if (!sheet) {
    sheet = ss.insertSheet("Inzendingen");
  }

  const questionCount = data.antwoorden.length;

  if (sheet.getLastRow() === 0) {
    const headers = [
      "Tijdstip",
      "Test",
      "Kandidaat",
      "Score",
      "Totaal",
      "Tijd over (sec)",
      "Tijd verstreken (sec)",
      "Automatisch ingeleverd"
    ];

    for (let i = 1; i <= questionCount; i++) {
      headers.push("Vraag " + i);
    }

    for (let i = 1; i <= questionCount; i++) {
      headers.push("Correct " + i);
    }

    sheet.appendRow(headers);
  }

  const row = [
    data.tijdstip,
    data.testName,
    data.kandidaat,
    data.score,
    data.totaal,
    data.tijdOverSeconden,
    data.tijdVerstrekenSeconden,
    data.automatischIngeleverd
  ];

  data.antwoorden.forEach(answer => row.push(answer));
  data.juisteAntwoorden.forEach(answer => row.push(answer));

  sheet.appendRow(row);

  updateScores_(ss);

  return ContentService
    .createTextOutput(JSON.stringify({ status: "ok" }))
    .setMimeType(ContentService.MimeType.JSON);
}

function updateScores_(ss) {
  const input = ss.getSheetByName("Inzendingen");
  if (!input) return;

  let scores = ss.getSheetByName("Scores");
  if (!scores) scores = ss.insertSheet("Scores");
  scores.clear();

  const values = input.getDataRange().getValues();
  if (values.length < 2) return;

  const headers = values[0];
  const kandidaatIndex = headers.indexOf("Kandidaat");
  const scoreIndex = headers.indexOf("Score");
  const totaalIndex = headers.indexOf("Totaal");
  const testIndex = headers.indexOf("Test");
  const tijdIndex = headers.indexOf("Tijdstip");

  const rows = values.slice(1).map(row => ({
    tijd: row[tijdIndex],
    test: row[testIndex],
    kandidaat: row[kandidaatIndex],
    score: row[scoreIndex],
    totaal: row[totaalIndex]
  }));

  rows.sort((a, b) => {
    if (a.score !== b.score) return a.score - b.score;
    return new Date(a.tijd) - new Date(b.tijd);
  });

  scores.appendRow(["Ranking", "Kandidaat", "Score", "Totaal", "Test", "Tijdstip"]);
  rows.forEach((row, index) => {
    scores.appendRow([index + 1, row.kandidaat, row.score, row.totaal, row.test, row.tijd]);
  });
}

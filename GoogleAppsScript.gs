const SHEET_NAME = 'Dati';

// ================================================================
//  Helper risposta: JSON puro, oppure JSONP se arriva ?callback=...
//  JSONP serve come fallback robusto su iOS (non soffre il redirect 302).
// ================================================================
function _rispondi(e, obj) {
  var json = JSON.stringify(obj);
  var cb = (e && e.parameter && e.parameter.callback) ? e.parameter.callback : null;
  if (cb) {
    // Sanifico il nome callback: solo lettere, numeri, _ e .
    cb = String(cb).replace(/[^a-zA-Z0-9_.]/g, '');
    return ContentService
      .createTextOutput(cb + '(' + json + ');')
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return ContentService
    .createTextOutput(json)
    .setMimeType(ContentService.MimeType.JSON);
}

// ================================================================
//  doGet — SOLA LETTURA. Restituisce le ultime N righe in JSON.
//  Non scrive NULLA. Non tocca doPost. Usato dal Tab "Ultime".
//  Chiamata: GET <url>?action=ultime&n=7   (+ &callback=fn per JSONP)
// ================================================================
function doGet(e) {
  try {
    var n = 7;
    if (e && e.parameter && e.parameter.n) {
      var parsed = parseInt(e.parameter.n, 10);
      if (!isNaN(parsed) && parsed > 0 && parsed <= 50) {
        n = parsed;
      }
    }

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME);

    if (!sheet) {
      return _rispondi(e, { status: "error", message: "Foglio '" + SHEET_NAME + "' non trovato" });
    }

    var lastRow = sheet.getLastRow();

    // Nessuna riga dati (solo header o foglio vuoto)
    if (lastRow <= 1) {
      return _rispondi(e, { status: "success", righe: [] });
    }

    var numDati = lastRow - 1;              // righe dati (escluso header in riga 1)
    var quante = Math.min(n, numDati);
    var startRow = lastRow - quante + 1;    // prima riga del blocco da leggere

    // 11 colonne: A..K (vedi header in doPost)
    var range = sheet.getRange(startRow, 1, quante, 11);
    var values = range.getValues();          // valori grezzi (per importo numerico)
    var display = range.getDisplayValues();  // valori come mostrati nel foglio (date in gg/mm/aaaa)

    var righe = [];
    for (var i = 0; i < values.length; i++) {
      var r = values[i];
      var d = display[i];
      righe.push({
        timestamp:         d[0],             // "08/05/2026 12:30:14" come nel foglio
        dataSpesa:         d[1],             // "04/05/2026" come nel foglio
        importo:           r[2],             // numero grezzo, per colore/segno
        destinazione:      d[3],
        categoria:         d[4],
        sottocategoria:    d[5],
        conto:             d[6],
        note:              d[7],
        fonte:             d[8],
        tipo:              d[9],
        contoDestinazione: d[10]
      });
    }

    // Ordine: la più recente per prima
    righe.reverse();

    return _rispondi(e, { status: "success", righe: righe });

  } catch (err) {
    return _rispondi(e, { status: "error", message: err.toString() });
  }
}

function doPost(e) {
  try {
    var contents = e.postData.contents;
    var data = JSON.parse(contents);

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME);

    if (!sheet) {
      throw new Error("Foglio '" + SHEET_NAME + "' non trovato");
    }

    var lastRow = sheet.getLastRow();
    var newRow = lastRow + 1;

    if (lastRow === 0) {
      var headers = ['Timestamp', 'Data_Spesa', 'Importo', 'Destinazione', 
                     'Categoria', 'Sottocategoria', 'Conto', 'Note', 
                     'Fonte', 'Tipo', 'Conto_Destinazione'];
      for (var i = 0; i < headers.length; i++) {
        sheet.getRange(1, i + 1).setValue(headers[i]);
      }
      newRow = 2;
    }

    // ========== TIMESTAMP con data e ora ==========
    var now = new Date();
    var timestamp = Utilities.formatDate(now, Session.getScriptTimeZone(), 'dd/MM/yyyy HH:mm:ss');

    // ========== DATA_SPESA in formato italiano gg/mm/aaaa ==========
    var dataSpesaIT = '';
    if (data.dataSpesa) {
      var parts = data.dataSpesa.split('-'); // arriva come yyyy-mm-dd
      if (parts.length === 3) {
        dataSpesaIT = parts[2] + '/' + parts[1] + '/' + parts[0]; // gg/mm/aaaa
      }
    }

    // Scrittura cella per cella
    sheet.getRange(newRow, 1).setValue(timestamp);                           // A: Timestamp
    sheet.getRange(newRow, 2).setValue(dataSpesaIT);                         // B: Data_Spesa (gg/mm/aaaa)
    sheet.getRange(newRow, 3).setValue(data.importo || 0);                   // C: Importo
    sheet.getRange(newRow, 4).setValue(data.destinazione || '');             // D: Destinazione
    sheet.getRange(newRow, 5).setValue(data.categoria || '');                  // E: Categoria
    sheet.getRange(newRow, 6).setValue(data.sottocategoria || '');             // F: Sottocategoria
    sheet.getRange(newRow, 7).setValue(data.conto || '');                    // G: Conto
    sheet.getRange(newRow, 8).setValue(data.note || '');                     // H: Note
    sheet.getRange(newRow, 9).setValue(data.fonte || 'iPhone');              // I: Fonte
    sheet.getRange(newRow, 10).setValue(data.tipo || '');                    // J: Tipo
    sheet.getRange(newRow, 11).setValue(data.contoDestinazione || '');       // K: Conto_Destinazione

    return ContentService.createTextOutput(JSON.stringify({
      status: "success"
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error", 
      message: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
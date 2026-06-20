const SHEET_NAME = 'Dati';

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
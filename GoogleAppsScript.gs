// ================================================================
//  GOOGLE APPS SCRIPT — Backend PWA Finanza Personale
//
//  SETUP:
//  1. Apri il tuo Google Sheet Inbox
//  2. Estensioni → Apps Script
//  3. Incolla tutto questo codice
//  4. Salva (Ctrl+S)
//  5. Distribuisci → Nuova distribuzione → Tipo: App web
//     - Esegui come: Me
//     - Chi ha accesso: Chiunque
//  6. Autorizza e copia l'URL generato
//  7. Incolla l'URL nel file config.js della PWA (APPS_SCRIPT_URL)
// ================================================================

const SHEET_NAME = 'Form_Responses'; // nome del foglio nel tuo Google Sheet

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME)
                  || SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];

    // Se il foglio è vuoto, crea intestazioni
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Informazioni Cronologiche',
        'Data della Spesa',
        'Importo della Spesa',
        'Destinazione',
        'Macro Categoria',
        'Conto',
        'Note / Commenti',
        'Tipologia Transazione'
      ]);
    }

    // Appende la riga con i dati ricevuti dalla PWA
    sheet.appendRow([
      new Date(),                  // A: Timestamp inserimento
      new Date(data.data),         // B: Data della spesa
      parseFloat(data.importo),    // C: Importo
      data.destinazione || '',     // D: Destinazione
      data.macroCategoria || '',   // E: Macro Categoria
      data.conto || '',            // F: Conto
      data.note || '',             // G: Note
      data.tipo || 'Uscita'        // H: Tipo (Entrata/Uscita)
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Test: esegui questa funzione manualmente per verificare che tutto funzioni
function testPost() {
  const fake = {
    postData: {
      contents: JSON.stringify({
        data: new Date().toISOString(),
        importo: 25.50,
        destinazione: 'Personale',
        macroCategoria: 'Cibo',
        conto: 'Carta AMEX',
        note: 'Test da Apps Script',
        tipo: 'Uscita'
      })
    }
  };
  const result = doPost(fake);
  Logger.log(result.getContent());
}

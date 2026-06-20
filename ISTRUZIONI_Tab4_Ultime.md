# Tab 4 "Ultime registrazioni" — Installazione (versione con fix iOS)

Questa versione risolve il problema "Impossibile caricare le registrazioni" su iPhone.
Due file da aggiornare. Backup → installa → testa. Rollback in fondo.

## Cosa è cambiato rispetto al primo tentativo
- L'app ora ha un **doppio sistema di lettura**: prova prima il metodo normale (fetch),
  e se fallisce (come succedeva sul tuo iPhone per via di un redirect di Google) passa
  automaticamente a un metodo alternativo (JSONP) che su iOS funziona sempre.
- Le **date** nel Tab ora si vedono pulite (es. 04/05/2026) invece della stringa lunga.
- Il salvataggio (doPost) NON è cambiato. Foglio e Power Query: nessun impatto.

---

## PRIMA — Backup
1. Copia `index.html` e rinominala `index_BACKUP.html`.
2. In Apps Script: seleziona tutto il codice attuale, salvalo in un file di testo
   `GoogleAppsScript_BACKUP.txt` sul desktop.

---

## PASSO 1 — Aggiorna lo script (Apps Script)
1. Google Sheet → Estensioni → Apps Script.
2. Seleziona tutto (Ctrl+A), cancella, incolla il nuovo `GoogleAppsScript.gs`.
3. Salva (dischetto).
4. **Ridistribuisci (essenziale):** Distribuisci → Gestisci distribuzioni →
   matita (Modifica) → Versione: **Nuova versione** → Distribuisci.
   L'URL resta lo stesso.

## PASSO 2 — Aggiorna l'app
1. Sostituisci `index.html` con quello nuovo (hai già il backup).
2. Se usi GitHub Pages: committa il nuovo file.
3. Sul telefono chiudi e riapri l'app per prendere la nuova versione.

## PASSO 3 — Testa
1. Tocca il pulsante ☰ in alto a destra.
2. Devono comparire le ultime 7 registrazioni, la più recente in alto,
   ordinate per data/ora di registrazione (colonna A del foglio).
3. Date pulite, colori giusti (rosso/verde/blu), importi formattati.

Nota: la prima apertura potrebbe metterci 1-2 secondi in più se scatta il metodo
alternativo. È normale.

---

## ROLLBACK
- App: cancella `index.html`, rinomina `index_BACKUP.html` in `index.html`.
- Script: incolla `GoogleAppsScript_BACKUP.txt`, salva, ridistribuisci (Nuova versione).

## Garanzie
- doPost identica all'originale (verificato).
- 11 colonne scritte identiche. Power Query importa come sempre.
- Il Tab è in sola lettura: non scrive né modifica nulla nel foglio.

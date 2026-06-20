# Tab 4 "Ultime registrazioni" — Istruzioni di installazione

Due file da aggiornare. Fai **prima il backup**, poi installa, poi testa.
Se qualcosa non va, in fondo trovi il rollback in 10 secondi.

---

## PRIMA DI TUTTO — Backup (obbligatorio)

1. Vai nella cartella del progetto sul PC.
2. Trova `index.html`. Fanne una copia e rinominala in `index_BACKUP.html`.
3. Apri il tuo Google Sheet → Estensioni → Apps Script.
4. Seleziona TUTTO il codice attuale (Ctrl+A) e incollalo in un file di testo sul desktop,
   salvalo come `GoogleAppsScript_BACKUP.txt`. (È la tua rete di sicurezza per lo script.)

Ora hai entrambi i backup. Procedi.

---

## PASSO 1 — Aggiornare lo script Google (Apps Script)

1. Sei già dentro Estensioni → Apps Script.
2. Seleziona tutto il codice attuale (Ctrl+A) e cancellalo.
3. Apri il nuovo file `GoogleAppsScript.gs` (quello che ti ho dato), copialo TUTTO e incollalo.
4. Clicca l'icona "Salva" (il dischetto).
5. **Ridistribuisci** (questo passo è essenziale, altrimenti la lettura non si attiva):
   - In alto a destra clicca **Distribuisci → Gestisci distribuzioni**.
   - Clicca l'icona a forma di **matita** (Modifica) sulla distribuzione esistente.
   - Nel menu "Versione" scegli **Nuova versione**.
   - Clicca **Distribuisci**.
   - L'URL **resta lo stesso di prima** — non devi cambiarlo nell'app.

> Nota: la tua funzione di salvataggio (`doPost`) NON è stata toccata. Ho solo aggiunto
> una funzione nuova di sola lettura (`doGet`). I dati nel foglio e Power Query non cambiano.

---

## PASSO 2 — Aggiornare l'app (index.html)

1. Copia il nuovo `index.html` nella cartella del progetto, sostituendo quello attuale
   (hai già `index_BACKUP.html` come copia di sicurezza).
2. Se usi GitHub Pages: carica/committa il nuovo `index.html` come fai di solito.
3. Sul telefono: apri l'app, e per essere sicuro che non resti la vecchia versione in cache,
   chiudila e riaprila (o tira giù per ricaricare). Il service worker prende la nuova versione
   al successivo avvio.

---

## PASSO 3 — Test

1. Apri l'app sul telefono.
2. In alto vedrai un quarto pulsante con l'icona **☰** accanto a "Trasf.".
3. Toccalo: deve aprirsi "Ultime registrazioni" e mostrare le tue ultime 7 transazioni,
   la più recente in alto.
   - Uscite in rosso, entrate in verde, trasferimenti in blu.
4. Tocca **‹** in alto a sinistra per tornare alla schermata di inserimento.
5. Fai una registrazione di prova, poi riapri ☰ e tocca **↻** (aggiorna): deve comparire in cima.

### Se la lista non si carica
- Se vedi "Impossibile caricare le registrazioni": la causa più probabile è che
  il PASSO 1.5 (Nuova versione in Gestisci distribuzioni) non è stato fatto.
  Ripeti quel passo.
- Il resto dell'app (Uscita/Entrata/Trasf./salvataggio) funziona comunque: la schermata
  Ultime è isolata, un suo errore non blocca nient'altro.

---

## ROLLBACK (se vuoi tornare indietro)

**App:** cancella il nuovo `index.html`, rinomina `index_BACKUP.html` in `index.html`.
(Se usi GitHub Pages, ri-committa il file vecchio.)

**Script:** apri Apps Script, cancella tutto, incolla il contenuto di
`GoogleAppsScript_BACKUP.txt`, salva, e rifai Distribuisci → Gestisci distribuzioni →
matita → Nuova versione → Distribuisci.

Tornerai esattamente alla situazione di prima.

---

## Cosa NON è cambiato (garanzie)
- La funzione di salvataggio (`doPost`) è byte-per-byte identica a prima.
- Le 11 colonne scritte nel foglio sono identiche. Power Query importa come sempre.
- La schermata Ultime è in sola lettura: non scrive né modifica nulla nel foglio.

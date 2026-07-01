// ================================================================
//  CONFIG.JS — Personalizzazione Finanza Personale
//  ✏️  Modifica SOLO questo file per aggiornare:
//     - Categorie e sottocategorie
//     - Conti, carte e broker
//     - Destinazioni
//  Non toccare index.html per questioni di dati.
// ================================================================

// ── CATEGORIE & SOTTOCATEGORIE ───────────────────────────────────
// Struttura: { Tipo: { Categoria: ['Sottocategoria1', ...] } }
// Regola: 'Altro' va sempre messo per ultimo.
// Per aggiungere una categoria: aggiungi una riga con il nome e la lista di sottocategorie.
// Per aggiungere una sottocategoria: aggiungi un elemento alla lista, prima di 'Altro'.

const CATEGORIE = {
  Uscita: {
    Abbonamenti:    ['Palestra', 'Riviste', 'Software', 'Streaming', 'Altro'],
    Banca:          ['Canone', 'Commissioni', 'Bollo c/c', 'Imposta di bollo', 'Altro'],
    Casa:           ['Arredo', 'Manutenzione', 'Mutuo Affitto', 'Pulizie', 'Utenze', 'Altro'],
    Cibo:           ['Bar', 'Delivery', 'Mensa', 'Pranzo lavoro', 'Ristorante', 'Spesa', 'Altro'],
    Investimenti:   ['Azioni', 'Crypto', 'ETF PAC', 'Immobili', 'Liquidità', 'Pensione', 'Altro'],
    Lavoro:         ['Alberghi', 'Attrezzatura', 'Formazione', 'Rappresentanza', 'Software', 'Trasferte', 'Altro'],
    Salute:         ['Dentista', 'Farmaci', 'Integratori', 'Medico Visite', 'Psicologia', 'Altro'],
    Svago:          ['Cultura', 'Hobby', 'Shopping', 'Sport', 'Viaggi', 'Altro'],
    Tasse:          ['Bollo Auto', 'IMU', 'IRPEF', 'Multe', 'TARI', 'Tasse Investimenti', 'Tasse Plusvalenze', 'Altro'],
    Trasporti:      ['Assicurazione Auto', 'Carburante', 'Manutenzione Auto', 'Mezzi Pubblici', 'Parcheggio', 'Pedaggi/Telepass', 'Revisione Auto', 'Taxi NCC', 'Altro'],
    Altro:          ['Altro']
  },
  Entrata: {
    'Affitto Percepito': ['Airbnb', 'Breve Termine', 'Lungo Termine', 'Altro'],
    Banca:               ['Rimborso', 'Interessi Attivi', 'Storno', 'Altro'],
    Dividendi:           ['Azioni', 'ETF', 'Fondo', 'Altro'],
    Interessi:           ['BTP', 'Conto Deposito', 'Obbligazioni', 'Altro'],
    Lavoro:              ['Ordinario Mensile', 'Tredicesima', 'Quattordicesima', 'TFR', 'ROL Pagati', 'Rimborso Spese', 'Bonus Annuale', 'Premio Performance', 'Una Tantum', 'Altro'],
    'Regalo Ricevuto':   ['Altro'],
    Vendite:             ['Auto', 'Immobili', 'Oggetti', 'Altro'],
    Altro:               ['Altro']
  }
};

// ── CONTI, CARTE & BROKER ────────────────────────────────────────
// Per aggiungere un conto: copia una riga e cambia label e icon.
// Icone suggerite: 💳 carte debito/credito | 🏦 conti correnti | 📈 broker | 💵 contanti

const CONFIG = {
  conti: [
    { label: 'Bancomat Bper',        icon: '💳' },
    { label: 'Carta Debito AMEX',    icon: '💳' },
    { label: 'Carta Debito BBVA',    icon: '💳' },
    { label: 'Carta Debito Bper',    icon: '💳' },
    { label: 'Carta Debito Revolut', icon: '💳' },
    { label: 'Contanti',             icon: '💵' },
    { label: 'Conto Corrente BBVA',  icon: '🏦' },
    { label: 'Conto Corrente Bper',  icon: '🏦' },
    { label: 'Conto Corrente ING',   icon: '🏦' },
    { label: 'Paypal',               icon: '🅿️' },
    { label: 'Scalable Capital',     icon: '📈' },
    { label: 'Ticket Restaurant',    icon: '🎫' },
  ],

  // ── DESTINAZIONI ───────────────────────────────────────────────
  // Per aggiungere: copia una riga con label e icon.
  destinazioni: [
    { label: 'Personale', icon: '👤' },
    { label: 'Lavoro',    icon: '💼' },
    { label: 'Condiviso', icon: '🤝' },
    { label: 'Famiglia',  icon: '👨‍👩‍👧' },
  ]
};

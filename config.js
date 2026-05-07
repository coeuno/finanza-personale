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
    Casa:           ['Arredo', 'Manutenzione', 'Mutuo Affitto', 'Pulizie', 'Utenze', 'Altro'],
    Cibo:           ['Delivery', 'Mensa', 'Pranzo lavoro', 'Ristoranti Bar', 'Spesa', 'Altro'],
    Investimenti:   ['Azioni', 'Crypto', 'ETF PAC', 'Immobili', 'Liquidità', 'Pensione', 'Altro'],
    Lavoro:         ['Attrezzatura', 'Formazione', 'Rappresentanza', 'Software', 'Trasferte', 'Altro'],
    Salute:         ['Dentista', 'Farmaci', 'Integratori', 'Medico Visite', 'Psicologia', 'Altro'],
    Svago:          ['Cultura', 'Hobby', 'Shopping', 'Sport', 'Viaggi', 'Altro'],
    Tasse:          ['Bollo Auto', 'Bollo Conto', 'IMU', 'IRPEF', 'TARI', 'Altro'],
    Trasporti:      ['Assicurazione Auto', 'Bollo Auto', 'Carburante', 'Manutenzione Auto', 'Mezzi Pubblici', 'Parcheggio', 'Taxi NCC', 'Altro'],
    Altro:          ['Altro']
  },
  Entrata: {
    'Affitto Percepito': ['Airbnb', 'Breve Termine', 'Lungo Termine', 'Altro'],
    Bonus:               ['Bonus Annuale', 'MBO', 'Una Tantum', 'Altro'],
    Dividendi:           ['Azioni', 'ETF', 'Fondo', 'Altro'],
    Interessi:           ['BTP', 'Conto Deposito', 'Obbligazioni', 'Altro'],
    Regalo:              ['Regalo', 'Altro'],
    'Rimborso Lavoro':   ['Diaria', 'Rimborso Km', 'Rimborso Spese', 'Rimborso Viaggio', 'Altro'],
    Stipendio:           ['Arretrati', 'Ordinario mensile', 'Quattordicesima', 'ROL Pagati', 'TFR', 'Tredicesima', 'Altro'],
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

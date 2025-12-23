# 3Bee Christmas Hero 🐝🎄

Landing page natalizia fullscreen per 3Bee con animazioni CSS.

## Descrizione

Una pagina hero festiva che celebra il Natale con il team 3Bee. Include:
- Animazione neve che cade
- Particelle dorate fluttuanti
- Logo 3Bee con decorazioni
- Headline creativa "Ho Ho Honey! 🍯"
- Apina animata con cappello Babbo Natale (Easter egg)
- Footer con credits

## Stack Tecnologico

- React 18
- Vite 5
- TypeScript
- CSS puro (per controllo animazioni fine)

## Setup

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Struttura

```
src/
├── main.tsx                    # Entry point
├── App.tsx                     # Componente principale
├── App.css                     # Stili globali e variabili CSS
└── components/
    ├── SnowAnimation.tsx       # Animazione fiocchi di neve
    ├── SnowAnimation.css
    ├── GoldenParticles.tsx     # Particelle dorate
    ├── GoldenParticles.css
    ├── SantaBee.tsx            # Easter egg apina natalizia
    └── SantaBee.css
```

## Design System

I colori e typography sono definiti come CSS variables in `App.css`:

- **Primary**: Palette gold/honey (#F5C518)
- **Secondary**: Gold (#FFD700)
- **Accent**: Christmas red (#C41E3A)
- **Background**: Near black (#0D0D0F)
- **Font Display**: Fredoka
- **Font Sans**: Poppins

## Animazioni

- **Snow**: 30-50 fiocchi, 8-15s per ciclo, fall + movimento laterale
- **Golden Particles**: 15-20 particelle, float up + fade + pulse
- **Santa Bee**: Ogni ~10s, attraversa da sinistra a destra con curva sinusoidale

## Accessibility

- Supporto `prefers-reduced-motion`
- Semantic HTML
- Alt text per immagini
- Aria labels per emoji decorative

## HTML IDs

Per testing e tracking:

| ID | Descrizione |
|---|---|
| `hero-container` | Container principale 100vh |
| `hero-logo` | Logo 3Bee |
| `hero-headline` | Titolo principale |
| `hero-subheadline` | Sottotitolo |
| `hero-footer` | Credits footer |
| `santa-bee` | Easter egg apina animata |

## Acceptance Criteria

- [x] Pagina carica in < 2s
- [ ] Layout 100vh senza scroll su mobile E desktop
- [ ] Neve animata fluida (60fps target)
- [ ] Apina attraversa schermo ogni ~10 secondi
- [ ] Logo 3Bee visibile e centrato
- [ ] Headline leggibile su tutti i device
- [ ] Animazioni rispettano prefers-reduced-motion
- [x] Meta tag OpenGraph presenti e corretti
- [ ] Funziona su Safari, Chrome, Firefox
- [ ] Nessuna scrollbar visibile

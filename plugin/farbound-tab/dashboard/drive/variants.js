/* Farbound Drive : variantes de tableau de bord livrees avec la tablette.
   Les joueurs peuvent en ajouter : un fichier .json par variante dans Documents\Farbound Tab\drive-variants\ (voir le LISEZMOI qui y est cree).
   Champs : id, name, brands[] (brand_id du camion pour la selection automatique), layout (classic|sport|minimal|wide|tech),
            accent, bg1, bg2, font (optionnel), css (optionnel : CSS additionnel). */
window.DRIVE_LAYOUTS = ['classic', 'sport', 'minimal', 'wide', 'tech'];
window.DRIVE_VARIANTS = [
  { id: 'farbound-aurora',  name: 'Farbound · Aurora',        brands: [],                    layout: 'classic', accent: '#f0a30a', bg1: '#0b0e14', bg2: '#161b25' },
  { id: 'renault-t',        name: 'Renault T · Classic',      brands: ['renault'],           layout: 'classic', accent: '#ffd400', bg1: '#0c0d10', bg2: '#1c1e24' },
  { id: 'scania-nextgen',   name: 'Scania · Next Gen',        brands: ['scania'],            layout: 'sport',   accent: '#3b82f6', bg1: '#07101d', bg2: '#101f36' },
  { id: 'volvo-fh',         name: 'Volvo FH · Clean',         brands: ['volvo', 'volvo_na'], layout: 'minimal', accent: '#7fd3ff', bg1: '#0a1118', bg2: '#16222e' },
  { id: 'daf-xf',           name: 'DAF XF · Precision',       brands: ['daf'],               layout: 'tech',    accent: '#2d8cff', bg1: '#080c14', bg2: '#13203a', font: 'Consolas, "Segoe UI", monospace' },
  { id: 'man-tgx',          name: 'MAN TGX · Red Line',       brands: ['man'],               layout: 'sport',   accent: '#ff3b3b', bg1: '#120a0b', bg2: '#241417' },
  { id: 'mercedes-actros',  name: 'Mercedes Actros · Wide',   brands: ['mercedes'],          layout: 'wide',    accent: '#9fe3f2', bg1: '#0b0e10', bg2: '#1b2226' },
  { id: 'iveco-sway',       name: 'Iveco S-Way · Tech',       brands: ['iveco'],             layout: 'tech',    accent: '#2aa1ff', bg1: '#081019', bg2: '#10243a', font: 'Consolas, "Segoe UI", monospace' },
  { id: 'kenworth-classic', name: 'Kenworth · Classic',       brands: ['kenworth'],          layout: 'classic', accent: '#e53935', bg1: '#100a0a', bg2: '#231616' },
  { id: 'peterbilt-gold',   name: 'Peterbilt · Gold',         brands: ['peterbilt'],         layout: 'wide',    accent: '#d4af37', bg1: '#0d0c08', bg2: '#222013' }
];

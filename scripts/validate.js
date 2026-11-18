// Vérifie apps/index.json : champs requis, ids uniques, fichiers d'entrée présents. Usage : node scripts/validate.js
const fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..');
const idx = JSON.parse(fs.readFileSync(path.join(root, 'apps', 'index.json'), 'utf8'));
let bad = 0; const ids = new Set();
const err = m => { console.error('✗ ' + m); bad++; };
for (const a of idx.apps || []) {
  if (!a.id || !/^[a-z0-9-]+$/.test(a.id)) err(`id invalide: ${a.id}`);
  if (ids.has(a.id)) err(`id en double: ${a.id}`); ids.add(a.id);
  if (!a.name) err(`${a.id}: name manquant`);
  if (!a.version) err(`${a.id}: version manquante`);
  if (!['local', 'web'].includes(a.type || 'local')) err(`${a.id}: type doit être local ou web`);
  if (a.entry && !/^https?:/.test(a.entry) && !fs.existsSync(path.join(root, a.entry))) err(`${a.id}: fichier introuvable ${a.entry}`);
  if (!a.entry && !a.url) err(`${a.id}: entry ou url manquant`);
}
console.log(bad ? `${bad} erreur(s)` : `OK : ${ids.size} app(s)`); process.exit(bad ? 1 : 0);

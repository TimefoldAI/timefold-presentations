// Copies the woff2 files referenced by tf-deck.css out of node_modules,
// so decks keep working offline (conference wifi...).
import { copyFileSync, mkdirSync } from 'node:fs';

const files = [
  ['inter-tight', 'inter-tight-latin-400-normal.woff2'],
  ['inter-tight', 'inter-tight-latin-500-normal.woff2'],
  ['inter-tight', 'inter-tight-latin-600-normal.woff2'],
  ['inter-tight', 'inter-tight-latin-700-normal.woff2'],
  ['inter-tight', 'inter-tight-latin-ext-400-normal.woff2'],
  ['inter-tight', 'inter-tight-latin-ext-600-normal.woff2'],
  ['jetbrains-mono', 'jetbrains-mono-latin-400-normal.woff2'],
  ['jetbrains-mono', 'jetbrains-mono-latin-600-normal.woff2'],
];

mkdirSync('fonts', { recursive: true });
for (const [pkg, file] of files) {
  copyFileSync(`node_modules/@fontsource/${pkg}/files/${file}`, `fonts/${file}`);
}
console.log(`Copied ${files.length} font files to fonts/`);

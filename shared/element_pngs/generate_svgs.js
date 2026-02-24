'use strict';
const fs = require('fs');
const path = require('path');
const outDir = path.join(__dirname);
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const items = [
  {fn: '01_H_Hydrogen.svg', title: 'Hydrogen', colorBg: '#041826', accents: ['#E6F7FF'], shape: 'spark', caption: 'The tiny spark that starts the sea.'},
  {fn: '02_He_Helium.svg', title: 'Helium', colorBg: '#071833', accents: ['#CFF7FF','#FFD9A6'], shape: 'bubble', caption: 'The bubble carries the spark up.'},
  {fn: '03_Li_Lithium.svg', title: 'Lithium', colorBg: '#08303a', accents: ['#C0C6C8','#FF9b48'], shape: 'fox', caption: 'The fox strikes a little spark.'},
  {fn: '04_Be_Beryllium.svg', title: 'Beryllium', colorBg: '#0b1114', accents: ['#b7cfff','#cfdde8'], shape: 'shield', caption: 'The humming silver shield.'},
  {fn: '05_B_Boron.svg', title: 'Boron', colorBg: '#2e2419', accents: ['#d9bfa1','#7aa97a'], shape: 'gate', caption: 'The angular gate opens.'},
  {fn: '06_C_Carbon.svg', title: 'Carbon', colorBg: '#0b0b0b', accents: ['#ff6b4a','#3e3e3e'], shape: 'blacksmith', caption: 'The blacksmith with a coal heart.'},
  {fn: '07_N_Nitrogen.svg', title: 'Nitrogen', colorBg: '#eaf6ff', accents: ['#bfe7ff','#dfefff'], shape: 'mist', caption: 'The drifting blue rain-mist.'},
  {fn: '08_O_Oxygen.svg', title: 'Oxygen', colorBg: '#f5fff7', accents: ['#6fcf97','#ffffff'], shape: 'bird', caption: 'The winged breath that wakes seeds.'},
  {fn: '09_F_Fluorine.svg', title: 'Fluorine', colorBg: '#002f2f', accents: ['#00e0c6','#d8f7f0'], shape: 'falcon', caption: 'The cleaning turquoise falcon.'},
  {fn: '10_Ne_Neon.svg', title: 'Neon', colorBg: '#00000a', accents: ['#ff2dcb','#00d2ff'], shape: 'lantern', caption: 'The lantern that draws neon signs.'},
  {fn: '11_Na_Sodium.svg', title: 'Sodium', colorBg: '#072a2a', accents: ['#ffffff','#c7f0e6'], shape: 'sprite', caption: 'The salt-sprite dancing on the river.'},
  {fn: '12_Mg_Magnesium.svg', title: 'Magnesium', colorBg: '#06282b', accents: ['#ffd27a','#f0b37a'], shape: 'drummer', caption: 'The drummer that lights the bank.'},
  {fn: '13_Al_Aluminum.svg', title: 'Aluminum', colorBg: '#dfeff6', accents: ['#9fbcd6','#ffffff'], shape: 'bridge', caption: 'The folding shiny bridge.'},
  {fn: '14_Si_Silicon.svg', title: 'Silicon', colorBg: '#f7efe6', accents: ['#b7a78a','#7aa97a'], shape: 'carver', caption: 'The carver chiseling the map.'},
  {fn: '15_P_Phosphorus.svg', title: 'Phosphorus', colorBg: '#0b120a', accents: ['#bff7c9','#dfffe8'], shape: 'lantern2', caption: 'The inner-glow lantern.'},
  {fn: '16_S_Sulfur.svg', title: 'Sulfur', colorBg: '#fff7d6', accents: ['#ffd54a','#f7c948'], shape: 'vendor', caption: 'The peddler trailing golden dust.'},
  {fn: '17_Cl_Chlorine.svg', title: 'Chlorine', colorBg: '#e7fdf9', accents: ['#79d6b0','#5fbfa0'], shape: 'witch', caption: 'The tide-witch swirling the river.'},
  {fn: '18_Ar_Argon.svg', title: 'Argon', colorBg: '#eef7ff', accents: ['#bfe0ff','#ffffff'], shape: 'watchman', caption: 'The glass watchman—still and calm.'},
  {fn: '19_K_Potassium.svg', title: 'Potassium', colorBg: '#0b2b12', accents: ['#b7ffb7','#7de27d'], shape: 'gardener', caption: 'The gardener\'s green ladder-staff.'},
  {fn: '20_Ca_Calcium.svg', title: 'Calcium', colorBg: '#fffaf7', accents: ['#ffd7c2','#ffcfa6'], shape: 'giant', caption: 'The giant holding the horizon.'}
];

function makeSVG(item) {
  const w = 2000, h = 2000;
  // Simple composition: background rect + central shape placeholder + title text + small caption
  return `<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}' viewBox='0 0 ${w} ${h}'>\n  <rect width='100%' height='100%' fill='${item.colorBg}'/>\n  <g transform='translate(${w / 2},${h / 2})'>\n    <circle cx='0' cy='-150' r='380' fill='${item.accents[0]}' opacity='0.12'/>\n    <text x='0' y='-150' font-family='"Nunito", "Arial"' font-size='120' text-anchor='middle' fill='${item.accents[0]}' opacity='0.95'>${item.title}</text>\n    <rect x='-420' y='120' width='840' height='420' rx='30' fill='rgba(255,255,255,0.08)'/>\n    <text x='0' y='220' font-family='"Nunito", "Arial"' font-size='42' text-anchor='middle' fill='${item.accents[0]}' opacity='0.95'>${item.caption}</text>\n  </g>\n</svg>`;
}

items.forEach(it => {
  const svg = makeSVG(it);
  const out = path.join(outDir, it.fn);
  fs.writeFileSync(out, svg, 'utf8');
  console.log('Wrote', it.fn);
});
console.log('Generated', items.length, 'SVG files in', outDir);

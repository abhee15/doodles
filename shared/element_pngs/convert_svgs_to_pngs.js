'use strict';
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const dir = __dirname;

(async function(){
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.svg'));
  for (const f of files) {
    const input = path.join(dir, f);
    const outName = f.replace(/\.svg$/,'') + '.png';
    const out = path.join(dir, outName);
    try {
      await sharp(input).png({quality:90}).toFile(out);
      console.log('Converted', f, '→', outName);
    } catch (err) {
      console.error('Failed', f, err.message);
    }
  }
})();

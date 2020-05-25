#!/usr/bin/env node
const TextToSVG = require('text-to-svg');
const textToSVG = TextToSVG.loadSync('fonts/Px437_IBM_EGA8.otf');
const fs = require('fs');
var list = ["// This file is auto-generated from icon-gen in the root directory"];
 
[
  ['[\u25A0]', 'checkbox-checked', 'custom-checkbox-indicator-icon-checked'],
  ['[ ]', 'checkbox-unchecked', ''],
  ['(\u2022)', 'radio-checked', 'custom-radio-indicator-icon-checked'],
  ['( )', 'radio-unchecked', '']
].forEach(row => {
  let [str, name, bsname] = row;

  const svg = textToSVG.getSVG(str, {
    x: 0, y: 0, 
    fontSize: 18, anchor: 'top',
    attributes: { fill: '#bbbbbb'}
  });

  fs.writeFileSync(`${name}.svg`, svg);

  if(bsname) {
    list.push(`$${bsname}: url('data:image/svg+xml,${svg}');`);
  }
});

fs.writeFileSync(`v4.4.1/scss/_autogen.scss`, list.join('\n'));

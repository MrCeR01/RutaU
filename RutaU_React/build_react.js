const fs = require('fs');
const path = require('path');

const babelPath = fs.existsSync(path.join(__dirname, '..', 'assets', 'babel.min.js'))
  ? path.join(__dirname, '..', 'assets', 'babel.min.js')
  : path.join(__dirname, 'assets', 'babel.min.js');
const Babel = require(babelPath);

const sourceJSX = fs.readFileSync(path.join(__dirname, 'app.jsx'), 'utf8');
const result = Babel.transform(sourceJSX, { presets: ['react'] });

fs.writeFileSync(path.join(__dirname, 'app.js'), result.code, 'utf8');
console.log('Successfully compiled app.jsx -> app.js! Size:', result.code.length, 'bytes');


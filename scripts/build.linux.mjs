import { createRequire } from 'module';
import fs from 'fs';

const require = createRequire(import.meta.url);

async function build() {
  const confJson = require('../src-tauri/tauri.conf.json');
  confJson.package.productName = 'WA';

  fs.writeFileSync('./src-tauri/tauri.conf.json', JSON.stringify(confJson, null, 2));
  console.log(`Rewrite WA+ Name: WA+ --> WA`);
}

build().catch(console.error);

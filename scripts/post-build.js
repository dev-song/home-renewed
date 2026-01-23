// scripts/post-build.js
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distPath = path.join(__dirname, '../dist');
const routes = ['interactive'];

// routes 내 route별로 [route]/index.html 생성
routes.forEach((route) => {
  const routePath = path.join(distPath, route);

  if (!fs.existsSync(routePath)) {
    fs.mkdirSync(routePath, { recursive: true });
  }
  fs.copyFileSync(path.join(distPath, 'index.html'), path.join(routePath, 'index.html'));
});

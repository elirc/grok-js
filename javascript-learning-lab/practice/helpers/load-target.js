import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

export async function loadTarget(importMetaUrl, extension = 'js') {
  const target = process.env.LAB_TARGET === 'starter' ? 'starter' : 'solution';
  const testDir = path.dirname(fileURLToPath(importMetaUrl));
  const targetPath = path.join(testDir, `${target}.${extension}`);
  return import(pathToFileURL(targetPath).href);
}

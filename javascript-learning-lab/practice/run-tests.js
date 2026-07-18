import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const validTargets = new Set(['starter', 'solution']);
const topics = ['arrays', 'objects', 'functions', 'dom-browser', 'closures', 'async'];

const target = process.argv[2] ?? 'solution';
const topic = process.argv[3];

if (!validTargets.has(target)) {
  console.error(`Unknown target "${target}". Use "starter" or "solution".`);
  process.exit(1);
}

if (topic && !topics.includes(topic)) {
  console.error(`Unknown topic "${topic}". Use one of: ${topics.join(', ')}.`);
  process.exit(1);
}

const selectedTopics = topic ? [topic] : topics;
const testFiles = selectedTopics.map((name) =>
  path.join(__dirname, 'core-js', name, `${name}.test.js`)
);

console.log(`Running ${target} tests for: ${selectedTopics.join(', ')}`);

const result = spawnSync(process.execPath, ['--test', ...testFiles], {
  stdio: 'inherit',
  env: {
    ...process.env,
    LAB_TARGET: target
  }
});

process.exit(result.status ?? 1);

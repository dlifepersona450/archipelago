import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const ignored = new Set(['node_modules', 'dist', '.git', 'coverage', 'test-results']);
async function collect(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(
    entries
      .filter((entry) => !ignored.has(entry.name))
      .map(async (entry) => {
        const target = path.join(directory, entry.name);
        return entry.isDirectory() ? collect(target) : entry.name.endsWith('.md') ? [target] : [];
      }),
  );
  return nested.flat();
}
const errors = [];
const files = await collect(root);
for (const file of files) {
  const source = await readFile(file, 'utf8');
  for (const match of source.matchAll(/!?\[[^\]]*\]\(([^)]+)\)/g)) {
    const destination = match[1].split(/\s+"/)[0].replace(/^<|>$/g, '');
    if (/^(?:https?:|mailto:|#)/.test(destination)) continue;
    const local = decodeURIComponent(destination.split('#')[0]);
    try {
      await stat(path.resolve(path.dirname(file), local));
    } catch {
      errors.push(`${path.relative(root, file)} → ${destination}`);
    }
  }
}
if (errors.length) {
  console.error(`Broken local links:\n${errors.join('\n')}`);
  process.exitCode = 1;
} else
  console.log(
    `Checked file targets in ${files.length} Markdown documents. Anchors and external URLs are not crawled.`,
  );

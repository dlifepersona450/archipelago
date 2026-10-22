import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

/** Conventional Commits header plus this project's evidence-bearing body convention. */
export function validateCommit(message) {
  const normalized = message
    .split('\n')
    .filter((line) => !line.startsWith('#'))
    .join('\n')
    .trim();
  const [header = '', separator, ...bodyLines] = normalized.split(/\r?\n/);
  const errors = [];
  const pattern =
    /^(feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert)(\([a-z0-9][a-z0-9/-]*\))?(!)?: .+$/;
  if (!pattern.test(header))
    errors.push('Use type(scope): summary with an approved Conventional Commits type.');
  if (header.length > 72) errors.push('Keep the commit header at or below 72 characters.');
  if (separator !== '') errors.push('Separate the header and body with a blank line.');
  const body = bodyLines.join('\n');
  const headings = ['Why', 'Changes', 'Validation'];
  for (const heading of headings) {
    const section = body.match(
      new RegExp(
        `(?:^|\\n)${heading}:[ \\t]*([\\s\\S]*?)(?=\\n(?:Why|Changes|Validation|BREAKING CHANGE):|$)`,
      ),
    );
    if (!section || section[1].trim().length < 12)
      errors.push(
        `${heading}: must explain concrete context or evidence (at least 12 characters).`,
      );
  }
  if (/!:/u.test(header) && !/^(?:BREAKING CHANGE):\s*\S.+/m.test(body))
    errors.push('A breaking header requires a BREAKING CHANGE: footer with migration guidance.');
  return errors;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const path = process.argv[2];
  if (!path) {
    console.error('Usage: npm run commit:check -- <commit-message-file>');
    process.exitCode = 1;
  } else {
    try {
      const errors = validateCommit(readFileSync(path, 'utf8'));
      if (errors.length) {
        console.error(errors.join('\n'));
        process.exitCode = 1;
      } else console.log('Commit message follows the project convention.');
    } catch (error) {
      console.error(error.message);
      process.exitCode = 1;
    }
  }
}

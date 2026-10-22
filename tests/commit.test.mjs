import assert from 'node:assert/strict';
import test from 'node:test';
import { validateCommit } from '../scripts/check-commit.mjs';

const body =
  '\n\nWhy: Visitors need direct access to the case studies.\n\nChanges: Add a keyboard-friendly project index.\n\nValidation: npm run check passed for this change.';
test('project commit convention accepts meaningful Conventional Commits', () => {
  assert.deepEqual(validateCommit(`feat(navigation): add a direct project index${body}`), []);
});
test('vague headers, empty evidence, and missing migrations are rejected', () => {
  assert.ok(validateCommit('update stuff').length > 0);
  assert.ok(
    validateCommit('fix(scene): restore map\n\nWhy:\nChanges: fix\nValidation: yes').length >= 3,
  );
  assert.ok(
    validateCommit(`refactor(content)!: rename island ids${body}`).some((error) =>
      error.includes('BREAKING CHANGE'),
    ),
  );
  assert.deepEqual(
    validateCommit(
      `refactor(content)!: rename island ids${body}\n\nBREAKING CHANGE: Replace saved island bookmarks with the new ids.`,
    ),
    [],
  );
});

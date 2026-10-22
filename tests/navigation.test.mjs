import assert from 'node:assert/strict';
import test from 'node:test';
import { escapeHtml, parseRoute, safeLink, serializeRoute } from '../src/core/navigation.ts';
import { islands, projects, projectsForIsland } from '../src/content/portfolio.ts';

test('shareable route preserves view, island, and project through a round trip', () => {
  const route = { mode: 'quick', island: 'memory', project: 'beyond-the-frame' };
  assert.deepEqual(parseRoute(serializeRoute(route)), route);
});
test('malformed view and island fall back to a usable overview', () => {
  assert.deepEqual(parseRoute('#view=invalid&island=<script>'), {
    mode: 'explore',
    island: null,
    project: null,
  });
  assert.equal(parseRoute('#project=%ZZ').project, '%ZZ');
});
test('outbound links reject executable, credential-file, and relative schemes', () => {
  for (const value of [
    'javascript:alert(1)',
    'data:text/html,test',
    'file:///etc/passwd',
    '/example',
    '',
  ])
    assert.equal(safeLink(value), null);
  assert.equal(
    safeLink('https://github.com/dlifepersona450'),
    'https://github.com/dlifepersona450',
  );
  assert.equal(
    escapeHtml('<img src="x" onerror=\'test\'>&'),
    '&lt;img src=&quot;x&quot; onerror=&#39;test&#39;&gt;&amp;',
  );
});
test('content has stable unique identities and each island can reach its projects', () => {
  assert.equal(new Set(projects.map((project) => project.id)).size, projects.length);
  for (const island of islands) assert.ok(projectsForIsland(island.id).length > 0);
  for (const project of projects) assert.ok(islands.some((island) => island.id === project.island));
  assert.equal(projectsForIsland(null).length, projects.length);
});

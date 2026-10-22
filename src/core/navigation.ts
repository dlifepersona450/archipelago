import { islandIds } from './types.ts';
import type { IslandId, Route } from './types.ts';

export function isIslandId(value: string | null): value is IslandId {
  return islandIds.some((id) => id === value);
}

/** Keep links shareable without requiring a server-side routing fallback. */
export function parseRoute(hash: string): Route {
  const params = new URLSearchParams(hash.replace(/^#/, ''));
  const island = params.get('island');
  return {
    mode: params.get('view') === 'quick' ? 'quick' : 'explore',
    island: isIslandId(island) ? island : null,
    project: params.get('project'),
  };
}

export function serializeRoute(route: Route): string {
  const params = new URLSearchParams({ view: route.mode });
  if (route.island) params.set('island', route.island);
  if (route.project) params.set('project', route.project);
  return `#${params}`;
}

export function safeLink(value: string): string | null {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' || url.protocol === 'http:' ? url.href : null;
  } catch {
    return null;
  }
}

export function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    };
    return entities[character] ?? character;
  });
}

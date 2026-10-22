import './style.css';
import { findProject, islands, projectsForIsland } from './content/portfolio.ts';
import { isIslandId, parseRoute, serializeRoute } from './core/navigation.ts';
import type { Disposable, IslandId, Route } from './core/types.ts';
import type { World } from './scene/world.ts';
import { projectCard, renderShell } from './ui/shell.ts';
import { renderProjectDetail } from './ui/project-detail.ts';

document.querySelector<HTMLElement>('#app')!.innerHTML = renderShell();
const listeners = new AbortController();
const signal = listeners.signal;
const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
const desktop = matchMedia('(min-width: 760px)');
const projectDialog = document.querySelector<HTMLDialogElement>('#project-dialog')!;
const aboutDialog = document.querySelector<HTMLDialogElement>('#about-dialog')!;
const projectContent = document.querySelector<HTMLElement>('#project-content')!;
const stage = document.querySelector<HTMLElement>('#world-stage')!;
const motionButton = document.querySelector<HTMLButtonElement>('#motion-toggle')!;
const announcer = document.querySelector<HTMLElement>('#announcer')!;
let route = parseRoute(location.hash);
let world: World | undefined;
let worldLoading = false;
let worldFailed = false;
let disposed = false;
let motionOverride: boolean | null = null;
let motionEnabled = !motionPreference.matches;
let demo: Disposable | undefined;
let demoGeneration = 0;
let activeProjectId: string | null = null;
let returnFocus: HTMLElement | null = null;
let renderedCollection: IslandId | null | undefined;

function announce(message: string) {
  announcer.textContent = message;
}

function navigate(patch: Partial<Route>, replace = false) {
  route = { ...route, ...patch };
  history[replace ? 'replaceState' : 'pushState'](null, '', serializeRoute(route));
  syncRoute();
}

function worldIsActive() {
  return route.mode === 'explore' && desktop.matches && !projectDialog.open && !aboutDialog.open;
}

async function ensureWorld() {
  world?.setActive(worldIsActive());
  if (world || worldLoading || worldFailed || !worldIsActive() || disposed) return;
  worldLoading = true;
  try {
    const { createWorld } = await import('./scene/world.ts');
    if (disposed || !worldIsActive()) return;
    const labels = new Map(
      islands.map((island) => [
        island.id,
        document.querySelector<HTMLButtonElement>(`.label-${island.id}`)!,
      ]),
    );
    world = createWorld(
      document.querySelector<HTMLCanvasElement>('#world-canvas')!,
      labels,
      selectIsland,
      motionEnabled,
    );
    stage.classList.remove('is-map');
    stage.classList.add('world-ready');
    world.select(route.island);
  } catch {
    fallbackWorld();
  } finally {
    worldLoading = false;
  }
}

function fallbackWorld() {
  worldFailed = true;
  world?.dispose();
  world = undefined;
  stage.classList.add('is-map');
  stage.classList.remove('world-ready');
  document.querySelector<HTMLElement>('#map-note')!.textContent =
    'ILLUSTRATED MAP / SELECT AN ISLAND';
}

function selectIsland(id: IslandId) {
  navigate({ island: id, project: null });
  announce(
    `${islands.find((island) => island.id === id)!.name} Island selected. Project collection updated below.`,
  );
}

function clearDemo() {
  demoGeneration++;
  demo?.dispose();
  demo = undefined;
}

/** A stale lazy import must never attach a demo to a closed or replaced dialog. */
async function mountDemo(id: string) {
  const project = findProject(id);
  const container = document.querySelector<HTMLElement>('#demo-container');
  if (!project?.demo || !container) return;
  const generation = demoGeneration;
  const stillCurrent = () => !disposed && generation === demoGeneration && projectDialog.open;
  try {
    let mounted: Disposable;
    if (project.demo === 'depth') {
      const { mountDepth } = await import('./features/depth.ts');
      if (!stillCurrent()) return;
      mounted = mountDepth(container);
    } else if (project.demo === 'game') {
      const { mountGame } = await import('./features/game.ts');
      if (!stillCurrent()) return;
      mounted = mountGame(container);
    } else {
      const { mountFluid } = await import('./features/fluid.ts');
      if (!stillCurrent()) return;
      mounted = await mountFluid(container, motionEnabled);
    }
    if (stillCurrent()) demo = mounted;
    else mounted.dispose();
  } catch {
    if (stillCurrent())
      container.innerHTML =
        '<p role="status">This demo could not initialize. The case study is still available below.</p>';
  }
}

function restoreFocus() {
  if (returnFocus?.isConnected && !returnFocus.closest('dialog:not([open])')) returnFocus.focus();
  else document.querySelector<HTMLButtonElement>('[data-all]')!.focus();
}

function syncProject() {
  const project = findProject(route.project);
  if (!project) {
    if (route.project) {
      route.project = null;
      history.replaceState(null, '', serializeRoute(route));
      announce('Project not found. Showing the available collection.');
    }
    clearDemo();
    activeProjectId = null;
    if (projectDialog.open) {
      projectDialog.close();
      restoreFocus();
    }
    return;
  }
  if (activeProjectId === project.id && projectDialog.open) return;
  clearDemo();
  if (aboutDialog.open) aboutDialog.close();
  returnFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
  projectContent.innerHTML = renderProjectDetail(project);
  activeProjectId = project.id;
  if (!projectDialog.open) projectDialog.showModal();
  void mountDemo(project.id);
}

function syncRoute() {
  const quick = route.mode === 'quick';
  document.querySelector<HTMLElement>('.explore-hero')!.hidden = quick;
  document.querySelector<HTMLElement>('.quick-intro')!.hidden = !quick;
  document.querySelectorAll<HTMLButtonElement>('[data-view]').forEach((button) => {
    if (button.hasAttribute('aria-pressed'))
      button.setAttribute('aria-pressed', String(button.dataset.view === route.mode));
  });
  document.querySelectorAll<HTMLButtonElement>('[data-island]').forEach((button) => {
    button.setAttribute('aria-pressed', String(button.dataset.island === route.island));
  });
  const island = islands.find((entry) => entry.id === route.island);
  document.querySelector<HTMLElement>('#collection-title')!.textContent = island
    ? `${island.name} Island.`
    : 'Choose your next stop.';
  document.querySelector<HTMLElement>('#collection-description')!.textContent =
    island?.description ?? 'A little engineering, a little play, a little life.';
  document.querySelector<HTMLElement>('#collection-eyebrow')!.textContent = island
    ? `${island.number} / ${island.subtitle.toUpperCase()}`
    : 'A FEW THINGS FROM MY WORLD';
  if (renderedCollection !== route.island) {
    document.querySelector<HTMLElement>('#project-grid')!.innerHTML = projectsForIsland(
      route.island,
    )
      .map(projectCard)
      .join('');
    renderedCollection = route.island;
  }
  document.title = `${island ? `${island.name} Island` : 'ARCHIPELAGO'} — A small world by DLife`;
  world?.select(route.island);
  syncProject();
  void ensureWorld();
}

function applyMotion() {
  motionEnabled = motionOverride ?? !motionPreference.matches;
  document.documentElement.classList.toggle('motion-off', !motionEnabled);
  motionButton.setAttribute('aria-pressed', String(motionEnabled));
  motionButton.textContent = motionEnabled ? 'Motion on' : 'Motion reduced';
  world?.setMotion(motionEnabled);
  if (activeProjectId && findProject(activeProjectId)?.demo === 'fluid') {
    clearDemo();
    void mountDemo(activeProjectId);
  }
}

document.addEventListener(
  'click',
  (event) => {
    const target = (event.target as Element).closest<HTMLElement>('button, a');
    if (!target) return;
    if (target.classList.contains('skip-link')) {
      event.preventDefault();
      const collection = document.querySelector<HTMLElement>('#collection')!;
      collection.tabIndex = -1;
      collection.focus({ preventScroll: true });
      collection.scrollIntoView({ block: 'start' });
      return;
    }
    if (target.dataset.view === 'explore' || target.dataset.view === 'quick')
      navigate({ mode: target.dataset.view, project: null });
    if (target.dataset.island && isIslandId(target.dataset.island))
      selectIsland(target.dataset.island);
    if (target.dataset.project) navigate({ project: target.dataset.project });
    if (target.hasAttribute('data-start')) {
      selectIsland('systems');
      document.querySelector<HTMLButtonElement>('.label-systems')!.focus({ preventScroll: true });
    }
    if (target.hasAttribute('data-all') || target.hasAttribute('data-overview'))
      navigate({ island: null, project: null });
    if (target.hasAttribute('data-about')) {
      returnFocus = target;
      aboutDialog.showModal();
      void ensureWorld();
    }
    if (target.hasAttribute('data-close')) target.closest<HTMLDialogElement>('dialog')?.close();
    if (target === motionButton) {
      motionOverride = !motionEnabled;
      applyMotion();
    }
  },
  { signal },
);

projectDialog.addEventListener(
  'close',
  () => {
    clearDemo();
    activeProjectId = null;
    if (route.project) navigate({ project: null }, true);
    restoreFocus();
    void ensureWorld();
  },
  { signal },
);
aboutDialog.addEventListener(
  'close',
  () => {
    restoreFocus();
    void ensureWorld();
  },
  { signal },
);
for (const dialog of [projectDialog, aboutDialog]) {
  dialog.addEventListener(
    'click',
    (event) => {
      if (event.target !== dialog) return;
      const bounds = dialog.getBoundingClientRect();
      if (
        event.clientX < bounds.left ||
        event.clientX > bounds.right ||
        event.clientY < bounds.top ||
        event.clientY > bounds.bottom
      )
        dialog.close();
    },
    { signal },
  );
}
window.addEventListener(
  'hashchange',
  () => {
    route = parseRoute(location.hash);
    syncRoute();
  },
  { signal },
);
window.addEventListener(
  'popstate',
  () => {
    route = parseRoute(location.hash);
    syncRoute();
  },
  { signal },
);
motionPreference.addEventListener('change', applyMotion, { signal });
desktop.addEventListener(
  'change',
  () => {
    void ensureWorld();
  },
  { signal },
);
stage.addEventListener('world-unavailable', fallbackWorld, { signal });

applyMotion();
syncRoute();

export function dispose() {
  disposed = true;
  listeners.abort();
  clearDemo();
  world?.dispose();
  projectDialog.close();
  aboutDialog.close();
}

if (import.meta.hot) import.meta.hot.dispose(dispose);

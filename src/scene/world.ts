import * as T from 'three';
import { islands } from '../content/portfolio.ts';
import { isIslandId } from '../core/navigation.ts';
import type { Disposable, IslandId } from '../core/types.ts';
import { buildScene } from './build.ts';

export interface World extends Disposable {
  select(id: IslandId | null): void;
  setActive(active: boolean): void;
  setMotion(enabled: boolean): void;
}

export function createWorld(
  canvas: HTMLCanvasElement,
  labels: ReadonlyMap<IslandId, HTMLButtonElement>,
  onSelect: (id: IslandId) => void,
  motionEnabled: boolean,
): World {
  const renderer = new T.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.6));
  renderer.outputColorSpace = T.SRGBColorSpace;
  const graph = buildScene();
  const camera = new T.OrthographicCamera(-10, 10, 8, -8, 0.1, 100);
  const offset = new T.Vector3(12, 16, 18);
  const center = new T.Vector3();
  const target = new T.Vector3();
  const raycaster = new T.Raycaster();
  const pointer = new T.Vector2();
  const listeners = new AbortController();
  let active = true;
  let motion = motionEnabled;
  let disposed = false;
  let frame = 0;
  let lastTime = 0;
  let pointerStart: { x: number; y: number } | null = null;
  let targetZoom = 1;

  function invalidate() {
    if (!frame && active && !document.hidden && !disposed) frame = requestAnimationFrame(render);
  }

  function render(time: number) {
    frame = 0;
    const delta = Math.min((time - lastTime) / 1000 || 0.016, 0.05);
    lastTime = time;
    const blend = motion ? 1 - Math.exp(-delta * 8) : 1;
    center.lerp(target, blend);
    camera.zoom = T.MathUtils.lerp(camera.zoom, targetZoom, blend);
    const unsettled =
      center.distanceToSquared(target) > 0.00001 || Math.abs(camera.zoom - targetZoom) > 0.0001;
    if (!unsettled) {
      center.copy(target);
      camera.zoom = targetZoom;
    }
    camera.position.copy(center).add(offset);
    camera.lookAt(center);
    camera.updateProjectionMatrix();
    camera.updateMatrixWorld();
    renderer.render(graph.scene, camera);

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    for (const island of islands) {
      const anchor = new T.Vector3(...island.position)
        .add(new T.Vector3(0, 0.4, 1.65))
        .project(camera);
      const label = labels.get(island.id);
      if (label) {
        label.style.left = `${((anchor.x + 1) / 2) * width}px`;
        label.style.top = `${((-anchor.y + 1) / 2) * height}px`;
      }
    }
    if (unsettled) invalidate();
  }

  function resize() {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    if (!width || !height) return;
    const aspect = width / height;
    const halfHeight = Math.max(7.1, 9.5 / aspect);
    camera.left = -halfHeight * aspect;
    camera.right = halfHeight * aspect;
    camera.top = halfHeight;
    camera.bottom = -halfHeight;
    renderer.setSize(width, height, false);
    invalidate();
  }

  function pick(event: PointerEvent): IslandId | null {
    const bounds = canvas.getBoundingClientRect();
    pointer.set(
      ((event.clientX - bounds.left) / bounds.width) * 2 - 1,
      -((event.clientY - bounds.top) / bounds.height) * 2 + 1,
    );
    raycaster.setFromCamera(pointer, camera);
    const hit = raycaster.intersectObjects(graph.pickables, true)[0];
    let object = hit?.object;
    while (object) {
      const id: unknown = object.userData.island;
      if (typeof id === 'string' && isIslandId(id)) return id;
      object = object.parent ?? undefined;
    }
    return null;
  }

  canvas.addEventListener(
    'pointermove',
    (event) => {
      canvas.style.cursor = pick(event) ? 'pointer' : 'default';
    },
    { signal: listeners.signal },
  );
  canvas.addEventListener(
    'pointerdown',
    (event) => {
      pointerStart = { x: event.clientX, y: event.clientY };
    },
    { signal: listeners.signal },
  );
  canvas.addEventListener(
    'pointerup',
    (event) => {
      if (
        !pointerStart ||
        Math.hypot(event.clientX - pointerStart.x, event.clientY - pointerStart.y) > 8
      )
        return;
      pointerStart = null;
      const id = pick(event);
      if (id) onSelect(id);
    },
    { signal: listeners.signal },
  );
  canvas.addEventListener(
    'pointercancel',
    () => {
      pointerStart = null;
    },
    { signal: listeners.signal },
  );
  document.addEventListener(
    'visibilitychange',
    () => {
      if (document.hidden) {
        cancelAnimationFrame(frame);
        frame = 0;
      } else {
        lastTime = 0;
        invalidate();
      }
    },
    { signal: listeners.signal },
  );
  canvas.addEventListener(
    'webglcontextlost',
    (event) => {
      event.preventDefault();
      canvas.dispatchEvent(new CustomEvent('world-unavailable', { bubbles: true }));
    },
    { signal: listeners.signal },
  );
  const observer = new ResizeObserver(resize);
  observer.observe(canvas);
  resize();

  return {
    select(id) {
      const island = islands.find((entry) => entry.id === id);
      target.set(island ? island.position[0] * 0.15 : 0, 0, island ? island.position[2] * 0.15 : 0);
      targetZoom = island ? 1.08 : 1;
      invalidate();
    },
    setActive(value) {
      active = value;
      if (!value) {
        cancelAnimationFrame(frame);
        frame = 0;
      } else {
        lastTime = 0;
        resize();
      }
    },
    setMotion(value) {
      motion = value;
      invalidate();
    },
    dispose() {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      listeners.abort();
      const geometries = new Set<T.BufferGeometry>();
      const materials = new Set<T.Material>();
      graph.scene.traverse((object) => {
        if (object instanceof T.Mesh) {
          geometries.add(object.geometry);
          const entries = Array.isArray(object.material) ? object.material : [object.material];
          entries.forEach((entry) => materials.add(entry));
        }
      });
      geometries.forEach((geometry) => geometry.dispose());
      materials.forEach((material) => material.dispose());
      renderer.dispose();
    },
  };
}

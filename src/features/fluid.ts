import * as T from 'three';
import type { Disposable } from '../core/types.ts';
import { fragmentShader, vertexShader } from './fluid-shader.ts';

export async function mountFluid(
  container: HTMLElement,
  motionEnabled: boolean,
): Promise<Disposable> {
  const base = import.meta.env.BASE_URL;
  const controls = [
    { id: 'viscosity', label: 'Viscosity', min: 0, max: 1, value: 0.65 },
    { id: 'refraction', label: 'Refraction', min: 1, max: 2.5, value: 1.5 },
    { id: 'distortion', label: 'Distortion', min: 0, max: 0.5, value: 0.12 },
    { id: 'chromatic', label: 'Chromatic aberration', min: 0, max: 0.15, value: 0.035 },
  ];
  container.innerHTML = `<div class="fluid-layout"><div class="fluid-viewport"><img src="${base}art/landscape.svg" alt="An illustrated lakeside landscape. Static fallback for the fluid lens." /><canvas aria-label="Interactive fluid lens over a landscape. Move or touch to position the lens; use the labelled sliders to change the material."></canvas><span class="shader-label">LIQUID STUDY / 001</span></div><div class="fluid-controls"><p class="eyebrow">Material controls</p><h3>Change the way<br />you see.</h3>${controls.map((control) => `<label for="${control.id}"><span>${control.label}<output id="${control.id}-value" for="${control.id}">${control.value.toFixed(2)}</output></span><input id="${control.id}" type="range" min="${control.min}" max="${control.max}" step="0.005" value="${control.value}" /></label>`).join('')}<button class="text-button" data-reset>Reset material ↻</button><p class="small-note" role="status" data-fluid-status>Move or touch the image to bend the light.</p></div></div>`;
  const canvas = container.querySelector<HTMLCanvasElement>('canvas')!;
  const status = container.querySelector<HTMLElement>('[data-fluid-status]')!;
  const listeners = new AbortController();
  let renderer: T.WebGLRenderer | undefined;
  let texture: T.Texture | undefined;
  let material: T.ShaderMaterial | undefined;
  let geometry: T.PlaneGeometry | undefined;
  let observer: ResizeObserver | undefined;
  let frame = 0;
  let disposed = false;
  const cleanup = () => {
    disposed = true;
    cancelAnimationFrame(frame);
    listeners.abort();
    observer?.disconnect();
    geometry?.dispose();
    material?.dispose();
    texture?.dispose();
    renderer?.dispose();
  };
  const showFallback = (message: string) => {
    cleanup();
    canvas.hidden = true;
    container.querySelectorAll<HTMLInputElement>('input').forEach((input) => {
      input.disabled = true;
    });
    container.querySelector<HTMLButtonElement>('[data-reset]')!.disabled = true;
    status.textContent = message;
  };

  try {
    renderer = new T.WebGLRenderer({ canvas, alpha: true, antialias: false });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
    renderer.outputColorSpace = T.SRGBColorSpace;
    texture = await new T.TextureLoader().loadAsync(`${base}art/landscape.svg`);
    texture.colorSpace = T.SRGBColorSpace;
    const center = new T.Vector2(0.5, 0.5);
    const target = center.clone();
    material = new T.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uImage: { value: texture },
        uCenter: { value: center },
        uAspect: { value: 1.5 },
        uRefraction: { value: 1.5 },
        uDistortion: { value: 0.12 },
        uChromatic: { value: 0.035 },
      },
    });
    geometry = new T.PlaneGeometry(2, 2);
    const scene = new T.Scene();
    scene.add(new T.Mesh(geometry, material));
    const camera = new T.Camera();
    let viscosity = 0.65;
    let lastTime = 0;
    const invalidate = () => {
      if (!disposed && !frame && !document.hidden) frame = requestAnimationFrame(render);
    };
    const render = (time: number) => {
      frame = 0;
      const delta = Math.min((time - lastTime) / 1000 || 0.016, 0.05);
      lastTime = time;
      center.lerp(target, motionEnabled ? 1 - Math.exp(-delta * (35 - viscosity * 30)) : 1);
      const unsettled = center.distanceToSquared(target) > 0.000001;
      if (!unsettled) center.copy(target);
      renderer!.render(scene, camera);
      if (unsettled) invalidate();
    };
    observer = new ResizeObserver(() => {
      renderer!.setSize(canvas.clientWidth, canvas.clientHeight, false);
      material!.uniforms.uAspect!.value = canvas.clientWidth / Math.max(1, canvas.clientHeight);
      invalidate();
    });
    observer.observe(canvas);
    canvas.addEventListener(
      'pointermove',
      (event) => {
        const bounds = canvas.getBoundingClientRect();
        target.set(
          (event.clientX - bounds.left) / bounds.width,
          1 - (event.clientY - bounds.top) / bounds.height,
        );
        invalidate();
      },
      { signal: listeners.signal },
    );
    canvas.addEventListener(
      'pointerdown',
      (event) => {
        const bounds = canvas.getBoundingClientRect();
        target.set(
          (event.clientX - bounds.left) / bounds.width,
          1 - (event.clientY - bounds.top) / bounds.height,
        );
        invalidate();
      },
      { signal: listeners.signal },
    );
    const updateControls = () => {
      for (const control of controls) {
        const input = container.querySelector<HTMLInputElement>(`#${control.id}`)!;
        const value = Number(input.value);
        container.querySelector<HTMLOutputElement>(`#${control.id}-value`)!.value =
          value.toFixed(2);
        const keys: Record<string, string> = {
          refraction: 'uRefraction',
          distortion: 'uDistortion',
          chromatic: 'uChromatic',
        };
        const key = keys[control.id];
        if (key) material!.uniforms[key]!.value = value;
        else viscosity = value;
      }
      invalidate();
    };
    container.addEventListener('input', updateControls, { signal: listeners.signal });
    container.querySelector('[data-reset]')!.addEventListener(
      'click',
      () => {
        controls.forEach((control) => {
          container.querySelector<HTMLInputElement>(`#${control.id}`)!.value = String(
            control.value,
          );
        });
        target.set(0.5, 0.5);
        updateControls();
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
        showFallback('The graphics context was lost. The original image remains available.');
      },
      { signal: listeners.signal },
    );
    invalidate();
  } catch {
    showFallback(
      'WebGL is unavailable. You can still enjoy the original image and read the case study.',
    );
  }
  return { dispose: cleanup };
}

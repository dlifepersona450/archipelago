import type { Disposable } from '../core/types.ts';

export function mountDepth(container: HTMLElement): Disposable {
  const base = import.meta.env.BASE_URL;
  container.innerHTML = `<div class="depth-demo"><div class="depth-frame" tabindex="0" role="img" aria-label="An illustrated lakeside campsite, separated into three layers of depth. Use the unfold button to reveal the layers."><img class="depth-layer distance" src="${base}art/distance.svg" alt="" /><img class="depth-layer middle" src="${base}art/middle.svg" alt="" /><img class="depth-layer foreground" src="${base}art/foreground.svg" alt="" /><span class="frame-caption">FIELD NOTES / AN IMAGINED PLACE</span></div><div class="demo-toolbar"><button class="button" data-unfold aria-pressed="false">Unfold the frame ↗</button><span class="small-note">Move, focus, or touch. Three layers, one memory.</span></div><p class="small-note">Original layered illustration. Replace with your own photograph and foreground masks when ready.</p></div>`;
  const frame = container.querySelector<HTMLElement>('.depth-frame')!;
  const toggle = container.querySelector<HTMLButtonElement>('[data-unfold]')!;
  const listeners = new AbortController();
  frame.addEventListener(
    'pointermove',
    (event) => {
      const bounds = frame.getBoundingClientRect();
      frame.style.setProperty(
        '--rx',
        `${(-(event.clientY - bounds.top - bounds.height / 2) / bounds.height) * 7}deg`,
      );
      frame.style.setProperty(
        '--ry',
        `${((event.clientX - bounds.left - bounds.width / 2) / bounds.width) * 7}deg`,
      );
    },
    { signal: listeners.signal },
  );
  frame.addEventListener(
    'pointerleave',
    () => {
      frame.style.setProperty('--rx', '0deg');
      frame.style.setProperty('--ry', '0deg');
    },
    { signal: listeners.signal },
  );
  toggle.addEventListener(
    'click',
    () => {
      const expanded = frame.classList.toggle('unfolded');
      toggle.setAttribute('aria-pressed', String(expanded));
      toggle.textContent = expanded ? 'Fold the frame ↙' : 'Unfold the frame ↗';
    },
    { signal: listeners.signal },
  );
  return {
    dispose() {
      listeners.abort();
    },
  };
}

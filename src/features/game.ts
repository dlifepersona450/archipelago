import { gate, GRID_SIZE, initialGame, isWall, movePlayer, signals } from './game-state.ts';
import type { Disposable } from '../core/types.ts';

export function mountGame(container: HTMLElement): Disposable {
  container.innerHTML = `<div class="game-layout"><canvas class="game-canvas" width="490" height="490" role="img" aria-label="Seven by seven tile puzzle. Collect the three signals, then reach the gate at the top."></canvas><div><p class="eyebrow">A small playable idea</p><h3>Find your signal.</h3><p>Collect all three golden signals. Reach the orange gate to bring them home.</p><p class="game-status" role="status"></p><div class="dpad" role="group" aria-label="Movement controls"><button data-step="up" aria-label="Move up">↑</button><button data-step="left" aria-label="Move left">←</button><button data-step="down" aria-label="Move down">↓</button><button data-step="right" aria-label="Move right">→</button></div><button class="text-button" data-restart>Restart puzzle ↻</button><p class="small-note">Arrow keys / WASD / on-screen buttons</p></div></div>`;
  const canvas = container.querySelector<HTMLCanvasElement>('canvas')!;
  const context = canvas.getContext('2d');
  const status = container.querySelector<HTMLElement>('.game-status')!;
  const listeners = new AbortController();
  let state = initialGame();
  const directions: Record<string, readonly [number, number]> = {
    up: [0, -1],
    down: [0, 1],
    left: [-1, 0],
    right: [1, 0],
  };
  function paint() {
    status.textContent = state.won
      ? 'All signals found. Welcome home!'
      : `${state.collected.length} / 3 signals · Position ${state.player.x + 1}, ${state.player.y + 1}`;
    if (!context) {
      status.textContent += ' · Canvas drawing unavailable; use the position and status text.';
      return;
    }
    const size = canvas.width / GRID_SIZE;
    context.fillStyle = '#e4e9df';
    context.fillRect(0, 0, canvas.width, canvas.height);
    for (let y = 0; y < GRID_SIZE; y++)
      for (let x = 0; x < GRID_SIZE; x++) {
        context.fillStyle = isWall(x, y) ? '#56786a' : '#f4f1e4';
        context.fillRect(x * size + 3, y * size + 3, size - 6, size - 6);
      }
    context.fillStyle = '#ce5633';
    context.fillRect(gate.x * size + 16, gate.y * size + 12, size - 32, size - 24);
    for (const tile of signals)
      if (!state.collected.includes(`${tile.x},${tile.y}`)) {
        context.fillStyle = '#c19a42';
        context.beginPath();
        context.arc((tile.x + 0.5) * size, (tile.y + 0.5) * size, 10, 0, Math.PI * 2);
        context.fill();
      }
    context.fillStyle = '#253c37';
    context.beginPath();
    context.arc((state.player.x + 0.5) * size, (state.player.y + 0.5) * size, 16, 0, Math.PI * 2);
    context.fill();
    context.fillStyle = '#fff9e8';
    context.fillRect((state.player.x + 0.5) * size - 6, (state.player.y + 0.5) * size - 6, 4, 4);
    context.fillRect((state.player.x + 0.5) * size + 3, (state.player.y + 0.5) * size - 6, 4, 4);
  }
  function step(direction: string) {
    const delta = directions[direction];
    if (delta) {
      state = movePlayer(state, ...delta);
      paint();
    }
  }
  container.addEventListener(
    'click',
    (event) => {
      const button = (event.target as Element).closest<HTMLButtonElement>('button');
      if (button?.dataset.step) step(button.dataset.step);
      if (button?.hasAttribute('data-restart')) {
        state = initialGame();
        paint();
      }
    },
    { signal: listeners.signal },
  );
  container.addEventListener(
    'keydown',
    (event) => {
      if ((event.target as Element).matches('input, textarea, select')) return;
      const keys: Record<string, string> = {
        ArrowUp: 'up',
        w: 'up',
        ArrowDown: 'down',
        s: 'down',
        ArrowLeft: 'left',
        a: 'left',
        ArrowRight: 'right',
        d: 'right',
      };
      const direction = keys[event.key];
      if (direction) {
        event.preventDefault();
        step(direction);
      }
    },
    { signal: listeners.signal },
  );
  container.tabIndex = 0;
  paint();
  return {
    dispose() {
      listeners.abort();
      container.removeAttribute('tabindex');
    },
  };
}

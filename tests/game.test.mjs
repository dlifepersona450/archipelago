import assert from 'node:assert/strict';
import test from 'node:test';
import { initialGame, movePlayer } from '../src/features/game-state.ts';

test('walls, bounds, diagonal input, and a closed gate cannot produce a win', () => {
  const state = initialGame();
  assert.equal(movePlayer(state, 1, 1), state);
  assert.deepEqual(movePlayer({ ...state, player: { x: 0, y: 1 } }, -1, 0).player, { x: 0, y: 1 });
  assert.deepEqual(movePlayer({ ...state, player: { x: 2, y: 1 } }, 0, 1).player, { x: 2, y: 1 });
  assert.equal(movePlayer({ ...state, player: { x: 3, y: 1 } }, 0, -1).won, false);
});
test('collectibles are unique, state is immutable, and a complete route wins', () => {
  const original = initialGame();
  let state = original;
  const step = (dx, dy, count) => {
    for (let index = 0; index < count; index++) state = movePlayer(state, dx, dy);
  };
  step(1, 0, 4);
  assert.equal(state.collected.length, 1);
  step(-1, 0, 1);
  step(1, 0, 1);
  assert.equal(state.collected.length, 1);
  step(0, 1, 4);
  step(-1, 0, 5);
  step(0, -1, 5);
  step(1, 0, 3);
  assert.equal(state.won, true);
  assert.equal(state.collected.length, 3);
  assert.equal(movePlayer(state, 1, 0), state);
  assert.deepEqual(original, initialGame());
  assert.equal(initialGame().won, false);
});

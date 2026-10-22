export interface Tile {
  x: number;
  y: number;
}
export interface GameState {
  player: Tile;
  collected: readonly string[];
  won: boolean;
}
export const GRID_SIZE = 7;
export const signals: readonly Tile[] = [
  { x: 5, y: 1 },
  { x: 1, y: 5 },
  { x: 5, y: 5 },
];
export const gate: Tile = { x: 3, y: 0 };
const walls = new Set(['2,2', '3,2', '4,2', '2,4', '3,4', '4,4']);
export function isWall(x: number, y: number): boolean {
  return walls.has(`${x},${y}`);
}
export function initialGame(): GameState {
  return { player: { x: 1, y: 1 }, collected: [], won: false };
}
export function movePlayer(state: GameState, dx: number, dy: number): GameState {
  if (state.won || Math.abs(dx) + Math.abs(dy) !== 1) return state;
  const x = state.player.x + dx;
  const y = state.player.y + dy;
  if (x < 0 || y < 0 || x >= GRID_SIZE || y >= GRID_SIZE || isWall(x, y)) return state;
  const key = `${x},${y}`;
  const collected =
    signals.some((tile) => tile.x === x && tile.y === y) && !state.collected.includes(key)
      ? [...state.collected, key]
      : state.collected;
  return {
    player: { x, y },
    collected,
    won: collected.length === signals.length && x === gate.x && y === gate.y,
  };
}

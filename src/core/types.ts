export const islandIds = ['systems', 'playground', 'memory', 'experiment'] as const;
export type IslandId = (typeof islandIds)[number];
export type ViewMode = 'explore' | 'quick';
export type DemoId = 'depth' | 'fluid' | 'game';

export interface Island {
  id: IslandId;
  number: string;
  name: string;
  subtitle: string;
  description: string;
  color: string;
  position: readonly [number, number, number];
}

export interface Project {
  id: string;
  island: IslandId;
  title: string;
  summary: string;
  status: 'Working prototype' | 'Concept / sample';
  tags: readonly string[];
  problem: string;
  approach: string;
  outcome: string;
  demo?: DemoId;
  source?: string;
}

export interface Route {
  mode: ViewMode;
  island: IslandId | null;
  project: string | null;
}

export interface Disposable {
  dispose(): void;
}

import type { Island, IslandId, Project } from '../core/types.ts';

export const profile = {
  name: 'DLife',
  github: 'https://github.com/dlifepersona450',
  introduction:
    'An explorer of technology, creative websites, games, and the little things in between.',
} as const;

export const islands: readonly Island[] = [
  {
    id: 'systems',
    number: '01',
    name: 'Systems',
    subtitle: 'Making things connect.',
    description:
      'Server racks, database nodes, ERP workflows, and the quiet beauty of a system that works.',
    color: '#547d73',
    position: [-3.8, 0, -2.4],
  },
  {
    id: 'playground',
    number: '02',
    name: 'Playground',
    subtitle: 'Ideas you can play with.',
    description: 'Small games, interactive objects, and prototypes that begin with “what if?”.',
    color: '#cd5735',
    position: [3.3, 0, -2.0],
  },
  {
    id: 'memory',
    number: '03',
    name: 'Memory',
    subtitle: 'Life outside the screen.',
    description:
      'Photography, places, food, and fragments worth keeping. Some memories deserve another dimension.',
    color: '#b28745',
    position: [-3.0, 0, 3.4],
  },
  {
    id: 'experiment',
    number: '04',
    name: 'Experiment',
    subtitle: 'A little beautifully strange.',
    description: 'Fluid lenses, optical illusions, generative forms, and motion with a purpose.',
    color: '#7777a0',
    position: [4.1, 0, 3.5],
  },
];

// Sample concepts carry explicit labels; never present imagined client work as shipped work.
export const projects: readonly Project[] = [
  {
    id: 'contractflow',
    island: 'systems',
    title: 'ContractFlow',
    status: 'Concept / sample',
    summary: 'An illustrative case study for a contract approval and integration workflow.',
    tags: ['ERP', 'Integration', 'Workflow'],
    problem:
      'Sample brief: contract requests are scattered across messages, spreadsheets, and approval queues.',
    approach:
      'A proposed state machine connects intake, review, approval, and an auditable ERP handoff. Retries and idempotency belong at integration boundaries.',
    outcome:
      'Concept only. No client, production deployment, performance result, or repository is claimed. Replace this record with your real project evidence.',
  },
  {
    id: 'signal-garden',
    island: 'playground',
    title: 'Signal Garden',
    status: 'Working prototype',
    summary: 'A tiny playable puzzle. Collect three signals and find the way home.',
    tags: ['Canvas 2D', 'Game logic', 'Keyboard'],
    demo: 'game',
    problem: 'Can a small interaction have a clear goal without a tutorial or a physics engine?',
    approach:
      'A deterministic tile world, three collectibles, and a gate. Keyboard and touch controls share the same pure state transition.',
    outcome:
      'A playable local demo with restart and a win state. This is a portfolio prototype, not a published game release.',
  },
  {
    id: 'beyond-the-frame',
    island: 'memory',
    title: 'Beyond the Frame',
    status: 'Working prototype',
    summary: 'A quiet landscape that unfolds into foreground, middle ground, and distance.',
    tags: ['Layered depth', 'CSS 3D', 'Photography concept'],
    demo: 'depth',
    problem: 'A flat gallery can hide the feeling of being inside a place.',
    approach:
      'Three original transparent SVG layers move at different depths. Pointer, focus, and an explicit touch-friendly toggle reveal the composition.',
    outcome:
      'A working depth interaction using original landscape illustration. Personal photography and subject masks are not supplied yet.',
  },
  {
    id: 'fluid-lens',
    island: 'experiment',
    title: 'Fluid Lens Lab',
    status: 'Working prototype',
    summary: 'Bend an image through a liquid lens. Change the material, see the consequence.',
    tags: ['GLSL', 'Three.js', 'Refraction'],
    demo: 'fluid',
    problem:
      'A shader is more interesting when visitors can understand what its parameters change.',
    approach:
      'A scoped fragment shader refracts a local image. Four HTML sliders control viscosity, refraction, distortion, and chromatic separation.',
    outcome:
      'A working single-pass shader with on-demand frames, bounded resolution, and a static fallback. Viscosity is an artistic response control, not fluid simulation.',
  },
];

export function projectsForIsland(id: IslandId | null): readonly Project[] {
  return id ? projects.filter((project) => project.island === id) : projects;
}

export function findProject(id: string | null): Project | undefined {
  return projects.find((project) => project.id === id);
}

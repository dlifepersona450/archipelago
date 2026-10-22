import * as T from 'three';
import { islands } from '../content/portfolio.ts';
import type { IslandId } from '../core/types.ts';

export interface SceneGraph {
  scene: T.Scene;
  roots: Map<IslandId, T.Group>;
  pickables: T.Object3D[];
}

/** Procedural miniatures keep the first visit independent of model downloads. */
export function buildScene(): SceneGraph {
  const scene = new T.Scene();
  const roots = new Map<IslandId, T.Group>();
  const pickables: T.Object3D[] = [];
  const materials = new Map<string, T.MeshStandardMaterial>();
  const material = (color: string) => {
    let result = materials.get(color);
    if (!result) {
      result = new T.MeshStandardMaterial({ color, roughness: 0.9, flatShading: true });
      materials.set(color, result);
    }
    return result;
  };
  const mesh = (
    geometry: T.BufferGeometry,
    color: string,
    parent: T.Object3D,
    x = 0,
    y = 0,
    z = 0,
  ) => {
    const object = new T.Mesh(geometry, material(color));
    object.position.set(x, y, z);
    parent.add(object);
    return object;
  };
  const box = (
    parent: T.Object3D,
    color: string,
    x: number,
    y: number,
    z: number,
    width: number,
    height: number,
    depth: number,
  ) => mesh(new T.BoxGeometry(width, height, depth), color, parent, x, y, z);
  const tree = (parent: T.Object3D, x: number, z: number, height = 1.1) => {
    mesh(
      new T.CylinderGeometry(0.055, 0.075, height * 0.65, 5),
      '#98754f',
      parent,
      x,
      height * 0.3 + 0.28,
      z,
    );
    mesh(
      new T.ConeGeometry(height * 0.36, height, 6),
      '#708974',
      parent,
      x,
      height * 0.7 + 0.28,
      z,
    );
  };

  scene.add(new T.HemisphereLight('#fff9e7', '#71887f', 3));
  const sun = new T.DirectionalLight('#fff0d5', 3.3);
  sun.position.set(-6, 12, 7);
  scene.add(sun);

  const water = new T.Mesh(
    new T.CircleGeometry(11, 64),
    new T.MeshBasicMaterial({ color: '#dce6df' }),
  );
  water.position.y = -0.7;
  water.rotation.x = -Math.PI / 2;
  scene.add(water);
  const rippleMaterial = new T.MeshBasicMaterial({ color: '#bdcfc3' });
  for (const radius of [2.8, 5, 7.5, 9.5, 10.8]) {
    const ring = new T.Mesh(new T.RingGeometry(radius, radius + 0.025, 96), rippleMaterial);
    ring.position.y = -0.68;
    ring.rotation.x = -Math.PI / 2;
    scene.add(ring);
  }

  for (const island of islands) {
    const root = new T.Group();
    root.position.fromArray(island.position);
    root.userData.island = island.id;
    scene.add(root);
    roots.set(island.id, root);
    pickables.push(root);
    const base = mesh(new T.CylinderGeometry(2, 1.6, 0.75, 9), '#b8ad96', root, 0, -0.2, 0);
    base.rotation.y = 0.15;
    mesh(new T.CylinderGeometry(2.04, 2, 0.16, 9), '#e6dfc9', root, 0, 0.26, 0);
    const shore = mesh(new T.RingGeometry(2.13, 2.19, 9), '#f8f6ec', root, 0, -0.64, 0);
    shore.rotation.x = -Math.PI / 2;
    for (let index = 0; index < 4; index++) {
      const angle = index * 1.9 + 0.5;
      mesh(
        new T.DodecahedronGeometry(0.18 + index * 0.025),
        '#a5aa96',
        root,
        Math.cos(angle) * 1.5,
        0.42,
        Math.sin(angle) * 1.4,
      );
    }

    if (island.id === 'systems') {
      for (let rack = 0; rack < 3; rack++) {
        const x = (rack - 1) * 0.72;
        const height = 1.2 + rack * 0.22;
        box(root, '#37524f', x, 0.35 + height / 2, -0.25, 0.55, height, 0.65);
        for (let slot = 0; slot < 4; slot++) {
          box(root, '#77978a', x, 0.62 + slot * 0.24, 0.085, 0.42, 0.1, 0.04);
          box(root, '#eac588', x + 0.12, 0.62 + slot * 0.24, 0.12, 0.05, 0.035, 0.025);
        }
      }
      mesh(new T.CylinderGeometry(0.35, 0.35, 0.65, 20), '#c9a772', root, -1, 0.65, 0.9);
      const pipe = new T.CatmullRomCurve3([
        new T.Vector3(-1, 0.38, 0.9),
        new T.Vector3(0.2, 0.38, 1),
        new T.Vector3(1, 0.38, 0),
      ]);
      mesh(new T.TubeGeometry(pipe, 16, 0.045, 6, false), '#cd5735', root);
      tree(root, -1.2, -0.85, 0.8);
    } else if (island.id === 'playground') {
      box(root, '#cd5735', 0, 0.95, 0, 0.85, 1.25, 0.7);
      box(root, '#e9bb72', 0, 1.58, 0, 0.95, 0.18, 0.8);
      box(root, '#263d3c', 0, 1.19, 0.365, 0.63, 0.48, 0.03);
      box(root, '#a6d0ba', 0, 1.19, 0.39, 0.45, 0.32, 0.015);
      box(root, '#e7d5a7', 0, 0.8, 0.5, 0.85, 0.16, 0.45);
      mesh(new T.SphereGeometry(0.075, 8, 6), '#263d3c', root, -0.2, 0.96, 0.52);
      for (let step = 0; step < 3; step++)
        box(
          root,
          ['#cd5735', '#e7ba69', '#77978a'][step] ?? '#cd5735',
          0.9,
          0.45 + step * 0.18,
          0.7 - step * 0.45,
          0.4,
          0.25 + step * 0.3,
          0.4,
        );
      tree(root, -1, -0.5, 1.4);
      tree(root, 0.95, -0.9, 0.9);
    } else if (island.id === 'memory') {
      box(root, '#8b7050', -0.25, 1.15, -0.35, 1.6, 1.35, 0.13);
      box(root, '#f7efd8', -0.25, 1.17, -0.25, 1.36, 1.1, 0.08);
      box(root, '#abc8bc', -0.25, 1.2, -0.19, 1.18, 0.9, 0.02);
      const mountain = mesh(new T.ConeGeometry(0.58, 0.78, 3), '#587d71', root, -0.2, 1.01, -0.1);
      mountain.rotation.x = Math.PI / 2;
      mesh(new T.SphereGeometry(0.15, 12, 8), '#edd197', root, 0.18, 1.45, -0.1);
      box(root, '#b38c5d', 0.1, 0.56, 0.8, 1.25, 0.12, 0.55);
      for (const x of [-0.35, 0.55]) box(root, '#907353', x, 0.42, 0.8, 0.09, 0.25, 0.4);
      tree(root, -1.15, -0.5, 1.7);
      tree(root, 1, 0.2, 1.1);
    } else {
      const sculpture = new T.Group();
      sculpture.position.set(0, 1.25, 0);
      sculpture.rotation.set(0.3, 0.3, 0.3);
      root.add(sculpture);
      mesh(new T.TorusGeometry(0.75, 0.12, 10, 40), '#7777a0', sculpture);
      const inner = mesh(new T.TorusGeometry(0.5, 0.08, 10, 32), '#d39977', sculpture);
      inner.rotation.y = Math.PI / 2;
      mesh(new T.IcosahedronGeometry(0.27), '#d8ca9c', sculpture);
      box(root, '#b8b4c4', 0, 0.43, 0, 0.8, 0.25, 0.8);
      for (let item = 0; item < 3; item++)
        mesh(
          new T.IcosahedronGeometry(0.2 + item * 0.07),
          '#909bb0',
          root,
          -1 + item * 0.9,
          0.55,
          0.95,
        );
      tree(root, 1.15, -0.85, 0.9);
    }

    // A flag is both a visual landmark and a stable point for HTML labels.
    mesh(new T.CylinderGeometry(0.025, 0.025, 1.4, 6), '#6d715e', root, 1.3, 1, 0.3);
    box(root, island.color, 1.55, 1.6, 0.3, 0.48, 0.27, 0.035);
  }

  const boat = mesh(new T.ConeGeometry(0.25, 0.9, 4), '#f8f4e5', scene, 0.5, -0.48, 0.7);
  boat.rotation.set(0, 0.4, Math.PI / 2);
  const sail = mesh(new T.ConeGeometry(0.32, 0.7, 3), '#cd5735', scene, 0.5, 0.05, 0.7);
  sail.scale.z = 0.07;
  return { scene, roots, pickables };
}

# File map

[Docs](../README.md) · [Architecture](README.md)

| File / kelompok                                                   | Fungsi                                                                         |
| ----------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| `index.html`                                                      | Metadata, app root, entry module, noscript fallback                            |
| `package.json`, `package-lock.json`, `.nvmrc`                     | Script, dependency versions, install reproducible, Node major                  |
| `tsconfig.json`, `vite.config.ts`                                 | Strict TS, build statis, relative base, pemisahan Three.js chunk               |
| `eslint.config.mjs`, `.prettierrc.json`, `.editorconfig`          | Pemeriksaan kode dan konsistensi penulisan                                     |
| `src/main.ts`                                                     | Orkestrasi seluruh pengalaman, History API, modal, lazy imports, HMR           |
| `src/content/portfolio.ts`                                        | Data profil, pulau, proyek, lookup/filter                                      |
| `src/core/types.ts`                                               | Union ID dan interface `Island`, `Project`, `Route`, `Disposable`              |
| `src/core/navigation.ts`                                          | Parsing/serialisasi hash, island guard, escaping dan URL allowlist             |
| `src/ui/shell.ts`                                                 | Shell, kartu, HTML navigasi dan fallback atlas                                 |
| `src/ui/project-detail.ts`                                        | Case study dan demo container                                                  |
| `src/scene/build.ts`                                              | Miniatur original dari primitive geometry, material reuse, pick roots          |
| `src/scene/world.ts`                                              | Kamera ortografis, picking, projection labels, invalidation, resource disposal |
| `src/features/depth.ts`                                           | Tiga layer gambar, pointer tilt, tombol unfold                                 |
| `src/features/fluid-shader.ts`                                    | GLSL vertex/fragment untuk lensa lokal                                         |
| `src/features/fluid.ts`                                           | Texture, shader uniforms, slider, pointer smoothing, rendering, fallback       |
| `src/features/game-state.ts`                                      | Level grid, collectible, gate, immutable movement                              |
| `src/features/game.ts`                                            | Canvas drawing, keyboard/D-pad, status dan restart                             |
| `src/style.css`, `src/vite-env.d.ts`                              | Styling/responsive/motion/local fonts; tipe Vite                               |
| `public/art/`                                                     | Tiga layer transparan dan satu gambar gabungan untuk shader                    |
| `public/fonts/`, `public/licenses/`                               | Aset font dan license notices yang ikut build                                  |
| `tests/`                                                          | Route/security/content, game, dan commit convention tests                      |
| `scripts/check-docs.mjs`, `check-commit.mjs`, `browser-check.mjs` | Validasi docs, pesan commit, dan user flow browser                             |
| `.githooks/`                                                      | Hook opt-in, belum diaktifkan                                                  |
| `.github/`                                                        | Template issue/PR dan CI untuk root repository mandiri                         |
| `docs/`                                                           | Manual, referensi, standar, showcase dan rights                                |

`node_modules/` dan `dist/` adalah hasil instalasi/build yang diabaikan Git, bukan source yang perlu disalin. Screenshot docs tidak ikut bundle aplikasi. Tidak ada source map atau symbol inventory generated yang diklaim sebagai dokumentasi otomatis.

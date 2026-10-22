# Jalur belajar

[Docs](../README.md) · [Architecture](../architecture/README.md)

Belajar dari kontrak paling sederhana menuju rendering. Gunakan source sebenarnya sebagai contoh, lalu ubah satu bagian di branch/scratch project agar efeknya mudah diamati.

| Langkah                         | Yang dipahami                                         | Source dan latihan                                                                                                                |
| ------------------------------- | ----------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| 1. Jalankan shell               | Entry HTML, Vite, module dan CSS                      | `index.html`, `main.ts`, `ui/shell.ts`. Jalankan Quick View sebelum memeriksa 3D.                                                 |
| 2. Data sebagai kontrak         | Union ID, interface, content lookup                   | `core/types.ts`, `content/portfolio.ts`. Tambahkan record sample pada salah satu pulau.                                           |
| 3. Navigasi yang bisa dibagikan | Hash, History API, input validation                   | `core/navigation.ts`, `main.ts`. Buka URL langsung lalu gunakan Back.                                                             |
| 4. Dunia dari bentuk sederhana  | Scene, group, material, mesh, camera                  | `scene/build.ts`. Ubah satu landmark tanpa mengubah data proyek.                                                                  |
| 5. Input dan rendering          | Raycaster, label projection, invalidation, delta time | `scene/world.ts`. Ikuti callback klik sampai koleksi berubah.                                                                     |
| 6. Depth tanpa GPU scene baru   | Transparent layers, perspective, accessibility        | `features/depth.ts`, `.depth-frame` CSS. Ubah satu layer lalu uji toggle/reduced motion.                                          |
| 7. Shader yang terisolasi       | UV, sampling, uniforms, chromatic separation          | `features/fluid-shader.ts`, `fluid.ts`. Ubah refraction dan bandingkan hasil.                                                     |
| 8. Game sebagai state murni     | Transition, collision, collectibles, win              | `features/game-state.ts`, `game.ts`, tests. Tambahkan tembok sambil memastikan level tetap dapat dimenangkan.                     |
| 9. Lifecycle dan mutu           | Ownership, stale async, cleanup, tests/docs           | `main.ts`, [runtime](../architecture/RUNTIME.md), [verification](../VERIFICATION.md). Buka/tutup demo cepat dan periksa resource. |

## Mengikuti satu fitur dari ujung ke ujung

Untuk Fluid Lens, mulai dari record `fluid-lens`. Tombol kartu membawa ID itu ke route; renderer detail menyediakan container; controller mengimpor mount function; mount membuat texture/material/canvas dan slider DOM; input mengubah uniform lalu menginvalidasi frame; close dialog memanggil dispose. Ini pola yang sama untuk fitur lain, dengan detail resource yang berbeda.

Tidak perlu mengadopsi seluruh library baru untuk setiap eksperimen. Tentukan dulu kontrak input, output, mounted lifetime, fallback, dan alasan interaksinya. [Feature reference](../reference/FEATURES.md) menjelaskan batas teknis tiga contoh yang sudah ada.

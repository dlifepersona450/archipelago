# Arsitektur

[Docs](../README.md) · [Runtime](RUNTIME.md) · [Files](FILES.md) · [Decisions](DECISIONS.md)

ARCHIPELAGO adalah aplikasi browser statis TypeScript dengan satu controller. Tidak ada React, server rendering, CMS, router framework, atau database. Vite membundel module, CSS, asset URL, dan dynamic imports.

## Batas sistem

| Lapisan    | Pemilik                                                         | Kontrak                                                                |
| ---------- | --------------------------------------------------------------- | ---------------------------------------------------------------------- |
| Konten     | `content/portfolio.ts`                                          | Profil, empat pulau, record proyek; dibaca UI dan scene                |
| Domain     | `core/types.ts`, `core/navigation.ts`, `features/game-state.ts` | Tipe, hash route, sanitasi, transisi puzzle murni                      |
| Orkestrasi | `main.ts`                                                       | Route aktif, modal, motion, world availability, lazy feature ownership |
| HTML/CSS   | `ui/`, `style.css`                                              | Navigasi, case study, kontrol, focus target, fallback map              |
| Dunia      | `scene/build.ts`, `scene/world.ts`                              | Geometri, kamera, ray picking, label projection, RAF, GPU disposal     |
| Demo       | `features/depth.ts`, `game.ts`, `fluid.ts`                      | Mount pada satu container; mengembalikan `dispose()`                   |

Aliran utama: input → controller → route → koleksi HTML + scene selection. Scene mengirim callback ID pulau; scene tidak mengedit dialog atau record proyek. Quick View dan Explore tidak memiliki salinan data terpisah.

## State dan resource ownership

Route memiliki `mode`, `island`, dan `project`. Hash adalah representasi yang dapat dibagikan. Parser memvalidasi view/island; lookup proyek memvalidasi project ID. URL tidak disisipkan sebagai markup.

Controller memiliki satu world dan paling banyak satu demo aktif. `demoGeneration` membatalkan hasil import/mount yang sudah tidak relevan. World memiliki RAF, resize observer, listener pointer/visibility/context, renderer, geometry, dan material. Fluid lens memiliki set resource GPU sendiri; world dipause saat dialog terbuka.

Dialog native memberikan modal focus containment dan Escape. Controller mengembalikan fokus ke pemicu yang masih terpasang, atau tombol koleksi sebagai fallback. Koleksi tidak di-render ulang ketika hanya membuka detail, agar pemicu tetap hidup.

## Progressive enhancement

HTML tetap menjadi jalan menuju semua record. Desktop Explore baru memuat Three.js world sesuai kebutuhan. Mobile baru memuat GPU jika pengunjung membuka demo shader. Quick View pada kunjungan awal tidak membuat world. Hilangnya context world mengaktifkan peta HTML/CSS; shader yang gagal tetap menampilkan gambar sumber.

Fallback ini membutuhkan JavaScript; `noscript` memberikan tautan profil GitHub. Ini bukan implementasi SSR atau halaman proyek tanpa JavaScript. Batas itu dicatat, bukan diklaim sebagai aksesibilitas penuh tanpa script.

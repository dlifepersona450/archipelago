# Memahami workspace DLife

[Docs](README.md) · [File map](architecture/FILES.md)

| Folder yang diperiksa    | Cara kerja dan tujuan                                                                                                                                                                                                                                                             |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `timefold/`              | Aplikasi TypeScript + Three.js + Vite. `main.ts` mengendalikan UI/timeline; `archive.ts` menyimpan konten era; `timeline.ts` menyampel waktu; `world.ts` menghubungkan scene builder, animation, picking, lifecycle. Detail objek dan Canvas mini-game dibuka melalui dialog DOM. |
| `timefold/docs/`         | Manual implementasi: learning path, architecture/runtime/contracts/files, semantic module references, content/timeline authoring, generated inventories, showcase, dependency/asset rights. Generator docs dan link checker memiliki kontrak khusus source TIMEFOLD.              |
| `dlifepersona450/`       | Identity kit dan profil GitHub. Markdown, SVG/PNG/WebP, metadata JSON, dan docs pengeditan/publishing. Tidak memerlukan aplikasi frontend atau backend.                                                                                                                           |
| `scripts/` di root DLife | Alat ekspor aset profil dan publishing profil; terpisah dari runtime web.                                                                                                                                                                                                         |
| `.agents/`, `.codex/`    | Direktori lokal yang kosong saat pemeriksaan awal. Tidak ada instruksi agent aktif di sana.                                                                                                                                                                                       |
| `archipelago/`           | Folder baru mandiri: showcase berdasarkan minat, bukan kronologi hidup. Tidak mengubah scene, data, atau dokumentasi proyek lama.                                                                                                                                                 |

## Apa yang dipertahankan dari pola TIMEFOLD

Konten bertipe menjadi sumber data bersama; DOM menangani teks, tautan, dan dialog; Three.js menangani bagian yang membutuhkan GPU. Semua fitur memiliki batas cleanup. Dokumentasi ditempatkan di dalam proyek agar source dan penjelasan bisa berkembang bersama.

Yang dibangun ulang adalah domain dan runtime: empat kategori pulau, hash route Explore/Quick, dan tiga fitur yang dimuat sesuai kebutuhan. Tidak ada ketergantungan runtime pada source, node_modules, atau public assets TIMEFOLD. Tiga font dan notices disalin agar folder baru dapat dibangun sendiri, dengan provenance dicatat.

## Catatan status Git

Pada pemeriksaan awal, `git status` dari root DLife melaporkan bahwa folder bukan Git repository. Beberapa dokumen lama menyebut remote atau susunan repository yang berbeda. Dokumen itu bukan bukti keadaan `.git` saat ini; periksa checkout sebenarnya sebelum menjalankan perintah Git atau publishing.

Pada langkah publikasi yang diminta pemilik, `archipelago/` diinisialisasi sebagai repository mandiri, sama seperti checkout `timefold/` dan `dlifepersona450/`. Origin mengarah ke [dlifepersona450/archipelago](https://github.com/dlifepersona450/archipelago). Identitas commit lokal memakai DLife dan email noreply GitHub; credential tetap di luar source. Root DLife tetap container proyek, bukan repository bersama.

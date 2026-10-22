# Menambahkan isi portofolio

[Docs](README.md) · [Assets](ASSETS.md) · [Contract types](../src/core/types.ts)

Satu sumber konten berada di `src/content/portfolio.ts`. Mengubah record di sini memperbarui Explore dan Quick View. Tidak ada scraping GitHub, sinkronisasi CMS, atau editor admin.

## Profil dan pulau

`profile.name`, `github`, dan `introduction` dipakai di header/footer/About. Gunakan alamat publik yang benar-benar milikmu. Judul dan beberapa copy DLife pada controller masih ditulis eksplisit; jika mengganti identitas, cari juga `DLife` pada source dan HTML.

Setiap `Island` punya ID stabil, nomor, nama, subtitle, deskripsi, warna, serta posisi `[x,y,z]`. ID dipakai hash, data proyek, DOM, dan scene. Mengganti ID adalah perubahan kontrak tautan. Menambah pulau kelima memerlukan pembaruan union ID, peta CSS, scene landmark, layout, dan tes; bukan sekadar menambah satu teks.

## Record proyek

| Field              | Arti                                                                                      |
| ------------------ | ----------------------------------------------------------------------------------------- |
| `id`               | Slug unik, stabil, dipakai deep link                                                      |
| `island`           | `systems`, `playground`, `memory`, atau `experiment`                                      |
| `title`, `summary` | Nama dan ringkasan singkat                                                                |
| `status`           | `Working prototype` atau `Concept / sample`; perluasan label harus memperbarui union type |
| `tags`             | Teknologi atau kategori yang benar-benar relevan                                          |
| `problem`          | Pertanyaan atau masalah yang menjadi alasan karya                                         |
| `approach`         | Cara penyelesaian dan keputusan teknis                                                    |
| `outcome`          | Hasil yang sudah dapat dibuktikan dan keterbatasannya                                     |
| `demo`             | Opsional: `depth`, `fluid`, atau `game`, yaitu fitur lokal yang sudah tersedia            |
| `source`           | Opsional: URL HTTP(S) repository yang benar-benar ada                                     |

Contoh penambahan di array `projects` berikut adalah **template**, bukan klaim karya nyata:

```ts
{
  id: 'inventory-bridge',
  island: 'systems',
  title: 'Inventory Bridge',
  status: 'Concept / sample',
  summary: 'A proposed integration between inventory events and an ERP.',
  tags: ['Integration', 'Event processing'],
  problem: 'Sample brief: stock changes need a consistent handoff.',
  approach: 'Plan an idempotent consumer with explicit retries and audit events.',
  outcome: 'Design proposal only; replace with verified implementation evidence.',
},
```

Tambahkan `source` hanya setelah memiliki URL nyata. Tanpa field tersebut, UI menjelaskan bahwa link source belum tersedia. Link profil di header bukan link repository individual. Renderer melakukan escaping untuk string dan menolak scheme selain HTTP(S).

## Proyek produksi atau arsip nyata

Jika karya sudah dirilis, perluas `Project.status` dengan label yang tepat dan dokumentasikan. Ganti sample copy dengan peranmu, batas pekerjaan, keputusan, hasil terukur beserta asal pengukuran, serta link demo/source yang diizinkan. Jangan memasukkan data klien, credential, dokumen internal, atau foto tanpa hak publikasi.

Perjalanan, makanan, dan album dapat ditambahkan sebagai proyek editorial di Memory. Edisi ini belum punya schema album khusus, lightbox multi-foto, metadata EXIF, atau timeline perjalanan. Tambahkan struktur tersebut bila kontennya sudah tersedia dan kebutuhan nyata jelas.

## Memeriksa perubahan

Jalankan `npm run check`; coba filter pulau melalui label dan Quick View, lalu buka deep link record baru. Pastikan summary, status, isi case study, tags, dan link benar. Untuk perubahan perilaku/UI, gunakan [browser verification](VERIFICATION.md).

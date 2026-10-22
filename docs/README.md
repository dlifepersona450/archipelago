# Dokumentasi ARCHIPELAGO

Manual ini menjelaskan implementasi yang berada di folder ini. Roadmap dibedakan dari kemampuan yang sudah berjalan. Penjelasan mengikuti pola TIMEFOLD: konsep, arsitektur, alur runtime, authoring konten, pembelajaran, referensi, verifikasi, dan asal aset.

| Ingin melakukan apa?                         | Baca                                                               |
| -------------------------------------------- | ------------------------------------------------------------------ |
| Menjalankan dan mencoba fitur                | [README proyek](../README.md)                                      |
| Memahami gabungan tiga konsep                | [Creative concept](../CONCEPT.md)                                  |
| Memahami DLife dan perbedaan dengan TIMEFOLD | [Konteks workspace](WORKSPACE.md)                                  |
| Melihat batas modul dan sumber state         | [Arsitektur](architecture/README.md)                               |
| Mengikuti startup, klik, dialog, dan cleanup | [Runtime journey](architecture/RUNTIME.md)                         |
| Mencari tanggung jawab file                  | [File map](architecture/FILES.md)                                  |
| Memahami pilihan teknis                      | [Architecture decisions](architecture/DECISIONS.md)                |
| Menambahkan karya atau bukti proyek          | [Content authoring](CONTENT.md)                                    |
| Mengganti SVG menjadi foto dan masks         | [Assets dan layered depth](ASSETS.md)                              |
| Belajar membangun pengalaman serupa          | [Learning path](learn/README.md)                                   |
| Memverifikasi interaksi dan build            | [Verification](VERIFICATION.md)                                    |
| Menjaga kode, Git, review, dan aksesibilitas | [Standar](standards/README.md) · [AGENTS](../AGENTS.md)            |
| Menyiapkan repository dan hosting            | [Deployment](DEPLOYMENT.md)                                        |
| Menentukan langkah produksi berikutnya       | [Roadmap](ROADMAP.md)                                              |
| Mencari API dan inspirasi resmi              | [References](reference/REFERENCES.md)                              |
| Memahami asal dan izin aset                  | [Asset register](../ASSET_SOURCES.md) · [Rights](rights/README.md) |
| Melihat dan membuat ulang screenshot         | [Showcase](showcase/README.md)                                     |

Urutan baca awal: workspace → arsitektur → runtime → konten → verifikasi. Untuk perubahan tertentu, lanjutkan ke referensi [world](reference/WORLD.md), [fitur](reference/FEATURES.md), atau [tooling](reference/TOOLING.md).

`npm run docs:check` memeriksa target file tautan Markdown lokal. Ia tidak memeriksa anchor, tautan internet, atau kebenaran penjelasan. Tidak ada inventori simbol generated pada edisi ini; jangan menganggap mekanisme generator TIMEFOLD juga tersedia di sini.

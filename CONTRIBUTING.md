# Berkontribusi

Mulai dari [agent contract](AGENTS.md), [coding standard](docs/standards/CODING.md), dan [Git workflow](docs/standards/GIT_WORKFLOW.md). Aturan ini berlaku untuk kontributor manusia maupun agent.

1. Baca modul dan docs yang terkait; identifikasi perilaku serta batas task.
2. Jika folder sudah menjadi Git repository, periksa perubahan yang ada dan buat branch sesuai jenis pekerjaan. Jangan menimpa pekerjaan pengguna atau menginisialisasi repository baru tanpa instruksi.
3. Implementasikan perubahan yang terfokus. Pisahkan konten, domain logic, DOM, dan WebGL. Tambahkan komentar yang menjelaskan keputusan tidak jelas.
4. Perbarui docs, tes bermakna, dan asal aset pada perubahan yang sama.
5. Jalankan `npm run format`, lalu `npm run check`. Untuk perubahan interaksi, jalankan `npm run test:browser` setelah browser tersedia.
6. Jika diminta membuat commit, gunakan header Conventional Commits dan body konkret `Why:`, `Changes:`, `Validation:`. Validasi file pesan dengan `npm run commit:check -- <message-file>`.
7. Jika diminta membuka PR, gunakan [template](.github/pull_request_template.md) dan laporkan hasil verifikasi, batas yang tersisa, serta screenshot relevan. Jangan menyatakan status CI atau branch protection yang belum terpasang.

Untuk dokumentasi saja, jalankan `npm run format:check` dan `npm run docs:check`. Pemeriksaan lain dibutuhkan bila perubahan juga mengubah kontrak atau perintah yang dijalankan.

## Hook lokal opsional

Perintah berikut hanya untuk situasi **archipelago telah dipilih sebagai root repository mandiri**:

```bash
git config core.hooksPath .githooks
```

Proyek ini sekarang memakai root repository mandiri. Hook sudah aktif pada checkout yang digunakan untuk publikasi awal; clone baru tetap menjalankan perintah di atas karena konfigurasi Git lokal tidak ikut di-clone.

Hook pre-commit memeriksa lint, format, dan tautan docs. Hook commit-msg memeriksa pesan. Keduanya tidak diaktifkan otomatis saat `npm ci`, tidak melakukan stage, dan tidak memodifikasi file. Hook bisa dilewati oleh Git; pemeriksaan CI dan review tetap diperlukan. Jangan menjalankan konfigurasi ini dari root DLife untuk menunjuk hook milik proyek lain secara diam-diam.

Untuk workspace DLife yang mempertahankan banyak proyek, integrasikan CI dan hook di root repository secara sengaja dengan working directory `archipelago/`; lihat [deployment dan repository](docs/DEPLOYMENT.md).

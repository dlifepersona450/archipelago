# Git workflow dan commit standard

[Standards](README.md) · [Contributing](../../CONTRIBUTING.md) · [Deployment](../DEPLOYMENT.md)

Pola yang dipilih: `main` stabil, branch berumur pendek, PR terfokus, verifikasi, review, merge. Ini menyesuaikan [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow) untuk proyek personal. Tidak diperlukan branch `develop` permanen atau release train ala organisasi besar.

## Branch

Gunakan `<type>/<short-kebab-topic>`, misalnya `feat/fluid-lens-controls`, `fix/dialog-focus`, `docs/photo-authoring`, atau `perf/idle-rendering`. Jenis lain yang diterima: `refactor`, `test`, `chore`, `ci`. Sertakan ID issue hanya jika issue itu benar-benar ada.

Sebelum membuat branch, periksa root repository, branch aktif, dan perubahan pengguna. Jika task hanya mengedit folder, jangan menganggap Git initialization, commit, push, atau deployment ikut diminta. Repo yang belum punya `.git` membutuhkan keputusan penempatan tersendiri.

## Conventional Commits

Header mengikuti [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/):

```text
type(scope): imperative summary
```

Jenis: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`. Scope disarankan bila membantu, misalnya `world`, `navigation`, `content`, `depth`, `fluid`, `game`, `tooling`, atau `docs`. Header maksimal 72 karakter; ringkasan menerangkan perubahan konkret, bukan `update`, `fix stuff`, atau `WIP`.

Body wajib untuk setiap commit yang ditulis kontributor/agent. `Why`, `Changes`, dan `Validation` adalah **kebijakan tambahan proyek ini**, bukan bagian wajib dari spesifikasi Conventional Commits.

```text
fix(navigation): restore focus after closing a project

Why: Replacing the project grid removed the button that opened the dialog.

Changes: Preserve the grid when only the selected project changes and
restore focus to its surviving trigger on close.

Validation: npm run check and npm run test:browser passed. Manually
opened and closed the depth demo with Enter and Escape at desktop width.
```

Contoh di atas adalah **contoh format**, bukan bukti suatu pengujian pada commit tertentu. Tuliskan hasil yang benar-benar dijalankan. Jika pemeriksaan tidak bisa dilakukan, jelaskan alasan dan sisa risiko secara spesifik di bagian Validation.

Breaking change memakai `!` pada header dan footer `BREAKING CHANGE:` yang menjelaskan migrasi. Contoh: mengganti stable island IDs sehingga bookmark perlu diperbarui. Footer `Refs:` atau `Closes:` boleh merujuk issue nyata. Tidak ada ticket atau signature fiktif.

Validasi pesan sebelum commit:

```bash
npm run commit:check -- /path/to/message.txt
```

Validator memeriksa struktur header/body dan keberadaan penjelasan minimum. Ia tidak bisa menilai kejujuran hasil tes, kualitas imperative English, atau apakah satu commit benar-benar atomik; bagian itu memerlukan review. Pesan merge otomatis dari Git dapat melewati hook pengguna yang sama; sesuaikan strategy merge secara eksplisit, jangan mematikan semua quality checks tanpa alasan.

## Commit dan PR yang mudah ditinjau

Satu commit mewakili perubahan yang koheren. Jangan campur refactor besar, format seluruh repo, dependency upgrade, dan fitur yang tidak terkait. Periksa staged diff; jangan memakai stage-all untuk menelan perubahan pengguna tanpa pemeriksaan.

PR harus menjelaskan masalah dan perilaku setelah perubahan, keputusan penting, perintah tes yang benar-benar dijalankan, docs/aset yang berubah, dan batas yang tersisa. Screenshot membantu perubahan visual tetapi tidak menggantikan review keyboard/fallback.

Squash merge cocok untuk branch eksperimen panjang jika pesan akhir tetap mengikuti format header/body di atas. Hapus branch setelah merge jika tidak diperlukan. Hindari force push ke branch bersama dan jangan menulis ulang history publik tanpa instruksi eksplisit.

## Penerapan pada repository ini

Repository publik: [dlifepersona450/archipelago](https://github.com/dlifepersona450/archipelago). Fondasi berada di `main`; fitur awal dikerjakan pada `feat/interactive-portfolio` dan diajukan melalui PR. Versi awal menggunakan tag `v0.1.0` setelah perubahan masuk ke branch stabil.

Hook `.githooks/` telah diaktifkan pada checkout ini. Tidak ada hook otomatis dipasang oleh `npm ci`, sehingga clone baru perlu menjalankan konfigurasi dalam panduan kontribusi. CI memeriksa kualitas aplikasi; ia belum memvalidasi pesan semua commit. Proteksi `main`, review requirement, dan signing belum dikonfigurasi. Lihat [Actions](https://github.com/dlifepersona450/archipelago/actions) untuk hasil pemeriksaan remote yang sebenarnya.

# Repository dan deployment

[Docs](README.md) · [Git workflow](standards/GIT_WORKFLOW.md) · [Verification](VERIFICATION.md)

Source proyek dipublikasikan sebagai repository publik mandiri: **[dlifepersona450/archipelago](https://github.com/dlifepersona450/archipelago)**. Publikasi source ini terpisah dari hosting situs. Belum ada domain atau deployment website publik yang dikonfigurasi.

## Metadata dan alur publikasi awal

- Branch stabil: `main`; branch fitur awal: `feat/interactive-portfolio`.
- Identitas author: DLife, memakai email noreply GitHub pada konfigurasi lokal repository.
- Pesan commit: bahasa Inggris, Conventional Commits, dengan `Why`, `Changes`, dan `Validation`.
- Description: “An interactive miniature-world portfolio with four islands, instant travel, layered-depth art, a fluid lens, and playable demos. Built with TypeScript and Three.js.”
- Topics: `portfolio`, `interactive-portfolio`, `threejs`, `typescript`, `vite`, `webgl`, `glsl`, `creative-coding`, `game-development`, `accessibility`, `documentation`.
- Tag versi awal: `v0.1.0`, untuk snapshot prototipe setelah PR masuk `main`.

Source dan dokumentasi ditinjau lokal, kemudian branch fitur diajukan melalui PR. Hasil CI harus diperiksa sebelum merge. [Pull requests](https://github.com/dlifepersona450/archipelago/pulls), [Actions](https://github.com/dlifepersona450/archipelago/actions), dan [releases](https://github.com/dlifepersona450/archipelago/releases) merupakan sumber status remote; keberadaan file workflow saja bukan bukti pemeriksaan sudah lolos.

## Situs statis

`npm ci && npm run build` menghasilkan `dist/`; direktori itulah yang dilayani hosting. Vite memakai `base: './'` untuk aset relatif. Deep link menggunakan hash, sehingga server tidak perlu rewrite route aplikasi.

Jika hosting di subdirectory, preview hasil build pada prefix yang sama. URL public assets pada feature memakai Vite `BASE_URL`, sementara font CSS diproses Vite. Jangan memakai filesystem path atau folder `src/` sebagai alamat aset produksi.

Jangan ikut mengunggah `node_modules`, `.env`, Git credentials, foto mentah privat, atau hasil test. Tidak ada variabel server/API key yang dibutuhkan edisi pertama. Situs tidak menyimpan data pengguna atau memakai analytics.

## Susunan repository

`archipelago/` adalah root checkout Git mandiri di dalam container lokal DLife. Karena itu `.github/workflows/ci.yml`, template PR/issue, dan `.githooks/` mempunyai lokasi yang sesuai; tidak ada prefix `archipelago/` pada path source di repository GitHub.

Jika nanti dipindahkan ke monorepo DLife, GitHub hanya membaca workflow/template dari root monorepo. Integrasikan workflow secara sadar dengan `working-directory: archipelago`, `cache-dependency-path: archipelago/package-lock.json`, dan filter path yang sesuai. Jangan menganggap workflow pada subfolder otomatis aktif.

## CI dan branch protection

Workflow memeriksa `npm ci`, `npm run check`, dan `npm run test:browser` pada PR serta push ke `main`. Ia tidak melakukan deployment dan tidak menulis repository. Runtime action/dependency perlu ditinjau saat pembaruan. Git hooks aktif pada checkout pengembangan ini, tetapi clone baru perlu opt-in sesuai panduan kontribusi.

Branch protection adalah konfigurasi remote yang berbeda: sarankan PR sebelum merge, required passing checks, satu approval jika ada collaborator, dan larangan force push ke `main`. Pemilik tunggal dapat menyesuaikan review sambil tetap memakai PR/checks. Setting tersebut belum diterapkan dalam publikasi awal.

Conventional Commit messages diperiksa melalui script dan hook opt-in; CI saat ini tidak memvalidasi seluruh riwayat pesan commit. Jika memakai squash merge, editor judul/body squash tetap harus mengikuti standar dan diperiksa saat review.

## Sebelum deployment website

Untuk menjadikan situs portofolio final, ganti sample ContractFlow/foto sesuai bukti, tambahkan source URL yang valid, jalankan pemeriksaan relevan, periksa production preview, dan pilih lisensi source. Repository publik saat ini tetap melabeli sample secara eksplisit dan belum menetapkan lisensi source proyek. Catat domain/deployment URL hanya sesudah hosting memberikan hasil sukses; jangan menjadikan link rencana sebagai link demo hidup.

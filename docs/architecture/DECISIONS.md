# Architecture decisions

[Architecture](README.md) · [Roadmap](../ROADMAP.md)

## ADR-001 — TypeScript + Three.js + Vite

Status: diterapkan. Mengikuti stack TIMEFOLD untuk mengurangi variasi di workspace. Empat kategori dan tiga demo belum memerlukan React atau global state library. Konsekuensi: lifecycle dan pembaruan DOM dikelola eksplisit oleh controller. React Three Fiber tetap referensi strategi render, bukan dependency yang digunakan.

## ADR-002 — HTML sebagai lapisan konten

Status: diterapkan. Judul, teks, link, tombol, slider, dan modal berada di DOM; hanya miniatur dan lensa memakai WebGL. Konsekuensi: navigasi keyboard dan fallback tetap masuk akal, tetapi startup konten saat ini masih memerlukan JavaScript.

## ADR-003 — Instant travel dan hash route

Status: diterapkan. Pulau dipilih melalui klik/keyboard; kamera memberi penegasan singkat. Hash memungkinkan deep link pada hosting statis tanpa rewrite server. Konsekuensi: URL tidak berbentuk route `/projects/name` dan tidak ada simulasi avatar/vehicle.

## ADR-004 — Geometri dan ilustrasi lokal

Status: diterapkan. Miniatur dari primitive geometry; lanskap SVG berlapis dibuat untuk proyek ini. Konsekuensi: ukuran/pipeline lebih sederhana, tetapi belum memenuhi arah fotografi personal secara visual. Mengganti foto memerlukan izin publikasi, masks, dan compositing yang rapi.

## ADR-005 — On-demand frames dan mobile atlas

Status: diterapkan. Frame hanya dijalankan untuk input/resize/transisi yang belum settle. World dipause saat tidak terlihat atau tertutup modal. Mobile menggunakan HTML/CSS. Konsekuensi: tidak ada animasi ambience terus-menerus; model ini harus ditinjau bila menambahkan animasi yang benar-benar dibutuhkan.

## ADR-006 — Data manual dan klaim terverifikasi

Status: diterapkan. Semua record ditulis lokal dan dapat ditinjau dalam diff. ContractFlow tetap sample; tidak ada link source palsu. Konsekuensi: pemilik perlu mengisi bukti proyek secara manual sebelum dipakai melamar atau menawarkan jasa.

## ADR-007 — Standar yang bisa diperiksa

Status: diterapkan. TypeScript, ESLint, Prettier, unit/browser checks, docs checker, dan commit-message validator tersedia. Proyek dipisahkan sebagai root repository mandiri sehingga workflow GitHub dan template review berada di lokasi aktif. Hooks diaktifkan pada checkout ini; clone baru tetap perlu opt-in. Status remote checks diperiksa melalui Actions, bukan diasumsikan dari keberadaan YAML. Branch protection belum dikonfigurasi.

# Coding standard

[Standards](README.md) · [Quality](QUALITY.md) · [Architecture](../architecture/README.md)

## Readability dan desain

Gunakan nama yang mengungkap peran: `selectedIsland`, `targetZoom`, `restoreFocus`; nama singkat seperti `x`, `y`, `uv` cocok pada matematika lokal yang jelas. Identifier dan komentar berbahasa Inggris; docs pemeliharaan berbahasa Indonesia.

Utamakan fungsi yang menyelesaikan satu tanggung jawab. Domain logic harus dapat dijalankan tanpa DOM atau renderer. Hindari helper generik sebelum ada penggunaan nyata dan jangan memecah satu operasi jelas menjadi banyak wrapper. Pertahankan early return untuk kasus tidak valid, dan simpan konstanta berulang sesuai konteks.

Gunakan union ID dan interface untuk kontrak antarmodul. `strict`, `noUncheckedIndexedAccess`, `noUnusedLocals`, dan `noUnusedParameters` aktif. Tipe `unknown` cocok untuk input asing; `any` dan suppression directive bukan jalan pintas. Non-null assertion hanya layak untuk elemen shell milik aplikasi yang secara sinkron dibuat sebelum akses; bila markup menjadi dinamis/asing, gunakan guard yang memberikan fallback.

Prettier adalah sumber format: dua spasi, single quote, semicolon, trailing comma, batas baris 100. ESLint memeriksa kesalahan/pola kode; jangan menambah aturan format yang menduplikasi Prettier. `npm run format` memodifikasi file; `format:check` hanya memeriksa.

## Komentar yang berguna

Komentar menjelaskan alasan, invariant, ownership, atau batas teknis. Contoh yang baik:

```ts
// A stale import must not attach a renderer to a dialog the visitor already closed.
if (generation !== currentGeneration) {
  mounted.dispose();
  return;
}
```

Komentar seperti `// Increment count` di depan `count++` tidak memberi informasi. Jangan menambah komentar setiap baris demi memenuhi jumlah. Saat mengubah algoritma atau lifecycle, periksa komentar terkait agar tidak bertahan dengan penjelasan lama. TODO harus konkret dengan kondisi penyelesaian; gunakan issue nyata bila ada, bukan ticket rekaan.

## Batas modul

Konten tidak mengimpor scene. Scene tidak memiliki route dan tidak menulis case study. Mount feature menerima container dan menghasilkan `Disposable`. Global listener hanya digunakan saat kontrak input memerlukannya; game memakai handler di container, sehingga arrow keys tidak ditangkap setelah demo ditutup.

Controller boleh mengorkestrasi DOM, modal, dan dynamic import. Jika controller membesar karena fitur baru, ekstrak tanggung jawab yang benar-benar mandiri, bukan membuat state tersebar pada banyak singleton. Dokumentasikan ownership sebelum menambah router atau framework.

## Error dan lifecycle

Bedakan kegagalan rendering opsional dari kegagalan konten utama. WebGL/texture error harus memberi static fallback. Jangan menelan error diam-diam tanpa penjelasan visible yang relevan. Sebaliknya, jangan menampilkan detail exception internal ke pengunjung.

Setiap listener/observer/RAF/GPU allocation mempunyai pemilik dan cleanup. Gunakan AbortController untuk listener yang satu lifetime. Batasi asynchronous completion dengan generation token atau abort. Jangan membiarkan request lama menimpa state baru.

## Dependency dan keamanan

Tambahkan dependency hanya untuk kebutuhan yang jelas; perbarui lockfile dan notices yang relevan. Gunakan `npm ci` untuk install reproducible. Jangan mengedit package terinstal sebagai solusi permanen. Tinjau perubahan dependency dan dampak ukuran/performa; pemeriksaan `npm audit` dapat menjadi review tambahan, bukan jaminan keamanan menyeluruh.

Escape string ke HTML, validasi URL, dan jangan merender input route sebagai markup. Jangan menaruh credential di source/public/log. Asal aset dicatat saat penambahan, bukan setelah publikasi.

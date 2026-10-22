# Aset dan layered photography

[Docs](README.md) · [Asset register](../ASSET_SOURCES.md) · [Rights](rights/README.md)

Geometri semua pulau dibuat lokal di `scene/build.ts`. Tidak ada GLB, model hasil scan, texture pack, stock photo, atau file dari Bruno Simon. Font disalin beserta OFL dari TIMEFOLD sehingga proyek ini tidak memerlukan folder saudaranya saat berjalan.

## Beyond the Frame

`public/art/distance.svg` mengisi background utuh, `middle.svg` berisi subjek/vegetasi tengah transparan, dan `foreground.svg` berisi siluet depan transparan. Ketiganya memakai viewBox/aspect ratio 1200 × 800 yang sama. `landscape.svg` adalah komposisi gabungan untuk Fluid Lens.

Mengganti dengan foto sendiri:

1. Pilih foto yang punya pemisahan kedalaman jelas dan izin publikasi.
2. Simpan background lengkap; isi area yang tadinya tertutup subjek agar parallax tidak memperlihatkan lubang.
3. Pisahkan middle dan foreground dengan alpha transparan. Pertahankan dimensi dan koordinat crop yang sama.
4. Ekspor foto terkompresi dan masks ke WebP/PNG sesuai kebutuhan alpha. Simpan di `public/art/` atau folder baru yang jelas.
5. Ubah path di `features/depth.ts`. Gunakan `import.meta.env.BASE_URL` agar path cocok pada subdirectory hosting.
6. Perbarui alt text, caption, case study, label status, dan asset register. Ilustrasi saat ini jangan disebut foto asli setelah hanya mengubah caption.
7. Periksa batas frame pada hover, tombol unfold, keyboard focus, reduced motion, dan mobile. Pastikan masks tidak terpotong atau mengungkap pinggir crop.

Depth effect adalah CSS 3D dengan tiga lapisan, bukan rekonstruksi kedalaman dari satu gambar atau segmented model otomatis. Pemisahan subjek merupakan pekerjaan authoring aset tersendiri.

## Fluid Lens

TextureLoader memuat gambar lokal; GLSL melakukan sampling radial pada gambar tersebut. Gambar awal memiliki rasio 3:2 dan area demo mempertahankan rasio itu. Jika mengganti rasio, ubah juga viewport/sampling agar gambar tidak terdistorsi di luar lensa.

Tidak ada simulation buffer, velocity field, atau feedback texture. Hindari menyebut slider viscosity sebagai simulasi fluida fisik. Pointer mengubah target lensa; responsnya diperlambat oleh parameter viscosity.

## Anggaran awal

Target pengembangan: pertahankan initial world tanpa model download, texture demo satu gambar, dan gambar hanya dimuat saat fiturnya dibuka. Resize renderer memakai pixel ratio maksimal 1.6 untuk world dan 1.5 untuk shader. Angka ini adalah batas konfigurasi, bukan bukti FPS pada perangkat target.

Sebelum menambah GLB atau texture besar, ukur byte transfer, decode/loading, draw calls, memory, dan interaksi pada perangkat mobile sungguhan. Sediakan fallback dan update [decision record](architecture/DECISIONS.md) bila pipeline aset berubah.

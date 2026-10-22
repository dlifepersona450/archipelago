# Quality standard

[Standards](README.md) · [Verification](../VERIFICATION.md)

## Pengujian yang berguna

Unit tests menyasar invariant dan input asing: route tidak valid, URL berbahaya, collectible unik, collision, win state, dan commit evidence. Browser checks menyasar alur pengguna yang melintasi DOM/renderer/lifecycle. Jangan menambah test yang hanya menyalin markup atau mengunci setiap detail implementasi.

Perubahan behavior memerlukan pemeriksaan yang relevan dan update docs. `npm run check` menjadi gerbang lokal umum; browser checks diwajibkan oleh agent contract untuk perubahan interaksi/render/responsive. Jangan menambah screenshot snapshot massal tanpa tujuan regresi yang jelas.

## Aksesibilitas

Semua record harus dapat ditemukan lewat HTML. Gunakan elemen native, visible focus, meaningful button names, label untuk slider, teks status untuk game, dan modal dengan judul. Escape menutup dialog dan fokus kembali ke jalur yang masuk akal. Jangan memaksa drag, hover, kendaraan, atau keberhasilan game untuk membuka pekerjaan.

Reduced motion mematikan camera easing dan depth transforms, serta respons lens smoothing. Motion toggle memberi kontrol sesi; preferensi sistem diikuti kecuali pengunjung memilih override. Mobile memakai peta sederhana dan tombol yang dapat disentuh. Tidak ada audio autoplay.

Tes ini belum membuktikan kepatuhan WCAG. Sebelum publikasi, tinjau screen reader, contrast, zoom, high contrast mode, target sentuh, dan perangkat nyata. Audit tersebut perlu bukti tersendiri jika suatu saat diklaim.

## Performa

Jangan menjalankan RAF terus-menerus untuk scene diam. Batasi pixel ratio, pause saat document hidden atau world tidak aktif, lazy-load demo, dan bersihkan geometry/material/texture. Jangan memakai WebGL untuk paragraf, tautan, atau kontrol HTML.

Target numerik FPS/loading belum ditetapkan dari pengukuran perangkat nyata. Jangan membuat klaim “60 FPS di semua perangkat”. Catat perangkat, browser, viewport, kualitas, skenario, dan metode ketika melakukan benchmark.

## Data, privasi, dan aset

Tidak ada tracking/backend pada edisi ini. External links dipilih dari data authored dan HTTP(S) allowlist; setiap import aset harus mempunyai izin dan credit yang sesuai. Jangan menerbitkan EXIF/location sensitif atau dokumen proyek privat tanpa keputusan sadar dari pemilik.

## Definition of done

- Perilaku yang diminta berfungsi melalui jalur utama dan fallback yang relevan.
- Kode readable, ownership jelas, dan tidak menyisakan resource/listener setelah teardown.
- Pemeriksaan terkait dijalankan dengan hasil dilaporkan jujur.
- Konten dan docs sesuai implementasi; sample/roadmap tidak disajikan sebagai fitur produksi.
- Asal aset dan notices dipelihara; tidak ada secrets atau generated build ikut perubahan source.
- Branch/commit/PR mengikuti standar bila tindakan Git memang diminta.
- Sisa batas dicatat, termasuk perangkat yang belum diuji dan CI/hosting yang belum aktif.

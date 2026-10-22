# Verifikasi

[Docs](README.md) · [Quality standard](standards/QUALITY.md) · [Tooling](reference/TOOLING.md)

## Pemeriksaan lokal

```bash
npm ci
npm run format
npm run check
```

`check` menjalankan strict TypeScript, ESLint, format check, delapan domain/commit tests, pemeriksaan tautan docs, kemudian production build. Build memeriksa tipe kembali agar `npm run build` aman dipakai sendiri. Tidak ada klaim coverage persentase.

Unit tests mencakup route round-trip, input route asing, safe link dan HTML escaping, ID konten, batas/tembok game, collectible unik, kondisi menang/restart, immutability, serta body commit dan breaking-change migration. Daftar jumlah tests dapat berubah; gunakan output runner sebagai status sebenarnya.

## Browser checks

```bash
npx playwright install chromium
npm run test:browser
```

Pada Linux CI, `npx playwright install --with-deps chromium` juga memasang library sistem browser. Jika memakai Chrome yang sudah terpasang, set `CHROME_BIN` ke executable. `TEST_BASE_URL` dapat menunjuk server yang sudah berjalan; tanpa variabel itu, script memiliki server Vite port 4176 dan mematikannya di `finally`.

Script memeriksa atlas WebGL, filter pulau, Quick View, Back, depth toggle, Escape dan focus restoration, game sampai menang, shader/slider/reset, live reduced-motion change, deep link, ID tidak valid, mobile bounds, WebGL-disabled fallback, serta uncaught JavaScript errors. Software rendering dipakai bila GPU fisik tidak tersedia. Ini bukan benchmark GPU atau audit WCAG lengkap.

Skip link juga diperiksa agar memindahkan fokus ke koleksi tanpa mengganti mode; synthetic context-loss event memeriksa bahwa shader beralih ke gambar statis dan menonaktifkan kontrol yang sudah tidak berfungsi.

Tes shader memastikan renderer terbentuk, kontrol aktif, output slider benar, dan tidak ada error console pada sesi grafis normal. Kualitas visual dan efek parameter juga perlu ditinjau melalui preview; tes tidak membuktikan semua hasil pixel di setiap GPU.

## Review manual yang diperlukan sebelum publikasi

| Area         | Cara memeriksa                                                                                                  |
| ------------ | --------------------------------------------------------------------------------------------------------------- |
| Kegunaan     | Seorang pengunjung dapat menemukan proyek, peran, teknologi, dan source tanpa bermain game                      |
| Keyboard     | Tab ke mode/pulau/proyek, Enter untuk buka, Escape untuk tutup, fokus kembali masuk akal                        |
| Motion       | Ubah preferensi sistem saat halaman terbuka; mode reduced tidak menampilkan camera easing/depth motion          |
| Rendering    | Pilih empat pulau, periksa label tidak menutupi navigasi, coba shader dan depth berulang                        |
| Lifecycle    | Buka/tutup cepat, pindah mode, sembunyikan tab, resize desktop/mobile, periksa tidak ada RAF runaway atau error |
| Fallback     | Nonaktifkan WebGL, buka semua teks/kategori dan demo fluid fallback                                             |
| Mobile nyata | Touch target, scroll modal, orientation, keyboard virtual, daya/memory; emulator tidak menggantikannya          |
| Konten       | Hapus klaim sample yang tidak lagi cocok; verifikasi semua link nyata dan hak foto                              |
| Deployment   | Preview production bundle dari base path yang dipilih; periksa asset/font loading                               |

`npm run docs:check` tidak melakukan crawl internet atau pemeriksaan anchor. ESLint/TypeScript tidak memeriksa warna, kontras, kenyamanan motion, atau kualitas copy. Jika sebuah pemeriksaan tidak dapat dijalankan, tulis batasnya dengan jelas saat handoff.

# Third-party notices

[Asal aset](ASSET_SOURCES.md) · [Rights](docs/rights/README.md)

| Komponen yang ikut situs | Versi / izin                                                    | Notice yang dipertahankan                                     |
| ------------------------ | --------------------------------------------------------------- | ------------------------------------------------------------- |
| Three.js                 | 0.180.0, MIT                                                    | [Three.js LICENSE](public/licenses/three-LICENSE.txt)         |
| DM Sans                  | Binary lokal yang diidentifikasi di asset register, SIL OFL 1.1 | [DM Sans OFL](public/fonts/dm-sans-OFL.txt)                   |
| IBM Plex Mono            | Binary lokal, SIL OFL 1.1                                       | [IBM Plex OFL](public/fonts/ibm-plex-mono-OFL.txt)            |
| Instrument Serif Italic  | Binary lokal, SIL OFL 1.1                                       | [Instrument Serif OFL](public/fonts/instrument-serif-OFL.txt) |

Vite menyalin `public/` ke hasil build sehingga notice runtime tetap disertakan. Jaga file license tersebut saat memindahkan hasil `dist/` atau menambah asset pipeline.

Dependency pengembangan seperti Vite, TypeScript, ESLint, typescript-eslint, Prettier, type declarations, dan Playwright mempunyai license masing-masing pada package terpasang. Lockfile merekam versi; daftar ini bukan SBOM lengkap atau hasil legal audit. Periksa seluruh dependency jika mengubah distribusi menjadi paket/tooling yang juga membundel komponen tersebut.

Tidak ada lisensi proyek-wide source yang dipilih dalam pekerjaan ini. Lisensi dependency/font tidak otomatis melisensikan seluruh kode, copy, ilustrasi, atau foto yang mungkin ditambahkan nanti.

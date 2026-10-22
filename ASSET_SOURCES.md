# Asal aset

[Docs](docs/README.md) · [Rights](docs/rights/README.md) · [Notices](THIRD_PARTY_NOTICES.md)

Inventori dibuat untuk edisi pertama pada **22 Oktober 2026**. Istilah original di sini berarti dibuat untuk prototipe selama pengerjaan, termasuk pembuatan dengan bantuan kode; bukan klaim penilaian hak eksklusif atau audit kemiripan menyeluruh.

## Materi proyek

| Sumber                                  | Isi dan asal                                                                                                                                                 |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `src/scene/build.ts`                    | Empat pulau, rack/database/pipeline, arcade, frame, pohon, bentuk optik dan boat. Dibangun dari primitive geometry; tidak mengimpor model/texture eksternal. |
| `public/art/distance.svg`               | Langit, matahari, gunung dan danau; background utuh untuk layered composition.                                                                               |
| `public/art/middle.svg`                 | Tepian, pohon dan tenda; lapisan transparan tengah.                                                                                                          |
| `public/art/foreground.svg`             | Siluet vegetasi dan batu; lapisan transparan depan.                                                                                                          |
| `public/art/landscape.svg`              | Komposisi lanskap gabungan untuk texture shader dan fallback.                                                                                                |
| `public/favicon.svg`, `src/ui/shell.ts` | Mark gunung abstrak dan komposisi UI yang dibuat untuk proyek ini. Arrow/icon kecil memakai karakter teks atau SVG lokal.                                    |
| `src/features/game.ts`                  | Grid, pemain, sinyal dan gerbang digambar dengan Canvas 2D; tidak memakai sprite pack.                                                                       |
| `src/features/fluid-shader.ts`          | Shader optik yang dibuat untuk viewport lensa proyek; tidak mengambil source efek dari situs referensi.                                                      |
| `src/content/portfolio.ts`              | Copy personal umum, sample ContractFlow yang dilabeli, dan penjelasan prototipe lokal. Tidak mengimpor biografi/proyek klien.                                |
| `docs/showcase/`                        | Capture browser aplikasi ini ketika tersedia, bukan screenshot Bruno Simon atau concept art. Detail berada di [capture notes](docs/showcase/README.md).      |

Tidak ada foto pribadi, stock photo, film still, soundtrack, GLB, raster imagegen, atau logo perusahaan yang dibundel. Menambahkan fotografi nyata memerlukan pembaruan copy, alt, dan provenance.

## Font lokal

Tiga binary disalin dari `timefold/public/fonts/` bersama notice OFL agar proyek mandiri. Upstream family dicatat untuk provenance; exact acquisition URL/commit binary historis belum diketahui dan tidak direka.

| File                                | Family upstream                                                    | Notice lokal                                            |
| ----------------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------- |
| `dm-sans-normal-400.woff2`          | [DM fonts](https://github.com/googlefonts/dm-fonts)                | [DM Sans OFL](public/fonts/dm-sans-OFL.txt)             |
| `ibm-plex-mono-normal-400.woff2`    | [IBM Plex](https://github.com/IBM/plex)                            | [IBM OFL](public/fonts/ibm-plex-mono-OFL.txt)           |
| `instrument-serif-italic-400.woff2` | [Instrument Serif](https://github.com/Instrument/instrument-serif) | [Instrument OFL](public/fonts/instrument-serif-OFL.txt) |

SHA-256 file yang benar-benar disalin:

```text
dm-sans-normal-400.woff2
9fea608a947e67020c33cad9a6fe3d60c54119dfb8cff87768a8117a15ed7543
ibm-plex-mono-normal-400.woff2
08949f728dc52d528e69b1667d15c89a5686a4ee9a296ff90983985f99c380f7
instrument-serif-italic-400.woff2
5a51946dfffa82972bc98745359c46761515641fda557c25116459a9f83da4a7
```

## Software runtime

Three.js `0.180.0` dipasang melalui npm; [MIT notice](public/licenses/three-LICENSE.txt) disalin dari package terpasang. Toolchain build/test bukan aset visual dan tidak menjadi isi halaman; dependency tree yang pasti ditentukan lockfile. Tidak ada klaim audit lisensi transitif menyeluruh untuk seluruh development dependency.

Bruno Simon dan dokumentasi R3F/MDN adalah rujukan, bukan sumber aset yang diunduh. [Reference register](docs/reference/REFERENCES.md) menjelaskan penggunaannya. Lisensi source proyek keseluruhan belum dipilih.

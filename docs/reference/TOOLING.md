# Referensi tooling

[Docs](../README.md) · [Verification](../VERIFICATION.md)

| Perintah                          | Yang diperiksa / dihasilkan                                                             |
| --------------------------------- | --------------------------------------------------------------------------------------- |
| `npm ci`                          | Install dari lockfile; tidak memasang Git hooks atau membuat repository                 |
| `npm run dev`                     | Vite server di loopback; gunakan argumen host eksplisit bila ingin akses jaringan lokal |
| `npm run typecheck`               | Kontrak strict TypeScript pada source                                                   |
| `npm run build`                   | Typecheck lalu bundle produksi statis                                                   |
| `npm run preview`                 | Melayani hasil `dist/` untuk review produksi                                            |
| `npm run lint`                    | ESLint aplikasi, script, test, dan konfigurasi Vite                                     |
| `npm run format` / `format:check` | Menulis / memeriksa format source, docs, dan konfigurasi                                |
| `npm run test`                    | Node test runner dengan TypeScript stripping untuk domain modules                       |
| `npm run test:browser`            | Playwright Chromium + preview server milik script atau `TEST_BASE_URL`                  |
| `npm run docs:check`              | Memeriksa target file tautan Markdown lokal                                             |
| `npm run commit:check -- file`    | Validasi struktur pesan commit Conventional + body proyek                               |
| `npm run check`                   | Gerbang komposit lokal tanpa browser installation                                       |

Node series 22 minimal 22.13 dipilih karena toolchain ESLint/Vite, atau Node 24+. `.nvmrc` memilih major 22; `package.json` menjelaskan rentang yang diterima. Domain tests tidak memerlukan browser/Three.js. Playwright adalah dev dependency; browser executable dipasang terpisah atau diberikan melalui `CHROME_BIN`.

`.gitattributes` menormalkan source teks ke LF dan memperlakukan gambar/font sebagai binary. Notice lisensi upstream dipertahankan verbatim, termasuk line ending aslinya, dan dikecualikan dari whitespace warning Git; pengecualian itu tidak berlaku pada kode proyek.

## Batas checker

Docs checker mencari tautan inline pada seluruh Markdown proyek, melewati folder dependency/build. Ia memeriksa file/directory tujuan relatif; tidak memeriksa heading anchors, reference-style link definitions, URL internet, atau kebenaran prose.

Commit checker mengabaikan baris komentar berawalan `#`, memvalidasi tipe/scope/header length, body sections dengan informasi minimum, dan footer migration untuk header breaking. Ia tidak memaksa history policy Git atau mengecek bahwa perintah Validation benar-benar dijalankan.

Tidak ada generator AST inventory, API docs, atau license crawler otomatis seperti TIMEFOLD. Inventori hak aset sekarang ditulis manual berdasarkan file yang benar-benar dibundel. Bila menambah generator, jelaskan input, output, freshness contract, dan keterbatasannya.

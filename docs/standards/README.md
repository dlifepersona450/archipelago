# Standar pengembangan

[Docs](../README.md) · [AGENTS](../../AGENTS.md) · [Contributing](../../CONTRIBUTING.md)

Ini standar proyek yang dipilih dari praktik umum industri dan disesuaikan untuk portofolio statis kecil. Bukan sertifikasi atau klaim kepatuhan terhadap standar perusahaan tertentu.

| Area                            | Aturan dan alasan                                                                                  |
| ------------------------------- | -------------------------------------------------------------------------------------------------- |
| [Coding](CODING.md)             | Kode readable, tipe eksplisit pada kontrak, komentar beralasan, batas modul, dependency discipline |
| [Git workflow](GIT_WORKFLOW.md) | Branch singkat, Conventional Commits dengan body detail, atomic changes, PR dan review             |
| [Quality](QUALITY.md)           | Pengujian bermakna, accessible paths, performance, security dasar, definition of done              |

## Mana yang sudah bisa ditegakkan

TypeScript, ESLint, Prettier, domain tests, browser checks, local docs link checker, dan pesan commit validator tersedia sebagai perintah. EditorConfig dan konfigurasi formatter membantu penulisan konsisten. `AGENTS.md` memberi kontrak untuk agent, tetapi tidak menjadi pengganti review manusia atau runtime checks.

Git hooks bersifat opt-in dan telah diaktifkan pada checkout pengembangan ini dengan `core.hooksPath=.githooks`. Clone baru tidak mewarisi konfigurasi lokal tersebut. Workflow GitHub/PR/issue template berada di root repository mandiri proyek. Branch protection, required review, commit-signing policy, dan deployment gate belum dikonfigurasi; status CI aktual dilihat melalui Actions.

Perluas aturan bila kebutuhan muncul. Hindari menambah approval berlapis, process document, atau dependency yang tidak membantu kualitas proyek ini.

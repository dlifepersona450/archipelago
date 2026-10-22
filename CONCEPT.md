# Konsep: ARCHIPELAGO

[README](README.md) · [Arsitektur](docs/architecture/README.md) · [Roadmap](docs/ROADMAP.md)

Portofolio adalah kepulauan minat: pekerjaan sistem, game dan interaksi, kehidupan di luar layar, serta eksperimen visual. Dunia miniatur memberi konteks dan rasa ingin tahu; case study memberi alasan untuk mempercayai kemampuan pembuatnya.

## Susunan konsep

**Miniature world + instant travel** menjadi kerangka. Setiap pulau punya penanda fisik dan kategori konten: server racks/database/pipeline di Systems, arcade dan objek permainan di Playground, frame dan suasana alam di Memory, serta bentuk optik abstrak di Experiment. Memilih pulau memperbarui koleksi HTML dan fokus atlas.

**Beyond the Frame** menjadi pintu khusus di Memory. Lanskap tersusun dari background, middle ground, dan foreground transparan. Interaksi mengangkat lapisan; versi pertama sengaja menggunakan ilustrasi lokal agar tidak menyiratkan ketersediaan foto atau hasil segmentasi yang belum diberikan.

**Fluid Lens Lab** menjadi karya khusus di Experiment. Pengunjung membandingkan hasil perubahan material pada sebuah gambar. Viscosity mengubah respons posisi lensa, refraction mengubah pembiasan, distortion menambahkan deformasi radial, dan chromatic aberration memisahkan sampel kanal warna. Ini eksperimen optik artistik, bukan simulasi fluida fisik.

## Dua cara berkunjung

Explore tersedia untuk rasa ingin tahu. Quick View tersedia untuk recruiter, klien, keyboard, mobile, dan perangkat yang kurang mendukung grafis. Keduanya membaca record proyek yang sama. Tidak ada syarat menyelesaikan game untuk membuka pekerjaan.

Case study menyampaikan pertanyaan, pendekatan, dan hasil yang benar-benar tersedia. Tautan source hanya ditampilkan bila URL nyata sudah ditulis. Tidak ada statistik pencapaian atau bukti klien rekaan.

## Visual dan motion

Atlas bergaya editorial: kertas hangat, tinta hijau gelap, aksen terracotta, metadata monospace, dan tipografi serif untuk rasa personal. Geometri sederhana memberi siluet yang dapat dikenali tanpa model eksternal.

Gerakan harus menjelaskan konsekuensi: pilihan pulau mengubah fokus/koleksi; layer depth memperjelas struktur visual; slider shader mengubah material; langkah game mengubah kondisi puzzle. Pulau tidak berputar atau melayang terus-menerus. Kamera berhenti merender setelah transisi selesai.

## Batas edisi pertama

Tidak ada free roaming, driving, physics engine, multiplayer, audio, inventori, atau quest. Belum ada foto pribadi, model buatan Blender, CMS, admin, atau studi kasus produksi terverifikasi. Semua pembesaran ruang lingkup diprioritaskan setelah konten portofolio nyata, aksesibilitas, dan performa terpenuhi.

Rujukan Bruno Simon digunakan untuk ide ruang sebagai navigasi. Mekanisme mengemudi, desain dunia, model, tekstur, dan source situs tersebut tidak disalin. [Referensi teknis dan desain](docs/reference/REFERENCES.md) memisahkan inspirasi dari dependency dan aset.

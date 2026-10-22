# Runtime journey

[Architecture](README.md) · [World reference](../reference/WORLD.md) · [Feature reference](../reference/FEATURES.md)

## Startup

1. `index.html` memuat `src/main.ts`; CSS dan data konten diimpor.
2. `renderShell()` memasang markup, kartu proyek, atlas fallback, dua modal, dan live region.
3. Controller membaca hash dengan `parseRoute`, serta preferensi motion dan breakpoint 760px.
4. `applyMotion()` memperbarui class dan tombol; `syncRoute()` memperbarui view, filter, teks koleksi, judul dokumen, dan modal proyek.
5. Jika desktop Explore aktif tanpa modal, `ensureWorld()` mengimpor modul scene. World membuat renderer, graph, kamera, picking, observer, dan satu frame awal. Class `world-ready` mengganti atlas CSS.
6. Jika renderer/import gagal, `fallbackWorld()` membersihkan world dan mempertahankan peta HTML. Kegagalan ini tidak merusak koleksi proyek.

## Memilih pulau

Klik label/kartu HTML membawa `data-island`; klik geometri memakai raycaster lalu mencari metadata `island` pada ancestor mesh. Kedua jalur memanggil `selectIsland(id)`.

Controller menyimpan route baru menggunakan History API. `syncRoute()` memperbarui `aria-pressed`, judul/deskripsi koleksi, record tersaring, dan camera target. Pilihan diumumkan lewat live region. Kamera hanya bergeser sedikit; tidak ada karakter yang berjalan.

Skip link ditangani sebagai focus/scroll ke koleksi tanpa perubahan hash, agar tidak berbenturan dengan route dan tidak mengubah Quick View menjadi Explore.

Kamera memakai interpolasi yang mempertimbangkan delta waktu. Frame berikutnya dijadwalkan hanya bila center/zoom belum selesai. Saat motion dikurangi, target disalin pada frame berikutnya tanpa transisi. DOM label diproyeksikan dari world position setelah matriks kamera diperbarui.

## Membuka proyek

`data-project` memperbarui hash. Record ditemukan lewat `findProject`; ID asing dibersihkan dari URL dan koleksi tetap tersedia. `renderProjectDetail()` membangun teks case study yang telah di-escape, kemudian dialog dibuka dan world dipause.

Demo diimpor berdasarkan `demo` ID. Setelah import dan sesudah mount async, generation token diperiksa. Jika pengunjung sudah menutup atau mengganti dialog, resource yang terlambat selesai langsung dibuang. Error import/init menampilkan pesan lokal; case study tetap terbaca.

Pada Escape/tombol close, listener `close` membuang demo, menghapus project dari route dengan `replaceState`, dan mengembalikan fokus. Membuka project membuat history entry; menutup modal mengganti entry tersebut. Back/Forward dan `hashchange` membaca ulang route. Mode/filter tidak memaksa scroll ke bagian lain.

## Pergantian perangkat dan visibility

Breakpoint desktop menentukan apakah world aktif atau peta CSS yang terlihat. Instance world yang sudah dibuat dapat dipertahankan tetapi dipause saat mobile/Quick/modal. Resize observer menghitung ulang kamera/resolusi saat aktif kembali.

`document.hidden` menghentikan RAF world/fluid. Saat terlihat lagi, clock direset untuk menghindari lompatan delta besar. Context loss world membersihkan scene dan memakai map; fluid membersihkan GPU lalu menampilkan gambar statis.

## Teardown

Pada Vite HMR, `dispose()` controller menandai sesi selesai, membatalkan listener, menaikkan generation token, membersihkan demo/world, lalu menutup dialog. Fitur harus mendukung cleanup berulang. Membuka kembali fitur membuat state baru; game dan slider tidak disimpan antar dialog.

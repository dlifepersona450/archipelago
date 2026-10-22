# Referensi world

[Docs](../README.md) · [Architecture](../architecture/README.md)

## `buildScene()`

Menghasilkan `scene`, map `roots`, dan daftar `pickables`. Setiap root memakai stable island ID pada `userData`. Material warna digunakan ulang pada miniatur; geometri dibuat dari primitive Three.js. Aset yang tampak seperti rak, database, arcade, frame, pohon, dan patung optik bukan model eksternal.

Base island berupa cylinder bersisi sembilan, top layer, shoreline ring, dan batu kecil. Water berupa lingkaran dengan cincin. Tidak ada physics body, navmesh, collision perjalanan, shadow map, atau postprocessing pipeline. Boat kecil merupakan prop statis, bukan kendaraan pemain.

## `createWorld()`

Menerima canvas, map tombol label, callback pemilihan, dan flag motion. Mengembalikan kontrak:

| Method             | Efek                                                                                  |
| ------------------ | ------------------------------------------------------------------------------------- |
| `select(id)`       | Target center mengikuti sebagian kecil posisi pulau, zoom 1.08; null kembali overview |
| `setActive(value)` | Pause frame saat nonaktif; resize dan invalidate saat aktif kembali                   |
| `setMotion(value)` | Mengubah interpolasi kamera menjadi langsung atau eased                               |
| `dispose()`        | Abort input, stop RAF, disconnect observer, dispose geometry/material/renderer        |

Kamera ortografis menghadap world dari offset `(12,16,18)`. Resize mempertahankan ruang vertikal/horizontal yang memuat miniatur. Pixel ratio maksimal 1.6. Label HTML diproyeksikan setiap frame render sehingga tetap mengikuti posisi visual.

`invalidate()` mencegah beberapa requestAnimationFrame bersamaan. Render menginterpolasi center/zoom memakai exponential delta blend dan berhenti setelah mencapai toleransi. Tidak ada ambient animation loop. Hidden tab membatalkan frame; active tab mereset clock.

## Picking

Pointer dihitung relatif bounding rectangle canvas, diubah ke normalized device coordinates, lalu raycast pada root island secara rekursif. Hit mesh ditelusuri ke ancestor dengan metadata ID valid. Pointer movement di atas delapan pixel tidak dianggap click. Label/kartu HTML menyediakan jalan yang sama untuk keyboard/mobile.

## Batas dan pengembangan

Scene pertama masih berisi mesh individual; tidak ada instanced/merged geometry batching. Jumlah kecil ini perlu diukur sebelum dioptimasi. Tidak ada orbit control/free camera atau touch drag navigation. World yang pernah dibuat tetap tersimpan saat beralih ke peta mobile, tetapi rendering dipause; jika konsumsi memory menjadi masalah, pertimbangkan disposal dan remount pada breakpoint dengan bukti profiling.

Saat context hilang, controller membuang world dan beralih ke atlas HTML. Tidak ada retry context otomatis dalam sesi yang sama; reload dapat mencoba ulang. Konten tidak bergantung pada keberhasilan retry tersebut.

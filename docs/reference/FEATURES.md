# Referensi fitur

[Docs](../README.md) · [Assets](../ASSETS.md) · [Runtime](../architecture/RUNTIME.md)

## Beyond the Frame

`mountDepth` memasang tiga `<img>` yang saling menutupi dan berbagi aspect ratio. Container memakai perspective/transform-style; middle dan foreground diberi translateZ berbeda. Pointer mengubah CSS custom properties rotasi, sedangkan hover, keyboard focus, dan tombol unfold membuka lapisan.

Motion reduced menghilangkan transform dan transisi. Tombol masih memperbarui state `aria-pressed`, tetapi gambar tetap datar. Seluruh lanskap memiliki deskripsi accessible pada frame; layer dekoratif memakai empty alt agar tidak dibaca tiga kali. Dispose menghapus listener lokal.

## Fluid Lens Lab

`mountFluid` membuat canvas renderer dan satu plane full-screen. `TextureLoader` memakai gambar gabungan lokal. HTML sliders mengubah viscosity lokal atau uniform shader; reset mengembalikan semua nilai serta target posisi.

| Kontrol              | Implementasi                                                                       |
| -------------------- | ---------------------------------------------------------------------------------- |
| Viscosity            | Mengubah laju interpolasi center terhadap target; nilai tinggi terasa lebih lambat |
| Refraction           | Menggeser UV radial menuju pusat berdasarkan bentuk dome lensa                     |
| Distortion           | Memodulasi offset radial dengan fungsi sinus jarak                                 |
| Chromatic aberration | Mengambil kanal merah/biru dari UV sedikit berbeda                                 |

Shader memakai metric aspect-correct untuk batas lensa dan clamp untuk sampling tepi. Color-space include Three.js mengubah hasil linear menjadi output yang sesuai renderer. Ada rim highlight halus; tidak ada animasi waktu, simulation buffer, atau efek pada elemen HTML di luar viewport gambar.

Pointer/touch menetapkan target posisi; slider tetap dapat diubah dengan keyboard meski posisi lensa berada di tengah. RAF hanya terus berjalan saat center belum settle. Pixel ratio maksimal 1.5, hidden tab dipause, resize memakai observer. Jika init/gambar gagal, canvas disembunyikan, slider dinonaktifkan, dan gambar fallback tetap tampak. Context loss juga membersihkan renderer dan menampilkan gambar.

## Signal Garden

`game-state.ts` mendefinisikan grid 7×7, enam tembok, tiga sinyal, dan satu gate. `movePlayer` menerima state serta langkah ortogonal unit; ia menolak diagonal, batas grid, tembok, dan perubahan setelah menang. Hasil state baru menjaga input immutable. Gate baru menghasilkan win bila semua sinyal terkumpul.

`mountGame` menggambar Canvas 2D saat state berubah, tanpa RAF. WASD/arrows ditangani pada container dan tombol layar memanggil transisi yang sama. Status teks menyampaikan collectible count/posisi/win sehingga canvas bukan satu-satunya sumber perubahan. Restart menghasilkan initial state; close/remount juga memulai ulang. Browser checks melintasi level sampai menang.

Jika context Canvas 2D gagal, status teks dan kontrol posisi tetap tersedia, tetapi tidak ada peta teks lengkap yang setara dengan gambar. Tinjau alternatif level berbasis DOM jika akses nonvisual terhadap puzzle menjadi syarat; portofolio/case study tetap dapat dibaca tanpa memainkan game.

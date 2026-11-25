# Private Assistant

Status: Phase 1-2 (UI + data dummy). Firebase belum terhubung.

## Struktur
```
public/assets/logo/     logo aplikasi (taruh gambar di sini)
src/config/appConfig.js nama, logo, teks, nama profil, fitur
src/styles/             global.css (dasar) + theme.css (override dari demo)
src/components/         sidebar/  chat/  common/
src/pages/  layouts/  hooks/  data/  utils/  firebase/  services/
tools/demo.html         editor tampilan (buka dengan klik dua kali)
```
## Menjalankan
`npm install` lalu `npm run dev`. Login demo: admin / member, password demo.

## Mengubah tampilan
Buka `tools/demo.html`, edit (klik langsung atau lewat panel), klik "Unduh .zip", ekstrak ke folder proyek dan pilih Replace.

## Firebase (Phase 3)
1. Salin `.env.example` menjadi `.env` dan isi nilainya (jangan di-commit).
2. Buat dua akun di Firebase Authentication dengan email alias: `<username>@pa.example.com`.
3. Buat koleksi `users` di Firestore: dokumen ber-ID = UID akun, field `username`, `displayName`, `role` (`admin` / `member`).
4. Tempel isi `firestore.rules` di Firestore > Rules, lalu Publish.
Tanpa `.env`, aplikasi berjalan dalam mode demo (data dummy).

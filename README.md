# Ival Permana — Portfolio

Ringkasan singkat proyek portfolio pribadi yang dibangun dengan React + Vite dan Tailwind.

**Project**

- **Source:** React + Vite (ESM)
- **Styling:** Tailwind CSS (custom CSS di `src/styles/index.css`)
- **Assets:** `src/assets/images/logos/` — tempat ikon/brand SVG untuk halaman `Skills`.

**Quick start**

- Instal dependensi:

```bash
npm install
```

- Jalankan development server:

```bash
npm run dev
```

- Build produksi:

```bash
npm run build
```

- Preview build:

```bash
npm run preview
```

**Docker**

- Build image (multi-stage Dockerfile ada di root):

```bash
docker build -t ival-portfolio .
```

- Jalankan container (exposes 5000):

```bash
docker run -p 5000:5000 --rm ival-portfolio
```

- `docker-compose.yml` tersedia untuk menjalankan service dengan pengaturan healthcheck.

**Folder & file penting**

- **Source:** [src](src/)
- **Styles:** [src/styles/index.css](src/styles/index.css#L1)
- **Komponen:** [src/components/](src/components/)
  - `Skills.jsx` — bagian Tools & Teknologi
  - `Contact.jsx` — tautan email dan kontak
  - `Footer.jsx` — tautan GitHub & LinkedIn
- **Logo assets:** `src/assets/images/logos/`
- **Config:** `tailwind.config.js`, `vite.config.js`, `postcss.config.js`

**Logo handling**

- SVG resmi/ikon disimpan di `src/assets/images/logos/`.
- Untuk menambahkan logo baru: letakkan file SVG di folder tersebut, beri nama deskriptif (mis. `aws.svg`), lalu import di `src/components/Skills.jsx` dan tambahkan mapping pada `iconMap`.
- Untuk membuat PNG versi, gunakan ImageMagick/Inkscape/sharp secara lokal. Contoh (PowerShell + ImageMagick):

```powershell
$sizes = @(512,256,64)
Get-ChildItem src\assets\images\logos -Filter *.svg | ForEach-Object {
  $svg = $_.FullName
  $name = [System.IO.Path]::GetFileNameWithoutExtension($_.Name)
  foreach ($s in $sizes) {
    magick convert -background none "$svg" -resize ${s}x${s} "src\assets\images\logos\$name-$s.png"
  }
}
```

**Customization & theme**

- Warna primer dan variabel tema didefinisikan di `src/styles/index.css` (variabel CSS: `--void`, `--primary`, `--accent`, `--border`).
- Untuk menyesuaikan tampilan ikons di `Skills`, edit `src/components/Skills.jsx` (ukuran `w-8 h-8`, spacing).

**Contact**

- Email: `ivalpermana24@gmail.com` (link compose Gmail di `src/components/Contact.jsx`).
- GitHub: https://github.com/Eval04
- LinkedIn: https://www.linkedin.com/in/ival-permana-5273b6306

**Notes**

- Beberapa logo awal dibuat sebagai placeholder; update `src/assets/images/logos/logos.json` untuk melihat ikon yang tersedia.
- Jika ingin saya bantu menambahkan PNG export atau menambah ikon resmi, beri tahu dan saya berikan perintah otomatis atau lakukan pembaruan.

---

Jika Anda ingin saya tambahkan bagian dokumentasi deploy ke GitHub Pages, Netlify, atau Azure Static Web Apps, beri tahu platform yang dipilih dan saya akan tambahkan instruksi singkat.

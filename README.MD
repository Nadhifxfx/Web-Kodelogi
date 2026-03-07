
## Deploy ke Vercel

- **Framework**: Vite (React)
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

Catatan:
- File `vercel.json` sudah disiapkan untuk **SPA rewrite** (React Router), jadi route seperti `/about` tetap jalan saat di-refresh.
- Kalau Vercel sebelumnya error `Command "vite build" exited with 126`, project ini memakai build script yang menjalankan Vite via Node (`node ./node_modules/vite/bin/vite.js build`) supaya tidak tergantung permission executable di environment CI.


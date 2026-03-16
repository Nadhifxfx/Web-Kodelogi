
# Kodelogi — Visual Foundation

Dokumen ini menjelaskan “fondasi visual” yang dipakai di project ini supaya desain antar halaman konsisten (warna, typography, komponen, spacing, dan pola UI).

## Quick Start

- Install: `npm install`
- Dev: `npm run dev`
- Build: `npm run build`

## 1) Design Tokens (Warna & Theme)

Project ini memakai **semantic color tokens** berbasis CSS variables (HSL) yang di-map ke Tailwind di `tailwind.config.js`, dan nilainya didefinisikan di `src/index.css`.

### Token warna yang tersedia

Gunakan token-token ini (bukan hardcode `text-white`, `text-zinc-*`, dll):

- `bg-background` / `text-foreground`
- `bg-card` / `text-card-foreground`
- `border-border`
- `text-muted-foreground` / `bg-muted`
- `bg-primary` / `text-primary-foreground`
- `bg-accent` / `text-accent-foreground`
- `bg-destructive` / `text-destructive-foreground`
- `bg-code` / `text-code-foreground` (untuk blok kode)

Contoh penggunaan:

```tsx
<div className="bg-background text-foreground">
	<p className="text-muted-foreground">Deskripsi/lead text</p>
	<button className="bg-primary text-primary-foreground">Primary CTA</button>
</div>
```

### Color palette (HEX)

Berikut nilai HEX dari token warna yang dipakai. Sumber nilai asli adalah HSL di `src/index.css` (CSS variables); tabel ini hanya “friendly view” untuk kebutuhan desain/preview.

| Token (CSS var) | HSL | HEX |
| --- | --- | --- |
| `--background` | `hsl(0 0% 13%)` | `#212121` |
| `--foreground` | `hsl(0 0% 95%)` | `#f2f2f2` |
| `--card` | `hsl(0 0% 16%)` | `#292929` |
| `--card-foreground` | `hsl(0 0% 95%)` | `#f2f2f2` |
| `--popover` | `hsl(0 0% 16%)` | `#292929` |
| `--popover-foreground` | `hsl(0 0% 95%)` | `#f2f2f2` |
| `--primary` | `hsl(214 46% 65%)` | `#7da0cf` |
| `--primary-foreground` | `hsl(0 0% 10%)` | `#1a1a1a` |
| `--secondary` | `hsl(255 85% 71%)` | `#9676f4` |
| `--secondary-foreground` | `hsl(0 0% 100%)` | `#ffffff` |
| `--accent` | `hsl(255 85% 71%)` | `#9676f4` |
| `--accent-foreground` | `hsl(0 0% 100%)` | `#ffffff` |
| `--muted` | `hsl(0 0% 20%)` | `#333333` |
| `--muted-foreground` | `hsl(0 0% 65%)` | `#a6a6a6` |
| `--border` | `hsl(0 0% 22%)` | `#383838` |
| `--input` | `hsl(0 0% 22%)` | `#383838` |
| `--ring` | `hsl(214 46% 65%)` | `#7da0cf` |
| `--success` | `hsl(142 70% 45%)` | `#22c35d` |
| `--success-foreground` | `hsl(0 0% 100%)` | `#ffffff` |
| `--destructive` | `hsl(0 70% 50%)` | `#d92626` |
| `--destructive-foreground` | `hsl(0 0% 100%)` | `#ffffff` |
| `--code-bg` | `hsl(0 0% 10%)` | `#1a1a1a` |
| `--code-foreground` | `hsl(214 46% 80%)` | `#b5c9e3` |
| `--sidebar-background` | `hsl(0 0% 10%)` | `#1a1a1a` |
| `--sidebar-foreground` | `hsl(0 0% 95%)` | `#f2f2f2` |
| `--sidebar-primary` | `hsl(214 46% 65%)` | `#7da0cf` |
| `--sidebar-primary-foreground` | `hsl(0 0% 100%)` | `#ffffff` |
| `--sidebar-accent` | `hsl(0 0% 18%)` | `#2e2e2e` |
| `--sidebar-accent-foreground` | `hsl(0 0% 95%)` | `#f2f2f2` |
| `--sidebar-border` | `hsl(0 0% 20%)` | `#333333` |
| `--sidebar-ring` | `hsl(214 46% 65%)` | `#7da0cf` |


### Glow & gradient utilities

Utilities berikut didefinisikan di `src/index.css`:

- `glow-primary`, `glow-accent`, `glow-success`, `glow-error`
- `text-gradient` (gradient teks dari `primary` ke `accent`)

Gunakan ini untuk highlight (CTA / focus state) tanpa menambah warna baru.

### Catatan theme (dark/light)

`ThemeProvider` (di `src/components/Theme.tsx`) memasang class `dark` atau `light` pada `<html>`. Saat ini palet warna yang aktif didefinisikan di `:root` pada `src/index.css`.

- Jika ingin “light mode” benar-benar berbeda, tambahkan override variables untuk `.light { ... }` di `src/index.css`.

## 2) Typography System

### Font

- Font utama: **Poppins**
- Diset lewat Tailwind `fontFamily.sans` di `tailwind.config.js` dan di-apply ke `body` via `src/index.css` (`font-sans`).

### Skala heading yang direkomendasikan

Pakai skala yang sudah konsisten di halaman-halaman utama:

**A. Page Hero (judul halaman besar)**

```txt
text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-[1.05]
```

**B. Section Heading**

```txt
text-2xl md:text-3xl font-semibold tracking-tight
```

**C. Lead / Deskripsi Section**

```txt
mt-3 text-sm md:text-base text-muted-foreground leading-relaxed
```

**D. Body text**

- Default: pakai `text-foreground` untuk konten utama
- Untuk teks penjelas/secondary: `text-muted-foreground`
- Untuk label kecil: `text-xs` + `tracking-widest uppercase text-muted-foreground` (opsional untuk badge/label)

### Rules (biar konsisten)

- Gunakan `text-foreground` dan `text-muted-foreground` untuk teks (hindari `text-white`, `text-gray-*`, `text-zinc-*`).
- Gunakan `text-gradient` hanya untuk kata kunci/aksen (bukan seluruh paragraf).
- Hindari variasi weight berlebihan: umumnya `font-semibold` untuk heading, `font-medium` untuk label/button, dan normal untuk body.

## 3) Layout & Spacing

### Container

Tailwind container diset di `tailwind.config.js`:

- `container.center = true`
- padding default `2rem`
- breakpoint `2xl = 1400px`

Rekomendasi: gunakan `container` untuk section utama, dan jaga padding horizontal konsisten (`px-6` atau rely pada `container`).

### Spacing antar section

Pattern yang sering dipakai:

- Section utama: `py-20 md:py-24`
- Section yang lebih kecil: `mt-10`, `mt-12`, `mt-20` untuk jarak antar blok

Gunakan spacing yang sama antar halaman agar ritme layout konsisten.

## 4) Komponen & Pola UI

### Card

Pola card yang konsisten biasanya:

- `rounded-3xl`
- `border border-accent/16` atau `border border-border/60`
- `bg-card/35` atau `bg-card/40` (opsional `backdrop-blur-*`)

Contoh:

```tsx
<div className="rounded-3xl border border-accent/16 bg-card/35 p-8">
	<h3 className="text-foreground font-semibold">Judul Card</h3>
	<p className="text-muted-foreground">Deskripsi</p>
</div>
```

### Button

- Primary CTA: `bg-primary text-primary-foreground` + hover `hover:glow-primary hover:scale-[1.02]`
- Secondary/ghost: gunakan `border-border/60` + `bg-background/10` + hover `hover:border-primary/30 hover:text-primary`

### Form/Input

Ikuti pola di halaman Contact:

- Base: `bg-card/50` + `border-border`
- Focus state: `border-primary glow-primary`
- Placeholder: `placeholder:text-muted-foreground`

## 5) Motion & Icons

- Animasi: `framer-motion` dipakai untuk transisi masuk/scroll reveal.
- Icon: `lucide-react`.

Rules:

- Motion harus subtle: `opacity` + `y` kecil, durasi ±0.5s.
- Hindari animasi berlebihan yang mengubah layout drastis.

## 6) Checklist Konsistensi (Sebelum Merge)

- [ ] Tidak ada hardcode warna teks (`text-white`, `text-zinc-*`, dll)
- [ ] Heading mengikuti skala (Hero / Section / Body)
- [ ] Lead text pakai `text-muted-foreground` dan `leading-relaxed`
- [ ] Card & button mengikuti pola border/radius yang sama
- [ ] Hover/focus state memakai token (`primary`, `accent`) + `glow-*`


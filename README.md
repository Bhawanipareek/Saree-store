# VANYA COUTURE — Luxury Saree Showroom Website

A high-end, cinematic, editorial Indian haute couture and luxury saree showroom website. Built with an aesthetic inspired by luxury fashion ateliers (Sabyasachi, Raw Mango, Tarun Tahiliani).

---

## ✨ Features

- **60FPS Canvas Video Engine**: High-performance, zero-stutter frame scrubbing inspired by Apple's product experience pages.
- **Strict Scroll Lock Engine**: When entering the hero section, the page remains strictly locked until the user scrubs through the entire video (100%), unlocking natural page scrolling upon completion.
- **Bi-directional Scrubbing**: Scroll down to play forward; scroll up to reverse.
- **14 Editorial Luxury Sections**:
  - Full-viewport Hero with Canvas Video, Dark Gradient & Custom Typography
  - Transparent-to-Glass Scrolled Navbar with Fullscreen Mobile Drawer
  - Editorial Introduction (*"Crafted for Moments That Matter"*)
  - 6 Curated Collection Categories (*Bridal, Banarasi, Silk, Designer, Party Wear, Handloom*)
  - The Bridal Edit (Asymmetrical Magazine Spread)
  - Saree Product Showcase with Interactive Quick View Modal
  - Parallax Cinematic Lookbook
  - Flagship Showroom Experience with Google Maps integration
  - Showroom Masonry Gallery
  - The Atelier Standards (Why Choose Us)
  - Client Testimonials Slider
  - Instagram World (*@vanyacouture*)
  - Bespoke VIP Appointment Booking Form with direct WhatsApp sync
  - Atelier Contact Desk & Location
  - Dark Luxury Footer
- **Floating WhatsApp Concierge**: Instant direct contact with pre-filled luxury inquiries.
- **Desktop Custom Cursor**: Fluid magnetic dot & circle follower (auto-disabled on touch devices).
- **Responsive Design**: Flawless experience across 4K, Desktop, Tablet, and Mobile.

---

## 📁 Project Structure

```text
├── index.html                           # Semantic HTML5 luxury editorial structure
├── css/
│   └── style.css                        # CSS variables, typography, sticky hero, responsive grid
├── js/
│   └── script.js                        # 60fps canvas engine, scroll lock, quick view modal
└── assets/
    ├── frames/                          # 120 WebP video frames for zero-lag 60fps scrub
    ├── videos/
    │   ├── hero.mp4                     # 1080p All-I-Frame MP4
    │   └── hero-mobile.mp4              # Portrait lightweight mobile version
    ├── images/                          # Curated high-res Indian fashion & showroom photography
    └── icons/                           # Clean inline SVGs
```

---

## 🚀 Getting Started

Simply open `index.html` in any modern web browser, or serve locally:

```bash
# Using Python
python -m http.server 8080

# Or using Node
npx serve .
```

Then navigate to `http://localhost:8080`.

---

## 🛠️ Customization

Showroom details, contact numbers, address, and media paths can be modified in one place in `js/script.js`:

```javascript
const SITE_CONFIG = {
  brandName: "VANYA COUTURE",
  tagline: "The Art of Draping",
  phone: "+91 98765 43210",
  whatsapp: "+919876543210",
  email: "concierge@vanyacouture.com",
  address: "74 Heritage Avenue, Kala Ghoda Arts District, Mumbai, Maharashtra 400001",
  instagram: "@vanyacouture"
};
```

---

## 📄 License

All rights reserved © 2026 Vanya Couture.

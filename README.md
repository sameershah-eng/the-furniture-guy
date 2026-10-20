# The Furniture Guy (King of Bling) — Luxury E-Commerce Website

A high-end, bespoke e-commerce web application designed for UK luxury glam, mirrored, crushed diamond, and silver-finish furniture retailer **The Furniture Guy** (sub-brand / social emporium: **King of Bling**).

Built using real photos sourced directly from the client's showroom floor and official Facebook page, with a "Light Luxe Glam" aesthetic crafted in warm pearl (`#FBF9F6`), champagne-to-rose-gold gradients, and crisp bevelled reflections.

---

## 💎 Features & Capabilities

- **Real Client Stock Recognition**: All 42 uploaded client photographs and showroom sale flyers are mapped to actual catalog items (Venice display cabinets, Diamond Crush electric fireplaces, Ariana marble suites, Heart consoles, and crystal lamps).
- **Light Luxe Visual Direction**: High-contrast editorial typography pairing *Cormorant Garamond* with *Manrope*, subtle hairline borders, and zero-pill typographic discipline.
- **Dynamic Shopping Basket & Cart Drawer**: Slide-out drawer with real-time free delivery calculation (free over £499 threshold), line item quantity steppers, and promotional voucher redemption (`BLING10` for 10% off, `GLAM20` for £20 off).
- **Two-Man Delivery & £20 Deposit System**: Genuine UK retail workflow allowing customers to reserve pieces with a £20 deposit and settle the balance upon room-of-choice inspection.
- **Interactive Multi-Step Showroom Booking**: 4-step consultation booking tool with date picker, 30-minute time slots (excluding Sundays), product of interest selector, Google Calendar deep link, and `.ics` file download.
- **SmartImage Component**: Fast, blur-up lazy loading with automatic fallback gradient tiles ensuring zero broken image frames.
- **Live Search Overlay & Filtering**: Multi-attribute filtering by finish (Mirrored, Crushed Diamond, Marble, Velvet, Chrome, Glass), price range slider, and sort order.
- **Real Homes Showcase**: Customer styling gallery populated with real photos from the Facebook community, featuring full-screen image lightboxes.
- **Direct WhatsApp & Phone Stack**: Floating quick contact stack with pre-filled product inquiries (`0161 327 0654`).

---

## 🚀 Quick Start & Deployment

### Local Development
```bash
npm install
npm run dev
```
The app runs at `http://localhost:3000`.

### Production Build
```bash
npm run build
```
Tested with TypeScript and Vite with zero compiler errors.

### Vercel Deployment
The repository includes `vercel.json` with SPA route rewrites:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```
Simply connect the repository to Vercel and deploy as a standard Vite application.

---

## 🛠 Where to Edit Store Content

| What to edit | File location | Description |
| :--- | :--- | :--- |
| **Business Details** | `src/config/site.ts` | Store name, phone, WhatsApp number, email, address, opening hours, free delivery threshold. |
| **Product Catalogue** | `src/data/products.ts` | 28+ products with prices, sale prices, dimensions, stock counts, and descriptions. |
| **Collections** | `src/data/collections.ts` | The 8 showroom collections, descriptions, banners, and slugs. |
| **Image Registry** | `src/data/images.ts` | Central registry mapping all image paths and alts. |
| **Client Photos** | `/public/images/client/` | Clean kebab-case `.jpg` client images. |

---

## 📸 Client Photo Registry & Mapping

All 42 client photos are stored in `/public/images/client/` and mapped to their exact showroom context:

1. `hero-showroom-dining-set.jpg`: Primary homepage hero photo & showroom background banner.
2. `crushed-diamond-round-dining-table.jpg`: Round glass top dining table with octagonal crushed crystal pedestal.
3. `venice-mirrored-display-cabinet-led.jpg`: Venice display cabinet with twin integrated LED downlights.
4. `crushed-diamond-fireplace-electric-flame.jpg`: Diamond Crush electric fireplace suite with realistic LED flame.
5. `heart-console-table-led-crushed-diamond.jpg`: Heart console table with internal LED backlighting and crystal inlay.
6. `crushed-diamond-3-drawer-tv-unit-150cm.jpg`: 150cm crushed diamond mirrored TV console with 3 drawers.
7. `mirrored-tv-unit-crushed-diamond-120cm.jpg`: 120cm compact mirrored TV console with crystal door inserts.
8. `mirrored-5-drawer-crushed-diamond-tallboy.jpg`: 5-drawer mirrored tallboy chest with crystal drawers.
9. `crushed-diamond-3-drawer-sideboard.jpg`: 3-drawer 2-door mirrored sideboard credenza.
10. `crushed-diamond-luxury-sideboard.jpg`: 4-door luxury mirrored sideboard credenza.
11. `crushed-diamond-rectangular-coffee-table.jpg`: Dual-tier crushed diamond coffee table with lower shelf.
12. `ariana-marble-dining-table.jpg`: Ariana marble dining table with chrome double-C pedestal.
13. `styled-home-marble-dining-room.jpg`: Client home dining suite with Ariana table and 6 grey knockerback chairs.
14. `ariana-marble-dining-table-bench-set.jpg`: Ariana marble dining suite paired with tufted grey bench.
15. `knightsbridge-lion-knocker-velvet-chairs.jpg`: Knightsbridge lion-knocker velvet chairs (Grey, Black, Cream, Navy, Blush).
16. `ariana-marble-coffee-table.jpg`: Ariana marble coffee table with chrome C-shaped legs.
17. `ariana-marble-square-lamp-table.jpg`: Ariana marble square lamp side table.
18. `crushed-diamond-portrait-mirror-120x80.jpg`: Bevelled 120x80cm crushed diamond wall mirror.
19. `crushed-diamond-landscape-mirror-120x80.jpg`: Bevelled landscape wall mirror.
20. `crushed-diamond-led-wall-mirror.jpg`: Touch-capacitive backlit crushed diamond LED mirror.
21. `crystal-full-length-mirror-180x70cm.jpg`: Grand 180cm crystal leaner mirror.
22. `heart-crushed-diamond-illuminated-mirror.jpg`: Heart-shaped illuminated vanity mirror with shelf.
23. `sunburst-round-crushed-diamond-wall-mirror.jpg`: 90cm round sunburst crystal prism wall mirror.
24. `mirrored-crushed-diamond-wall-clock-90cm.jpg`: 90cm square mirrored clock with Roman numerals.
25. `crushed-diamond-floor-lamp.jpg`: Standing floor lamp with white silk shade.
26. `crushed-diamond-tiered-floor-lamp.jpg`: Tiered column crushed crystal floor lamp.
27. `crushed-diamond-stacked-floor-lamp.jpg`: Geometric stacked cube crystal floor lamp.
28. `crushed-diamond-table-lamp-black-shade.jpg`: Table lamp with black pleated drum shade.
29. `crushed-diamond-column-table-lamp.jpg`: Bedside column table lamp with ivory shade.
30. `crushed-diamond-pillar-table-lamp.jpg`: Pillar bedside lamp.
31. `mirrored-z-table-lamp.jpg`: Architectural Z-shaped mirrored crystal lamp.
32. `crushed-diamond-geometric-table-lamp.jpg`: Geometric multi-tier accent table lamp.
33. `mirrored-rectangular-crystal-lamp.jpg`: Mirrored rectangular crystal table lamp.
34. `crushed-diamond-luxury-decanter-gift-set.jpg`: Crushed crystal champagne decanter and 2 glasses gift box.
35. `crushed-diamond-whiskey-bottle-gift-set.jpg`: Crushed crystal whiskey bottle and tumbler presentation set.
36. `styled-crushed-diamond-living-room.jpg`: Client living room styled with coffee table, TV unit and crystal mirrors.
37. `crushed-diamond-mirrored-coffee-table-living-room.jpg`: Crushed diamond coffee table styled with white roses.
38. Additional alternate angles and detail shots for galleries and product cards.

---

## 🏷 Unsplash Fallback Inventory

As instructed, high-quality Unsplash fallbacks are kept to a minimum and flagged in `src/data/images.ts`:

- `velvetWingbackChairPink`: Blush pink plush velvet wingback chair (used as secondary option on Valentina chair).
- `crystalChandelier`: Ambient crystal lighting placeholder.
- `monacoConsoleTable`: Minimalist mirrored console placeholder.

*Note for client: To replace these fallbacks, upload your own photo to `/public/images/client/` and update `src/data/images.ts`.*

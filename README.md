# Prime Bike Rentals — RIDE / CLUB Redesign

A separate bike-rental design (editorial charcoal + ivory + signal orange) using the existing React / Vite booking flow.

## Quick start

```bash
npm install
npm run dev
```

Update `src/data.js` for your client company name, WhatsApp number, location, inventory and rental pricing. For visuals, change the bike `image` URLs to photographs of the actual rental fleet. The default photos are representative stock images, not reliable photographs of each model. Adjust page design in `src/style.css`. Google Maps links also live in `src/data.js`.

### Notes
- This is a redesign of the bike site, not the car site. The fleet, categories, contact links and booking flow are retained.
- Local/demo booking storage is browser-specific and **not** a real multi-user reservation system. Set up a shared backend before claiming live cross-user availability.
- External photos and Google Fonts require an internet connection.

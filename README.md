# monis.rent — Workspace Designer

An interactive, visual workspace designer for [monis.rent](https://www.monis.rent) — Bali's office equipment rental service for digital nomads and startups.

Design your dream workspace by selecting desks, chairs, monitors, and accessories, then see your setup come to life on a live preview canvas. When you're happy, hit "Rent This Workspace" to complete your order on monis.rent.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4
- **State Management:** React Context + useReducer
- **Deployment:** Vercel

## Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Setup
```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build
```bash
npm run build
npm start
```

## Features

- Select from 20+ real products from monis.rent
- Visual workspace preview with drag-and-drop positioning
- Real-time price calculation
- Category filtering in product sidebar
- Glass-morphism UI with clean, modern design
- Keyboard shortcuts (Delete to remove, Ctrl+Z to undo)

## Live Demo

[Link to be added after deployment]

## Product Data

Product information is sourced from the monis.rent website. Prices shown are estimates based on published price ranges. Final pricing is determined at checkout on monis.rent.

To update product data, edit `src/data/products.ts`.

## Credits

- **monis.rent** — Product data and rental service
- Product images hosted on monis.rent's Strapi CMS

## License

Proprietary — built for monis.rent.

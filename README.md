# Shop Explorer

Small React + TypeScript app to browse products from the Platzi Fake Store (https://api.escuelajs.co).

## Features
- Product list (fetch from API)
  - Search by title
  - Filter by category
- Product detail (title, description, images, category, price)
  - Add to cart (optimistic UI update; rollback on failure)
- Cart
  - Show products with quantities
  - Increment/decrement quantity
  - Remove item
  - Subtotal
  - Cart state persisted in localStorage
- Routing: list / detail / cart
- Data fetching and optimistic mutation via TanStack Query
- UI: Tailwindcss for quick layout and components

## Tech
- React 19 + TypeScript
- Vite
- React Router v6
- TanStack Query (v5)
- Tailwindcss
- Axios

## Setup (local)
1. Clone repo
2. Install:
```bash
npm install
npm run dev
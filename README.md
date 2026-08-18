# Collector's Hub

> **Discover. Collect. Trade.** — A premium marketplace for collectors of vinyl, comics, coins, cards, watches, and more.

Collector's Hub is a production-ready React + TypeScript + Vite application built as a React Developer Internship assignment. It features a full marketplace, an Instagram-style community feed, and a personal collection manager with persistent state.

## Tech Stack

| Concern        | Library                          |
| -------------- | -------------------------------- |
| Framework      | React 18                         |
| Language       | TypeScript                       |
| Build tool     | Vite                             |
| Routing        | React Router DOM v7              |
| Styling        | Tailwind CSS 3.4.x               |
| Icons          | Lucide React                     |
| Animation      | Framer Motion                    |
| HTTP client    | Axios                            |
| Forms          | React Hook Form + Zod            |
| State          | Context API + LocalStorage       |

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev

# 3. Build for production
npm run build

# 4. Preview the production build
npm run preview
```

The app runs at `http://localhost:5173` by default.

## Project Structure

```
src/
├── assets/            # Static asset references
├── components/        # Reusable UI + feature components
│   └── ui/            # Primitive UI components (Button, Card, Badge, ...)
├── context/           # React Context providers (Theme, Toast, Collection)
├── data/              # Mock JSON data (products, posts, collection, categories)
├── hooks/             # Custom hooks (useLocalStorage, useDebounce, useRecentSearches)
├── layouts/           # Route layout wrappers (RootLayout)
├── pages/             # Route-level pages
├── services/          # Axios instance + async data fetchers
├── types/             # Shared TypeScript types
└── utils/             # Utilities (cn, formatters)
```

## Features

### Pages
- **Home** — Hero, stats, popular categories, trending products, featured collections, latest community posts, CTA.
- **Marketplace** — Search, category & condition filters, sort (newest / price), grid/list toggle, loading skeletons, empty state.
- **Product Details** — Image gallery, seller info, product info, related products, add to wishlist/collection, share.
- **Community Feed** — Instagram-style grid, search, category filter, like/save actions, skeleton loaders.
- **Post Details** — Large image, comments with add-comment form, like/save, related posts.
- **My Collection** — Tabs (Owned / Wishlist / Selling), search, sort, category filter, move & remove items, empty states, total value.
- **404** — On-brand not-found page.

### State Management
- **Theme Context** — light/dark mode persisted to localStorage.
- **Collection Context** — owned / wishlist / selling lists persisted to localStorage; duplicate prevention with toasts.
- **Toast Context** — success / warning / error / info notifications.

### Edge Cases Handled
- Prevent duplicate additions (toast warning).
- Success toasts on add/move/remove.
- Missing image fallback (inline SVG placeholder).
- No search results empty state.
- Loading skeletons and error retry states.
- Filters persist during navigation via local component state.

## Mock Data
- 25 marketplace products across 10 categories.
- 20 community posts with comments and likes.
- 10 pre-seeded collection items (owned / wishlist / selling).

## Animations
Built with Framer Motion: page transitions, fade/scale entrances, layout animations on grids, hover lift effects, animated theme toggle, and toast transitions. Respects `prefers-reduced-motion`.

## Assumptions
- No real backend; all data is mocked and served through an Axios-compatible async layer with simulated latency.
- Authentication is out of scope; the "current user" is a placeholder for comments.
- Images are sourced from Pexels (license-free stock photography).
- LocalStorage is used for persistence; no server-side storage is required.

## Libraries Used
- react, react-dom
- react-router-dom
- framer-motion
- axios
- react-hook-form
- zod
- @hookform/resolvers
- lucide-react
- clsx
- tailwind-merge
- tailwindcss, postcss, autoprefixer (dev)

## How to Run
```bash
npm install
npm run dev
```
Open the printed local URL in your browser. Use the theme toggle in the navbar to switch between light and dark mode.

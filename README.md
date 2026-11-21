# Sports Store

A sports accessories e-commerce frontend with product browsing, a cart with quantities, a wishlist, and client-side routing. State is managed with Redux Toolkit, and the cart and wishlist persist across reloads via localStorage.

## Tech Stack

- React + TypeScript (Vite)
- Redux Toolkit and React Redux
- React Router
- Axios
- Tailwind CSS
- lucide-react (icons)

## Features

- **Navbar** with icon links to Home, Products, Wishlist and Cart. Live badges show total cart units and wishlist count. The bar is transparent over the home hero and solid and sticky on other pages. The active page is highlighted.
- **Product listing** of the sports accessories catalogue.
- **Product details** page with image, description, price and dimensions.
- **Cart**
  - Add the same product multiple times (e.g. 5 baseball bats).
  - Increase or decrease quantity, remove an item, or clear the cart.
  - Line totals and an order summary based on quantity.
- **Wishlist**
  - Toggle a product from its detail page.
  - Move items to the cart or remove them.
- **Persistence:** cart and wishlist are saved to localStorage and restored on reload.
- **Error page** that handles 404s and unexpected errors, with links back home and to products.
- Loading and error states with a retry option on data-driven pages.

## Routes

| Path               | Page               |
| ------------------ | ------------------ |
| `/`                | Home               |
| `/productListing`  | Product listing    |
| `/product/:id`     | Product details    |
| `/cart`            | Cart               |
| `/wishlist`        | Wishlist           |
| any other path     | Error page         |

## Redux Structure

Defined in `src/Redux/Slice.ts` and combined in `src/Redux/Store.ts`.

| Store key           | Purpose                                                        |
| ------------------- | -------------------------------------------------------------- |
| `allProducts`       | Fetches the full catalogue (`allProductsThunk`)                |
| `individualProduct` | Fetches a single product (`individualProductThunk`)            |
| `cart`              | `cartItems: { id, quantity }[]`                                |
| `wishlist`          | `wishlistItems: number[]` (product IDs)                        |

**Cart actions:** `addToCart`, `decrementQuantity`, `setQuantity`, `removeFromCart`, `resetCart`

**Wishlist actions:** `addToWishlist`, `removeFromWishlist`, `toggleWishlist`, `resetWishlist`

The cart and wishlist store only product IDs (and quantity for the cart). Full product details are resolved from the fetched catalogue at render time, so price and title are never stale.

`Store.ts` loads `cart` and `wishlist` from localStorage as the preloaded state and writes them back on every store update.

## Getting Started

```bash
npm install
npm run dev
```

The app runs at `http://localhost:5173`.

## Project Structure

```
src/
├── api/            # API endpoint config
├── components/     # Navbar
├── pages/          # Cart, Wishlist, ProductListing, IndividualProduct, Error
├── Redux/          # Slice.ts, Store.ts
├── App.tsx         # Home page
├── main.tsx        # Router and Redux Provider setup
└── index.css
```

## Possible Improvements

- Order history page
- Checkout flow
- Search, filtering and sorting on the listing page
- Persist the catalogue to avoid refetching on each visit

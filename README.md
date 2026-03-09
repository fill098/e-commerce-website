# Dress to the Gills 🛒

A fully functional e-commerce web application built with vanilla JavaScript, HTML, and CSS as a student project.

## Live Demo

🌐 [https://fill098.github.io/e-commerce-website/](https://fill098.github.io/e-commerce-website/)

---

## Features

- 🛍️ Browse 194+ products across 24 categories
- 🔍 Search products by name
- 🏷️ Filter by category (Men, Women, Electronics, Beauty, Home, Lifestyle, Vehicles)
- 🛒 Add to cart with live badge counter
- ➕➖ Increase / decrease quantity in cart
- 🗑️ Remove items from cart
- 💾 Cart persists in localStorage
- 📦 Multi-step checkout form with validation
- ✅ Order confirmation with real email via EmailJS

---

## Pages

| Page            | Description                                       |
| --------------- | ------------------------------------------------- |
| `index.html`    | Home page with hero, categories and about section |
| `products.html` | Shop page with product grid, search and filters   |
| `cart.html`     | Cart page with checkout flow                      |

---

## Project Structure

```
e-commerce-website/
│
├── index.html
├── products.html
├── cart.html
│
├── style/
│   └── style.css
│
└── JS/
    ├── main.js              ← entry point for products page
    ├── cartMain.js          ← entry point for cart page
    │
    ├── components/
    │   ├── UI.js            ← renders product cards
    │   ├── cart.js          ← cart data (add, remove, save to localStorage)
    │   ├── cartUi.js        ← cart page display
    │   ├── checkout.js      ← multi-step checkout + validation
    │   ├── filterMenager.js ← filter buttons logic
    │   └── searchManager.js ← search logic
    │
    ├── models/
    │   └── Product.js       ← Product class
    │
    └── services/
        └── productService.js ← fetches products from DummyJSON API
```

---

## Tech Stack

- **HTML5** — semantic markup
- **CSS3** — custom properties, grid, flexbox, animations
- **Bootstrap 5** — navbar, table, utility classes
- **Vanilla JavaScript** — ES6 classes, modules, async/await
- **DummyJSON API** — product data
- **EmailJS** — order confirmation emails (no backend required)
- **localStorage** — cart persistence

---

## JavaScript Concepts Used

- ES6 Classes and modules (`import` / `export`)
- Async/await and fetch API
- localStorage for data persistence
- Event delegation
- Array methods (`map`, `filter`, `find`, `reduce`)
- Destructuring and spread operator
- Template literals
- Single Responsibility Principle — one class per concern

---

## Setup

No installation needed! Just open with **Live Server** in VS Code:

```
1. Clone the repo
2. Open in VS Code
3. Right click index.html → Open with Live Server
```

Or visit the live demo above.

---

## API

Products are fetched from [DummyJSON](https://dummyjson.com/):

```
GET https://dummyjson.com/products?limit=200
```

Results are cached in `localStorage` to avoid repeated API calls.

---

## Author

**Filip Mihajlovski**  
Student project — built with ❤️ and a lot of debugging 🐛

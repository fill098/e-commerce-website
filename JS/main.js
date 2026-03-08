import ProductService from "./services/ProductService.js";
import UI from "./components/UI.js";
import FilterManager from "./components/FilterMenager.js";
import SearchManager from "./components/SearchManager.js";
import Cart from "./components/cart.js";

const ui = new UI();
const productService = new ProductService();
const filterManager = new FilterManager(ui);
const searchManager = new SearchManager(ui);
const cart = new Cart();

let products = [];
function updateBadge() {
  document.getElementById("cartCount").textContent = cart.getCount();
}

window.addToCart = function (id) {
  const product = products.find((p) => p.id === id);
  if (!product) return;
  cart.addItem(product);
  updateBadge();

  const btn = document.querySelector(`[data-id="${id}"] .product-card__add-btn`);
  if (btn) {
    btn.textContent = "Added! ✓";
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = "Add to Cart";
      btn.disabled = false;
    }, 1000);
  }
};

async function startApp() {
  try {
    ui.toggleSpinner(true);
    products = await productService.fetchAll();
    ui.displayProducts(products);
    filterManager.init(products);
    searchManager.init(products);
  } catch (error) {
    ui.displayError("Could not load products. Please try again.");
    console.log(error);
  } finally {
    ui.toggleSpinner(false);
  }
}

updateBadge();
startApp();

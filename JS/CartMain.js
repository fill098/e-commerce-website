import Cart from "./components/cart.js";
import CartUI from "./components/cartUi.js";
import Checkout from "./components/checkout.js";

const cart = new Cart();
const cartUI = new CartUI(cart);
const checkout = new Checkout(cart);

cartUI.initEventListeners();
cartUI.renderCart();
checkout.initEventListeners();

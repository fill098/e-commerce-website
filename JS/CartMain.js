import Cart from "./components/Cart.js";
import CartUI from "./components/CartUI.js";
import Checkout from "./components/Checkout.js";

const cart = new Cart();
const cartUI = new CartUI(cart);
const checkout = new Checkout(cart);

cartUI.initEventListeners();
cartUI.renderCart();
checkout.initEventListeners();

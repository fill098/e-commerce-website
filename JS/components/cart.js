export default class Cart {
  constructor() {
    this.items = [];
    this.storageKey = "cart";
    this.load();
  }

  save() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.items));
  }

  load() {
    const saved = localStorage.getItem(this.storageKey);
    if (saved) {
      this.items = JSON.parse(saved);
    }
  }

  addItem(product) {
    const existing = this.items.find((item) => item.id === product.id);
    if (existing) {
      existing.quantity++;
    } else {
      this.items.push({ ...product, quantity: 1 });
    }
    this.save();
  }

  removeItem(id) {
    this.items = this.items.filter((item) => item.id !== id);
    this.save();
  }

  increaseQty(id) {
    const item = this.items.find((item) => item.id === id);
    if (item) {
      item.quantity++;
      this.save();
    }
  }

  decreaseQty(id) {
    const item = this.items.find((item) => item.id === id);
    if (!item) return;
    if (item.quantity === 1) {
      this.removeItem(id);
    } else {
      item.quantity--;
      this.save();
    }
  }

  getTotal() {
    return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
  }

  getCount() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  clear() {
    this.items = [];
    this.save();
  }
}

import Product from "../models/Product.js";

export default class ProductService {
  constructor() {
    this.storageKey = "products";
  }

  async fetchAll() {
    const saved = localStorage.getItem(this.storageKey);
    if (saved) {
      console.log("Data from localStorage");
      return JSON.parse(saved);
    }

    const response = await fetch("https://dummyjson.com/products?limit=200");
    if (!response.ok) throw new Error("Failed to fetch products");

    const json = await response.json();
    const products = Product.createProductObj(json.products);
    console.log("Data from API,");

    localStorage.setItem(this.storageKey, JSON.stringify(products));

    return products;
  }
}

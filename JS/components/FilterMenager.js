export default class FilterManager {
  constructor(ui) {
    this.ui = ui;
    this.allProducts = [];
    this.categoryGroups = {
      men: ["mens-shirts", "mens-shoes", "mens-watches"],
      women: ["womens-dresses", "womens-bags", "womens-jewellery", "womens-shoes", "womens-watches", "tops"],
      electronics: ["smartphones", "laptops", "tablets", "mobile-accessories"],
      beauty: ["beauty", "skin-care", "fragrances"],
      home: ["furniture", "home-decoration", "kitchen-accessories"],
      lifestyle: ["sports-accessories", "sunglasses", "groceries"],
      vehicles: ["motorcycle", "vehicle"],
    };
  }

  init(products) {
    this.allProducts = products;
    this.initEventListeners();
  }

  filterByGroup(group) {
    this.setActiveButton(group);

    if (group === "all") {
      this.ui.displayProducts(this.allProducts);
      return;
    }

    const categories = this.categoryGroups[group];
    const filtered = this.allProducts.filter((p) => categories.includes(p.category));
    this.ui.displayProducts(filtered);
  }

  setActiveButton(group) {
    document.querySelectorAll(".filter-btn").forEach((btn) => {
      btn.classList.remove("active");
    });
    document.getElementById(`btn-${group}`).classList.add("active");
  }

  initEventListeners() {
    document.querySelectorAll(".filter-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const group = btn.id.replace("btn-", "");
        this.filterByGroup(group);
      });
    });
  }
}

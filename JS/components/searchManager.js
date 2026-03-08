export default class SearchManager {
  constructor(ui) {
    this.ui = ui;
    this.allProducts = [];
    this.searchInput = document.getElementById("inp-Search");
    this.searchBtn = document.getElementById("btn-search");
  }

  init(products) {
    this.allProducts = products;
    this.initEventListeners();
  }

  search(searchTerm) {
    if (searchTerm === "") {
      this.ui.displayProducts(this.allProducts);
      return;
    }

    const result = this.allProducts.filter((p) => p.title.toLowerCase().includes(searchTerm.toLowerCase()));

    if (result.length === 0) {
      this.ui.displayError("No products found!");
      return;
    }

    this.ui.displayProducts(result);
  }

  initEventListeners() {
    this.searchBtn.addEventListener("click", () => {
      this.search(this.searchInput.value.trim());
    });

    this.searchInput.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        this.search(this.searchInput.value.trim());
      }
    });
  }
}

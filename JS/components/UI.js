export default class UI {
  constructor() {
    this.spinner = document.getElementById("spinner");
    this.productGrid = document.getElementById("resultsContainer");
  }

  init(cart, products, onAddToCart) {
    this.cart = cart;
    this.products = products;
    this.onAddToCart = onAddToCart;

    this.productGrid.addEventListener("click", (e) => {
      if (e.target.classList.contains("product-card__add-btn")) {
        const card = e.target.closest(".product-card");
        const id = +card.dataset.id;
        this.addToCart(id, e.target);
      }
    });
  }

  addToCart(id, btn) {
    const product = this.products.find((p) => p.id === id);
    if (!product) return;
    this.cart.addItem(product);
    this.onAddToCart();

    if (btn) {
      btn.textContent = "Added! ✓";
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = "Add to Cart";
        btn.disabled = false;
      }, 1000);
    }
  }

  toggleSpinner(show) {
    if (show) {
      this.spinner.classList.remove("d-none");
    } else {
      this.spinner.classList.add("d-none");
    }
  }

  createCard(p) {
    return `
      <div class="col-12 col-md-6 col-lg-4 mb-4">
        <div class="product-card h-100" data-id="${p.id}">
          <div class="product-card__image-wrap" style="height: 300px;">
            <img
              src="${p.thumbnail}"
              alt="${p.title}"
              style="width: 100%; height: 100%; object-fit: cover;"
            />
          </div>
          <div class="product-card__info">
            <h3 class="product-card__name">${p.title}</h3>
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <span class="product-card__price">$${p.price}</span>
              <div class="stars">★★★★☆</div>
            </div>
            <p class="product-card__description text-muted text-sm">${p.description}</p>
            <button class="product-card__add-btn">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    `;
  }

  displayProducts(products) {
    this.productGrid.innerHTML = "";
    if (products.length === 0) {
      this.displayError("No products found!");
      return;
    }
    this.productGrid.innerHTML = products.map((p) => this.createCard(p)).join("");
  }

  displayError(message) {
    this.productGrid.innerHTML = `
      <p style="color: red; text-align: center;">${message}</p>
    `;
  }
}

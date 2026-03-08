export default class CartUI {
  constructor(cart) {
    this.cart = cart;
    this.cartList = document.getElementById("cartList");
    this.cartTotal = document.getElementById("cartTotal");
    this.cartCount = document.getElementById("cartCount");
    this.emptyMsg = document.getElementById("emptyMsg");
    this.cartFooter = document.getElementById("cartFooter");
    this.clearBtn = document.getElementById("clearBtn");
  }

  createCartRow(item) {
    return `
      <tr>
        <td>
          <div style="display: flex; align-items: center; gap: 12px;">
            <img
              src="${item.thumbnail}"
              alt="${item.title}"
              style="width: 70px; height: 70px; object-fit: cover; border-radius: 4px;"
            />
            <div>
              <p style="margin: 0; font-weight: 500;">${item.title}</p>
              <small class="text-muted">${item.category}</small>
            </div>
          </div>
        </td>
        <td>$${item.price}</td>
         <td>
        <div style="display: flex; align-items: center; gap: 8px;">
          <button class="btn btn-outline-secondary btn-sm" data-action="decrease" data-id="${item.id}">−</button>
          <span>${item.quantity}</span>
          <button class="btn btn-outline-secondary btn-sm" data-action="increase" data-id="${item.id}">+</button>
        </div>
      </td>
      <td>$${(item.price * item.quantity).toFixed(2)}</td>
      <td>
        <button class="btn btn-danger btn-sm" data-action="remove" data-id="${item.id}">Remove</button>
      </td>
      </tr>
    `;
  }

  renderCart() {
    this.cartList.innerHTML = "";

    if (this.cart.items.length === 0) {
      this.emptyMsg.classList.remove("d-none");
      this.cartFooter.classList.add("d-none");
      return;
    }

    this.emptyMsg.classList.add("d-none");
    this.cartFooter.classList.remove("d-none");

    this.cartList.innerHTML = this.cart.items.map((item) => this.createCartRow(item)).join("");

    this.cartTotal.textContent = `$${this.cart.getTotal()}`;
    this.cartCount.textContent = this.cart.getCount();
  }

  initEventListeners() {
    this.clearBtn.addEventListener("click", () => {
      this.cart.clear();
      this.renderCart();
    });

    this.cartList.addEventListener("click", (event) => {
      const btn = event.target.closest("button");
      if (!btn) return;

      const id = Number(btn.dataset.id);

      if (btn.dataset.action === "increase") {
        this.cart.increaseQty(id);
      } else if (btn.dataset.action === "decrease") {
        this.cart.decreaseQty(id);
      } else if (btn.dataset.action === "remove") {
        this.cart.removeItem(id);
      }

      this.renderCart();
    });
  }
}

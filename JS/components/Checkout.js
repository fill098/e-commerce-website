export default class Checkout {
  constructor(cart) {
    this.cart = cart;

    this.cartView = document.getElementById("cartView");
    this.step1 = document.getElementById("step1");
    this.step2 = document.getElementById("step2");
    this.step3 = document.getElementById("step3");

    this.fullName = document.getElementById("fullName");
    this.email = document.getElementById("email");
    this.address = document.getElementById("address");
    this.city = document.getElementById("city");
    this.zip = document.getElementById("zip");

    this.reviewList = document.getElementById("reviewList");
    this.reviewTotal = document.getElementById("reviewTotal");
    this.shippingSummary = document.getElementById("shippingSummary");

    this.confirmMsg = document.getElementById("confirmMsg");

    this.checkoutBtn = document.getElementById("checkoutBtn");
    this.toStep2Btn = document.getElementById("toStep2");
    this.backToCartBtn = document.getElementById("backToCartBtn");
    this.backToStep1 = document.getElementById("backToStep1");
    this.confirmOrder = document.getElementById("confirmOrder");
  }

  showOnly(view) {
    [this.cartView, this.step1, this.step2, this.step3].forEach((el) => {
      el.classList.add("d-none");
    });
    view.classList.remove("d-none");
  }

  validateStep1() {
    let valid = true;

    if (this.fullName.value.trim() === "") {
      this.showError("fullName");
      valid = false;
    } else {
      this.clearError("fullName");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email.value.trim())) {
      this.showError("email");
      valid = false;
    } else {
      this.clearError("email");
    }

    if (this.address.value.trim() === "") {
      this.showError("address");
      valid = false;
    } else {
      this.clearError("address");
    }

    if (this.city.value.trim() === "") {
      this.showError("city");
      valid = false;
    } else {
      this.clearError("city");
    }

    const zipRegex = /^\d{5}$/;
    if (!zipRegex.test(this.zip.value.trim())) {
      this.showError("zip");
      valid = false;
    } else {
      this.clearError("zip");
    }

    return valid;
  }

  showError(field) {
    document.getElementById(field).classList.add("is-invalid");
    document.getElementById(`err-${field}`).style.display = "block";
  }

  clearError(field) {
    document.getElementById(field).classList.remove("is-invalid");
    document.getElementById(`err-${field}`).style.display = "none";
  }

  renderReview() {
    this.shippingSummary.innerHTML = `
      <p style="margin:0; font-size: 0.85rem; color: var(--muted); text-transform: uppercase; letter-spacing: 0.1em;">Shipping to</p>
      <p style="margin: 0.3rem 0 0; font-weight: 500;">${this.fullName.value}</p>
      <p style="margin: 0; color: var(--muted);">${this.address.value}, ${this.city.value} ${this.zip.value}</p>
      <p style="margin: 0; color: var(--muted);">${this.email.value}</p>
    `;

    this.reviewList.innerHTML = this.cart.items
      .map(
        (item) => `
        <tr>
          <td>
            <div style="display:flex; align-items:center; gap:12px;">
              <img src="${item.thumbnail}" style="width:50px; height:50px; object-fit:cover;" />
              <span>${item.title}</span>
            </div>
          </td>
          <td>$${item.price}</td>
          <td>${item.quantity}</td>
          <td>$${(item.price * item.quantity).toFixed(2)}</td>
        </tr>
      `,
      )
      .join("");

    this.reviewTotal.textContent = `$${this.cart.getTotal()}`;
  }

  showConfirmation() {
    this.confirmMsg.textContent = `Thank you, ${this.fullName.value}! Your order is on its way to ${this.city.value}.`;

    const orderSummary = this.cart.items.map((item) => `${item.title} x${item.quantity} — $${(item.price * item.quantity).toFixed(2)}`).join("\n");

    emailjs
      .send("service_eh9uvga", "template_u2y7424", {
        to_name: this.fullName.value,
        to_email: this.email.value,
        order_summary: orderSummary,
        total: `$${this.cart.getTotal()}`,
        address: `${this.address.value}, ${this.city.value} ${this.zip.value}`,
      })
      .then(() => {
        console.log("Email sent successfully!");
      })
      .catch((error) => {
        console.error("Email failed:", error);
      });

    this.cart.clear();
  }

  initEventListeners() {
    this.checkoutBtn.addEventListener("click", () => {
      this.showOnly(this.step1);
    });

    this.toStep2Btn.addEventListener("click", () => {
      if (!this.validateStep1()) return;
      this.renderReview();
      this.showOnly(this.step2);
    });

    this.backToCartBtn.addEventListener("click", () => {
      this.showOnly(this.cartView);
    });

    this.backToStep1.addEventListener("click", () => {
      this.showOnly(this.step1);
    });

    this.confirmOrder.addEventListener("click", () => {
      this.showConfirmation();
      this.showOnly(this.step3);
    });
  }
}

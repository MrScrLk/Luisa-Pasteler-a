document.addEventListener("DOMContentLoaded", function () {
  // ---- CARRITO ----
  const cart = {};

  const cartCountEl = document.getElementById("cart-count");
  const cartPanel = document.getElementById("cart-panel");
  const cartItemsEl = document.getElementById("cart-items");
  const cartEmptyEl = document.getElementById("cart-empty");
  const cartTotalEl = document.getElementById("cart-total");
  const openCartMini = document.getElementById("open-cart-mini");
  const closeCart = document.getElementById("close-cart");
  const clearCart = document.getElementById("clear-cart");
  const copyCart = document.getElementById("copy-cart");

  function formatPrice(value) {
    return "$" + value.toLocaleString("es-AR");
  }

  function updateCartDisplay() {
    if (!cartCountEl || !cartItemsEl || !cartTotalEl || !cartEmptyEl) return;

    const entries = Object.values(cart);
    const totalItems = entries.reduce((sum, item) => sum + item.qty, 0);
    const totalPrice = entries.reduce(
      (sum, item) => sum + item.qty * item.price,
      0
    );

    cartCountEl.textContent = totalItems;

    if (entries.length === 0) {
      cartItemsEl.innerHTML = "";
      cartEmptyEl.style.display = "block";
    } else {
      cartEmptyEl.style.display = "none";
      cartItemsEl.innerHTML = "";
      entries.forEach((item) => {
        const li = document.createElement("li");
        li.className = "cart-item";
        li.innerHTML = `
          <span class="cart-item-name">${item.name}</span>
          <span class="cart-item-qty">x${item.qty}</span>
          <span>${formatPrice(item.price * item.qty)}</span>
        `;
        cartItemsEl.appendChild(li);
      });
    }

    cartTotalEl.textContent = formatPrice(totalPrice);
  }

  function addToCart(name, price) {
    const key = name;
    if (!cart[key]) {
      cart[key] = { name, price, qty: 0 };
    }
    cart[key].qty += 1;
    updateCartDisplay();
    openCart();
  }

  function openCart() {
    if (!cartPanel) return;
    cartPanel.style.display = "flex";
  }

  function hideCart() {
    if (!cartPanel) return;
    cartPanel.style.display = "none";
  }

  // Botones "Agregar al carrito"
  document.querySelectorAll("[data-add-to-cart]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const name = btn.getAttribute("data-name");
      const price = Number(btn.getAttribute("data-price") || "0");
      if (!name) return;
      addToCart(name, price);
    });
  });

  // Botones del mini carrito y panel
  if (openCartMini) {
    openCartMini.addEventListener("click", openCart);
  }
  if (closeCart) {
    closeCart.addEventListener("click", hideCart);
  }
  if (clearCart) {
    clearCart.addEventListener("click", () => {
      Object.keys(cart).forEach((key) => delete cart[key]);
      updateCartDisplay();
    });
  }
  if (copyCart) {
    copyCart.addEventListener("click", () => {
      const entries = Object.values(cart);
      if (entries.length === 0) {
        alert("Todavía no agregaste productos al carrito.");
        return;
      }

      let text =
        "Hola Luisa, quiero hacer un pedido y armé este carrito de referencia:%0A%0A";
      entries.forEach((item) => {
        text += `• ${item.name} x${item.qty} (${formatPrice(
          item.price
        )} c/u) = ${formatPrice(item.price * item.qty)}%0A`;
      });
      const total = entries.reduce(
        (sum, item) => sum + item.qty * item.price,
        0
      );
      text += `%0ATotal estimado: ${formatPrice(
        total
      )}%0A%0A¿Me contás disponibilidad y valor final?`;

      const phone = "5493513411147"; // Reemplazar por número real (sin + ni espacios)
      const url = `https://wa.me/${phone}?text=${text}`;
      window.open(url, "_blank");
    });
  }

  updateCartDisplay();

  // ---- FILTROS DEL CATÁLOGO ----
  const filterContainer = document.querySelector("[data-filter-container]");
  if (filterContainer) {
    const buttons = filterContainer.querySelectorAll(".filter-button[data-filter]");
    const items = document.querySelectorAll(".catalog-item[data-category]");

    function applyFilter(filter) {
      items.forEach((item) => {
        const cat = item.getAttribute("data-category");
        if (filter === "todos" || filter === cat) {
          item.classList.remove("is-hidden");
        } else {
          item.classList.add("is-hidden");
        }
      });
    }

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const filter = btn.getAttribute("data-filter") || "todos";

        buttons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        applyFilter(filter);
      });
    });

    // Filtro inicial (todos)
    applyFilter("todos");
  }
});

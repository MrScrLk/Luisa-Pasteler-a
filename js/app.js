(() => {
  "use strict";

  const $ = (selector, parent = document) => parent.querySelector(selector);
  const $$ = (selector, parent = document) => Array.from(parent.querySelectorAll(selector));

  const products = Array.isArray(window.LP_PRODUCTS) ? window.LP_PRODUCTS : [];
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
  const hasGSAP = typeof window.gsap !== "undefined";

  /* ================================================================
     DATOS DE CONTACTO
     Reemplazá solamente estos dos valores.
     WhatsApp: código de país + característica + número, sin + ni espacios.
     Ejemplo Córdoba: "5493511234567"
  ================================================================= */
  const CONTACT = {
    whatsappNumber: "",
    instagramUrl: "https://www.instagram.com/"
  };

  const STORAGE = {
    cart: "lp_cart",
    favorites: "lp_favs",
    theme: "lp_theme"
  };

  const state = {
    query: "",
    filter: "all",
    sort: "featured",
    cart: loadJSON(STORAGE.cart, {}),
    favorites: loadJSON(STORAGE.favorites, []),
    theme: localStorage.getItem(STORAGE.theme) || "light",
    activeOverlay: null
  };

  const tiltedElements = new WeakSet();
  const magneticElements = new WeakSet();

  init();

  function init() {
    setTheme(state.theme, false);
    setStaticContent();
    renderFeatured();
    renderGrid();
    renderGallery();
    renderCart();
    bindEvents();
    setupMotion();
    setupScrollEffects();
    setupActiveNavigation();
    setupContactLinks();
    updateScrollProgress();
  }

  /* ================================================================
     CONFIGURACIÓN INICIAL
  ================================================================= */
  function setStaticContent() {
    const productCounter = $("#statProducts");
    const year = $("#currentYear");

    if (productCounter) productCounter.textContent = String(products.length);
    if (year) year.textContent = String(new Date().getFullYear());
  }

  function setupContactLinks() {
    const whatsBtn = $("#whatsBtn");
    const igBtn = $("#igBtn");

    if (whatsBtn) {
      const welcome = encodeURIComponent("Hola Luisa, quisiera consultar por un pedido.");
      whatsBtn.href = CONTACT.whatsappNumber
        ? `https://wa.me/${CONTACT.whatsappNumber}?text=${welcome}`
        : `https://wa.me/?text=${welcome}`;
    }

    if (igBtn) {
      igBtn.href = CONTACT.instagramUrl || "https://www.instagram.com/";
    }
  }

  /* ================================================================
     EVENTOS
  ================================================================= */
  function bindEvents() {
    $("#btnGoCatalog")?.addEventListener("click", () => scrollToSection("#catalogo"));
    $("#btnSurprise")?.addEventListener("click", surpriseProduct);

    $("#btnTheme")?.addEventListener("click", toggleTheme);
    $("#btnMenu")?.addEventListener("click", toggleMobileMenu);

    $$("#mobileNav a").forEach((link) => {
      link.addEventListener("click", closeMobileMenu);
    });

    $("#heroChips")?.addEventListener("click", handleHeroFilter);
    $("#filterSelect")?.addEventListener("change", handleFilterChange);
    $("#sortSelect")?.addEventListener("change", handleSortChange);
    $("#searchInput")?.addEventListener("input", handleSearch);
    $("#clearSearch")?.addEventListener("click", clearSearch);
    $("#btnPulseAll")?.addEventListener("click", animateCards);

    $("#featuredGrid")?.addEventListener("click", handleProductAction);
    $("#productGrid")?.addEventListener("click", handleProductAction);
    $("#gallery")?.addEventListener("click", handleGalleryClick);
    document.addEventListener("click", handleQuickAdd);

    $("#btnCart")?.addEventListener("click", openDrawer);
    $("#drawerOverlay")?.addEventListener("click", closeDrawer);
    $("#btnCloseCart")?.addEventListener("click", closeDrawer);
    $("#btnKeepShopping")?.addEventListener("click", closeDrawer);
    $("#cartItems")?.addEventListener("click", handleCartAction);
    $("#btnClearCart")?.addEventListener("click", clearCart);
    $("#btnCheckout")?.addEventListener("click", checkout);

    $("#modalOverlay")?.addEventListener("click", closeModal);
    $("#modalClose")?.addEventListener("click", closeModal);
    $("#modalContent")?.addEventListener("click", handleModalAction);

    document.addEventListener("keydown", handleKeyboard);
    window.addEventListener("scroll", handleWindowScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    if (hasFinePointer && !prefersReducedMotion) {
      window.addEventListener("pointermove", moveCursorLight, { passive: true });
      document.body.addEventListener("pointerleave", hideCursorLight);
    }
  }

  function handleWindowScroll() {
    updateScrollProgress();
    const header = $("#siteHeader");
    header?.classList.toggle("is-scrolled", window.scrollY > 24);
  }

  function handleResize() {
    if (window.innerWidth > 900) closeMobileMenu();
  }

  function handleKeyboard(event) {
    if (event.key !== "Escape") return;

    if ($("#modal")?.classList.contains("open")) {
      closeModal();
      return;
    }

    if ($("#drawer")?.classList.contains("open")) {
      closeDrawer();
      return;
    }

    closeMobileMenu();
  }

  /* ================================================================
     CATÁLOGO Y TARJETAS
  ================================================================= */
  function renderFeatured() {
    const container = $("#featuredGrid");
    if (!container) return;

    const featured = products.filter((product) => product.featured).slice(0, 6);
    container.innerHTML = featured
      .map((product, index) => cardHTML(product, { customBadge: "Favorito de la casa", index }))
      .join("");

    refreshInteractiveEffects(container);
  }

  function renderGrid(animate = false) {
    const container = $("#productGrid");
    const count = $("#resultsCount");
    if (!container) return;

    const visibleProducts = getFilteredSortedProducts();

    if (count) {
      count.textContent = `${visibleProducts.length} ${visibleProducts.length === 1 ? "producto" : "productos"}`;
    }

    if (visibleProducts.length === 0) {
      container.innerHTML = `
        <div class="empty-results">
          <div>
            <strong>No encontramos coincidencias</strong>
            <span>Probá otra palabra o elegí una categoría diferente.</span>
          </div>
        </div>
      `;
      return;
    }

    container.innerHTML = visibleProducts
      .map((product, index) => cardHTML(product, { index }))
      .join("");

    refreshInteractiveEffects(container);

    if (animate) animateCards();
  }

  function cardHTML(product, { customBadge, index = 0 } = {}) {
    const favorite = state.favorites.includes(product.id);
    const badge = customBadge || getProductBadge(product);
    const price = product.price == null ? "A consultar" : formatMoney(product.price);
    const description = product.desc?.trim() || "Elaboración artesanal de Luisa Pastelería.";
    const firstTag = product.tags?.[0] || "artesanal";

    return `
      <article
        class="product-card tilt-surface"
        data-product-card="${escapeHTML(product.id)}"
        data-tilt-strength="5"
        style="--card-index:${index}"
      >
        <div class="product-card__media" data-open="${escapeHTML(product.id)}">
          <img loading="lazy" src="${escapeHTML(product.img)}" alt="${escapeHTML(product.name)}" />
          <span class="product-card__badge">${escapeHTML(badge)}</span>
          <button
            class="product-card__fav ${favorite ? "is-active" : ""}"
            type="button"
            data-fav="${escapeHTML(product.id)}"
            aria-label="${favorite ? "Quitar de favoritos" : "Agregar a favoritos"}"
            aria-pressed="${favorite}"
          >${favorite ? "♥" : "♡"}</button>
        </div>

        <div class="product-card__body" data-open="${escapeHTML(product.id)}">
          <span class="product-card__category">${escapeHTML(niceCategory(product.category))}</span>
          <h3 class="product-card__name">${escapeHTML(product.name)}</h3>
          <p class="product-card__desc">${escapeHTML(description)}</p>
          <div class="product-card__meta">
            <span class="product-card__price">${escapeHTML(price)}</span>
            <span class="product-card__tag">${escapeHTML(firstTag)}</span>
          </div>
        </div>

        <div class="product-card__actions">
          <button class="card-btn card-btn--view" type="button" data-open="${escapeHTML(product.id)}">Ver</button>
          <button class="card-btn card-btn--add" type="button" data-add="${escapeHTML(product.id)}">Agregar</button>
        </div>
      </article>
    `;
  }

  function getProductBadge(product) {
    if (product.category === "pan-nube") return "Especialidad";
    if (product.isNew) return "Novedad";
    if (product.featured) return "Destacado";
    return niceCategory(product.category);
  }

  function handleProductAction(event) {
    const favoriteButton = event.target.closest("[data-fav]");
    if (favoriteButton) {
      event.stopPropagation();
      toggleFavorite(favoriteButton.dataset.fav);
      return;
    }

    const addButton = event.target.closest("[data-add]");
    if (addButton) {
      addToCart(addButton.dataset.add, 1);
      return;
    }

    const openTrigger = event.target.closest("[data-open]");
    if (openTrigger) openModal(openTrigger.dataset.open);
  }

  function getFilteredSortedProducts() {
    let list = [...products];

    if (state.filter !== "all") {
      list = list.filter((product) => product.category === state.filter);
    }

    if (state.query) {
      list = list.filter((product) => {
        const searchable = [
          product.name,
          product.desc,
          product.category,
          niceCategory(product.category),
          ...(product.tags || [])
        ]
          .join(" ")
          .toLocaleLowerCase("es");

        return searchable.includes(state.query);
      });
    }

    list.sort((a, b) => {
      switch (state.sort) {
        case "az":
          return a.name.localeCompare(b.name, "es");
        case "za":
          return b.name.localeCompare(a.name, "es");
        case "new":
          return Number(Boolean(b.isNew)) - Number(Boolean(a.isNew));
        case "featured":
        default: {
          const scoreA = (a.featured ? 4 : 0) + (a.category === "pan-nube" ? 3 : 0) + (a.isNew ? 1 : 0);
          const scoreB = (b.featured ? 4 : 0) + (b.category === "pan-nube" ? 3 : 0) + (b.isNew ? 1 : 0);
          return scoreB - scoreA;
        }
      }
    });

    return list;
  }

  function handleHeroFilter(event) {
    const button = event.target.closest("[data-filter]");
    if (!button) return;

    $$("#heroChips [data-filter]").forEach((chip) => chip.classList.remove("active"));
    button.classList.add("active");

    state.filter = button.dataset.filter;
    const select = $("#filterSelect");
    if (select) select.value = state.filter;

    renderGrid(true);
    scrollToSection("#catalogo");
  }

  function handleFilterChange(event) {
    state.filter = event.target.value;
    syncHeroChips();
    renderGrid(true);
  }

  function handleSortChange(event) {
    state.sort = event.target.value;
    renderGrid(true);
  }

  function handleSearch(event) {
    state.query = event.target.value.trim().toLocaleLowerCase("es");
    renderGrid(false);
  }

  function clearSearch() {
    const input = $("#searchInput");
    if (!input) return;

    input.value = "";
    state.query = "";
    renderGrid(false);
    input.focus();
  }

  function syncHeroChips() {
    $$("#heroChips [data-filter]").forEach((chip) => {
      chip.classList.toggle("active", chip.dataset.filter === state.filter);
    });
  }

  function surpriseProduct() {
    const preferred = products.filter((product) => ["pan-nube", "nubes"].includes(product.category));
    const pool = preferred.length ? preferred : products;
    const product = pool[Math.floor(Math.random() * pool.length)];

    if (!product) {
      toast("Sin productos", "Todavía no hay productos cargados.", "☁");
      return;
    }

    openModal(product.id);
    toast("Sorpresa elegida", product.name, "✨");
  }

  /* ================================================================
     GALERÍA
  ================================================================= */
  function renderGallery() {
    const container = $("#gallery");
    if (!container) return;

    container.innerHTML = products
      .map(
        (product) => `
          <figure class="gallery-item" data-gallery-open="${escapeHTML(product.id)}">
            <img loading="lazy" src="${escapeHTML(product.img)}" alt="${escapeHTML(product.name)}" />
            <figcaption class="gallery-item__label">
              <span>${escapeHTML(product.name)}</span>
              <span aria-hidden="true">↗</span>
            </figcaption>
          </figure>
        `
      )
      .join("");
  }

  function handleGalleryClick(event) {
    const item = event.target.closest("[data-gallery-open]");
    if (item) openModal(item.dataset.galleryOpen);
  }

  /* ================================================================
     FAVORITOS
  ================================================================= */
  function toggleFavorite(id) {
    const index = state.favorites.indexOf(id);

    if (index >= 0) {
      state.favorites.splice(index, 1);
    } else {
      state.favorites.push(id);
    }

    saveJSON(STORAGE.favorites, state.favorites);
    updateFavoriteButtons(id);

    const product = getProduct(id);
    toast(
      index >= 0 ? "Quitado de favoritos" : "Guardado en favoritos",
      product?.name || "Producto actualizado",
      index >= 0 ? "♡" : "♥"
    );
  }

  function updateFavoriteButtons(id) {
    const favorite = state.favorites.includes(id);

    $$(`[data-fav="${cssEscape(id)}"]`).forEach((button) => {
      button.textContent = favorite ? "♥" : "♡";
      button.classList.toggle("is-active", favorite);
      button.setAttribute("aria-pressed", String(favorite));
      button.setAttribute("aria-label", favorite ? "Quitar de favoritos" : "Agregar a favoritos");
    });
  }

  /* ================================================================
     MODAL DE PRODUCTO
  ================================================================= */
  function openModal(id) {
    const product = getProduct(id);
    const modal = $("#modal");
    const content = $("#modalContent");
    if (!product || !modal || !content) return;

    const description = product.desc?.trim() || "Elaboración artesanal preparada por Luisa.";
    const tags = [...(product.tags || [])];
    if (product.featured) tags.push("Destacado");
    if (product.isNew) tags.push("Nuevo");

    content.innerHTML = `
      <div class="modal-media">
        <img src="${escapeHTML(product.img)}" alt="${escapeHTML(product.name)}" />
      </div>

      <div class="modal-info">
        <span class="modal-info__category">${escapeHTML(niceCategory(product.category))}</span>
        <h2 id="modalProductTitle">${escapeHTML(product.name)}</h2>
        <p class="modal-info__desc">${escapeHTML(description)}</p>

        <div class="modal-tags">
          ${tags.slice(0, 6).map((tag) => `<span class="modal-tag">${escapeHTML(tag)}</span>`).join("")}
        </div>

        <div class="modal-price">
          <span>Precio</span>
          <strong>${product.price == null ? "A consultar" : formatMoney(product.price)}</strong>
        </div>

        <div class="modal-actions">
          <button class="liquid-btn liquid-btn--primary" type="button" data-modal-add="${escapeHTML(product.id)}">
            <span>Agregar al pedido</span>
            <span aria-hidden="true">+</span>
          </button>
          <button class="glass-icon-btn" type="button" data-modal-close aria-label="Cerrar">×</button>
        </div>

        <p class="modal-note">Al finalizar, la página prepara automáticamente el detalle para enviarlo por WhatsApp.</p>
      </div>
    `;

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    state.activeOverlay = "modal";
    lockBody();

    window.setTimeout(() => $("#modalClose")?.focus(), 80);
  }

  function closeModal() {
    const modal = $("#modal");
    if (!modal?.classList.contains("open")) return;

    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    state.activeOverlay = null;
    unlockBodyIfPossible();
  }

  function handleModalAction(event) {
    const addButton = event.target.closest("[data-modal-add]");
    if (addButton) {
      addToCart(addButton.dataset.modalAdd, 1);
      return;
    }

    if (event.target.closest("[data-modal-close]")) closeModal();
  }

  /* ================================================================
     CARRITO
  ================================================================= */
  function renderCart() {
    const container = $("#cartItems");
    const count = $("#cartCount");
    if (!container || !count) return;

    normalizeCart();

    const entries = Object.entries(state.cart)
      .map(([id, quantity]) => ({ product: getProduct(id), quantity }))
      .filter((entry) => entry.product && entry.quantity > 0);

    const totalUnits = entries.reduce((total, entry) => total + entry.quantity, 0);
    count.textContent = String(totalUnits);

    if (entries.length === 0) {
      container.innerHTML = `
        <div class="cart-empty">
          <div>
            <div class="cart-empty__icon">☁</div>
            <strong>Tu pedido está vacío</strong>
            <span>Elegí algo rico del catálogo y agregalo para preparar tu consulta.</span>
          </div>
        </div>
      `;
      updateCartTotals([]);
      return;
    }

    container.innerHTML = entries.map(({ product, quantity }) => cartItemHTML(product, quantity)).join("");
    updateCartTotals(entries);
  }

  function cartItemHTML(product, quantity) {
    return `
      <article class="cart-item">
        <img src="${escapeHTML(product.img)}" alt="${escapeHTML(product.name)}" />
        <div class="cart-item__content">
          <strong class="cart-item__name">${escapeHTML(product.name)}</strong>
          <span class="cart-item__sub">
            ${escapeHTML(niceCategory(product.category))} · ${product.price == null ? "A consultar" : formatMoney(product.price)}
          </span>
          <div class="cart-item__row">
            <div class="qty-control" aria-label="Cantidad">
              <button type="button" data-cart-action="decrease" data-cart-id="${escapeHTML(product.id)}" aria-label="Restar uno">−</button>
              <span>${quantity}</span>
              <button type="button" data-cart-action="increase" data-cart-id="${escapeHTML(product.id)}" aria-label="Sumar uno">+</button>
            </div>
            <button class="remove-item" type="button" data-cart-action="remove" data-cart-id="${escapeHTML(product.id)}">Quitar</button>
          </div>
        </div>
      </article>
    `;
  }

  function handleCartAction(event) {
    const button = event.target.closest("[data-cart-action]");
    if (!button) return;

    const id = button.dataset.cartId;
    const action = button.dataset.cartAction;

    if (action === "increase") addToCart(id, 1, false);
    if (action === "decrease") addToCart(id, -1, false);
    if (action === "remove") removeFromCart(id);
  }

  function handleQuickAdd(event) {
    const button = event.target.closest("[data-quickadd]");
    if (button) addToCart(button.dataset.quickadd, 1);
  }

  function addToCart(id, amount = 1, announce = true) {
    const product = getProduct(id);
    if (!product) return;

    const current = Number(state.cart[id] || 0);
    const next = current + amount;

    if (next <= 0) {
      delete state.cart[id];
    } else {
      state.cart[id] = next;
    }

    saveJSON(STORAGE.cart, state.cart);
    renderCart();
    animateCartBadge();

    if (announce) {
      toast("Agregado al pedido", product.name, "+");
    }
  }

  function removeFromCart(id) {
    const product = getProduct(id);
    delete state.cart[id];
    saveJSON(STORAGE.cart, state.cart);
    renderCart();
    toast("Producto quitado", product?.name || "Pedido actualizado", "−");
  }

  function clearCart() {
    if (Object.keys(state.cart).length === 0) {
      toast("El pedido ya está vacío", "Agregá productos desde el catálogo.", "☁");
      return;
    }

    state.cart = {};
    saveJSON(STORAGE.cart, state.cart);
    renderCart();
    toast("Pedido vaciado", "Podés volver a empezar cuando quieras.", "✓");
  }

  function normalizeCart() {
    Object.keys(state.cart).forEach((id) => {
      const quantity = Math.floor(Number(state.cart[id]));
      if (!getProduct(id) || !Number.isFinite(quantity) || quantity <= 0) {
        delete state.cart[id];
      } else {
        state.cart[id] = quantity;
      }
    });

    saveJSON(STORAGE.cart, state.cart);
  }

  function updateCartTotals(entries) {
    const subtotal = entries.reduce(
      (total, { product, quantity }) => total + Number(product.price || 0) * quantity,
      0
    );
    const shipping = subtotal === 0 || subtotal >= 20000 ? 0 : 1200;
    const total = subtotal + shipping;

    if ($("#cartSubtotal")) $("#cartSubtotal").textContent = formatMoney(subtotal);
    if ($("#cartShipping")) $("#cartShipping").textContent = formatMoney(shipping);
    if ($("#cartTotal")) $("#cartTotal").textContent = formatMoney(total);
  }

  function openDrawer() {
    const drawer = $("#drawer");
    if (!drawer) return;

    closeModal();
    drawer.classList.add("open");
    drawer.setAttribute("aria-hidden", "false");
    state.activeOverlay = "drawer";
    lockBody();

    window.setTimeout(() => $("#btnCloseCart")?.focus(), 80);
  }

  function closeDrawer() {
    const drawer = $("#drawer");
    if (!drawer?.classList.contains("open")) return;

    drawer.classList.remove("open");
    drawer.setAttribute("aria-hidden", "true");
    state.activeOverlay = null;
    unlockBodyIfPossible();
  }

  function checkout() {
    const entries = Object.entries(state.cart)
      .map(([id, quantity]) => ({ product: getProduct(id), quantity }))
      .filter((entry) => entry.product && entry.quantity > 0);

    if (entries.length === 0) {
      toast("Tu pedido está vacío", "Agregá al menos un producto antes de finalizar.", "☁");
      openDrawer();
      return;
    }

    const lines = entries.map(({ product, quantity }) => {
      const price = product.price == null ? "precio a consultar" : formatMoney(product.price);
      return `• ${quantity} x ${product.name} (${price})`;
    });

    const message = [
      "Hola Luisa, quisiera hacer este pedido:",
      "",
      ...lines,
      "",
      "¿Podrías confirmarme disponibilidad, precio final y forma de entrega?",
      "¡Gracias!"
    ].join("\n");

    const number = CONTACT.whatsappNumber || "";
    const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    toast("Pedido preparado", "Se abrió WhatsApp con el detalle completo.", "✓");
  }

  /* ================================================================
     TEMA Y MENÚ
  ================================================================= */
  function toggleTheme() {
    const nextTheme = state.theme === "light" ? "dark" : "light";
    setTheme(nextTheme, true);
  }

  function setTheme(theme, announce = false) {
    state.theme = theme === "dark" ? "dark" : "light";
    document.documentElement.dataset.theme = state.theme;
    localStorage.setItem(STORAGE.theme, state.theme);

    const icon = $("#btnTheme .theme-icon");
    const button = $("#btnTheme");
    const metaTheme = $('meta[name="theme-color"]');

    if (icon) icon.textContent = state.theme === "light" ? "☾" : "☀";
    if (button) button.setAttribute("aria-label", state.theme === "light" ? "Activar tema oscuro" : "Activar tema claro");
    if (metaTheme) metaTheme.content = state.theme === "light" ? "#f7e8e3" : "#20191b";

    if (announce) {
      toast("Apariencia actualizada", state.theme === "light" ? "Tema claro activado." : "Tema oscuro activado.", "◐");
    }
  }

  function toggleMobileMenu() {
    const menu = $("#mobileNav");
    const button = $("#btnMenu");
    if (!menu || !button) return;

    const open = !menu.classList.contains("open");
    menu.classList.toggle("open", open);
    menu.setAttribute("aria-hidden", String(!open));
    button.setAttribute("aria-expanded", String(open));
    button.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
  }

  function closeMobileMenu() {
    const menu = $("#mobileNav");
    const button = $("#btnMenu");
    if (!menu || !button) return;

    menu.classList.remove("open");
    menu.setAttribute("aria-hidden", "true");
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-label", "Abrir menú");
  }

  /* ================================================================
     MOVIMIENTO LIQUID GLASS / 3D
  ================================================================= */
  function setupMotion() {
    refreshInteractiveEffects(document);
    setupHeroParallax();

    if (!hasGSAP || prefersReducedMotion) return;

    if (window.ScrollTrigger) {
      window.gsap.registerPlugin(window.ScrollTrigger);
    }

    const introTimeline = window.gsap.timeline({ defaults: { ease: "power3.out" } });
    introTimeline
      .from(".nav-shell", { y: -22, opacity: 0, duration: 0.65 })
      .from(".hero .eyebrow", { y: 15, opacity: 0, duration: 0.45 }, "-=0.25")
      .from(".hero h1", { y: 30, opacity: 0, duration: 0.72 }, "-=0.25")
      .from(".hero__lead", { y: 22, opacity: 0, duration: 0.55 }, "-=0.4")
      .from(".hero__actions > *", { y: 18, opacity: 0, stagger: 0.07, duration: 0.42 }, "-=0.35")
      .from(".category-pill", { y: 14, opacity: 0, stagger: 0.04, duration: 0.35 }, "-=0.3")
      .from(".micro-card", { y: 18, opacity: 0, stagger: 0.06, duration: 0.42 }, "-=0.24")
      .from("#heroCard", { x: 32, y: 28, opacity: 0, scale: 0.94, duration: 0.82 }, "-=0.92")
      .from(".floating-label, .ingredient", { scale: 0.75, opacity: 0, stagger: 0.07, duration: 0.46 }, "-=0.5");
  }

  function setupScrollEffects() {
    if (!hasGSAP || !window.ScrollTrigger || prefersReducedMotion) return;

    $$(".content-section").forEach((section) => {
      const heading = $(".section-heading", section);
      if (heading) {
        window.gsap.from(heading.children, {
          y: 35,
          opacity: 0,
          stagger: 0.09,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: heading,
            start: "top 84%",
            once: true
          }
        });
      }
    });

    window.gsap.from(".promise-strip__track > div", {
      y: 24,
      opacity: 0,
      stagger: 0.08,
      duration: 0.55,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".promise-strip",
        start: "top 86%",
        once: true
      }
    });

    window.gsap.to(".ambient__beam", {
      yPercent: 18,
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5
      }
    });
  }

  function refreshInteractiveEffects(scope) {
    $$(".tilt-surface", scope).forEach(setupTilt);
    $$(".magnetic", scope).forEach(setupMagnetic);
  }

  function setupTilt(element) {
    if (!hasFinePointer || prefersReducedMotion || tiltedElements.has(element)) return;
    tiltedElements.add(element);

    const strength = Number(element.dataset.tiltStrength || 5);

    element.addEventListener("pointermove", (event) => {
      const rect = element.getBoundingClientRect();
      const relativeX = (event.clientX - rect.left) / rect.width;
      const relativeY = (event.clientY - rect.top) / rect.height;
      const rotateY = (relativeX - 0.5) * strength * 2;
      const rotateX = (0.5 - relativeY) * strength * 2;

      element.style.setProperty("--rx", `${rotateX}deg`);
      element.style.setProperty("--ry", `${rotateY}deg`);
      element.style.setProperty("--glow-x", `${relativeX * 100}%`);
      element.style.setProperty("--glow-y", `${relativeY * 100}%`);

      if (element.id === "heroCard") {
        element.style.transform = `translateX(-50%) perspective(1100px) rotateX(${rotateX}deg) rotateY(${rotateY - 4}deg) translateZ(22px)`;
      }
    });

    element.addEventListener("pointerleave", () => {
      element.style.setProperty("--rx", "0deg");
      element.style.setProperty("--ry", "0deg");

      if (element.id === "heroCard") {
        element.style.transform = "translateX(-50%) rotateY(-5deg) rotateX(2deg) translateZ(22px)";
      }
    });
  }

  function setupMagnetic(element) {
    if (!hasFinePointer || prefersReducedMotion || magneticElements.has(element)) return;
    magneticElements.add(element);

    element.addEventListener("pointermove", (event) => {
      const rect = element.getBoundingClientRect();
      const x = event.clientX - (rect.left + rect.width / 2);
      const y = event.clientY - (rect.top + rect.height / 2);
      element.style.transform = `translate3d(${x * 0.09}px, ${y * 0.09 - 2}px, 0)`;
    });

    element.addEventListener("pointerleave", () => {
      element.style.transform = "";
    });
  }

  function setupHeroParallax() {
    const stage = $("#heroStage");
    if (!stage || !hasFinePointer || prefersReducedMotion) return;

    stage.addEventListener("pointermove", (event) => {
      const rect = stage.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      $$('[data-depth]', stage).forEach((element) => {
        const depth = Number(element.dataset.depth || 20);
        element.style.translate = `${x * depth}px ${y * depth}px`;
      });
    });

    stage.addEventListener("pointerleave", () => {
      $$('[data-depth]', stage).forEach((element) => {
        element.style.translate = "0 0";
      });
    });
  }

  function animateCards() {
    const cards = $$("#productGrid .product-card");
    if (!cards.length) return;

    if (hasGSAP && !prefersReducedMotion) {
      window.gsap.fromTo(
        cards,
        { y: 0, scale: 1 },
        {
          y: -9,
          scale: 1.012,
          duration: 0.28,
          stagger: 0.035,
          yoyo: true,
          repeat: 1,
          ease: "power2.out",
          clearProps: "transform"
        }
      );
      return;
    }

    cards.forEach((card, index) => {
      window.setTimeout(() => {
        card.animate(
          [{ transform: "translateY(0)" }, { transform: "translateY(-8px)" }, { transform: "translateY(0)" }],
          { duration: 450, easing: "ease-out" }
        );
      }, index * 30);
    });
  }

  function animateCartBadge() {
    const badge = $("#cartCount");
    if (!badge) return;

    if (hasGSAP && !prefersReducedMotion) {
      window.gsap.fromTo(badge, { scale: 1 }, { scale: 1.32, duration: 0.16, yoyo: true, repeat: 1, ease: "power2.out" });
      return;
    }

    badge.animate([{ transform: "scale(1)" }, { transform: "scale(1.28)" }, { transform: "scale(1)" }], {
      duration: 320
    });
  }

  function moveCursorLight(event) {
    const light = $("#cursorLight");
    if (!light) return;

    light.style.opacity = "1";
    light.style.left = `${event.clientX}px`;
    light.style.top = `${event.clientY}px`;
  }

  function hideCursorLight() {
    const light = $("#cursorLight");
    if (light) light.style.opacity = "0";
  }

  /* ================================================================
     NAVEGACIÓN ACTIVA Y SCROLL
  ================================================================= */
  function setupActiveNavigation() {
    if (!("IntersectionObserver" in window)) return;

    const sections = ["destacados", "catalogo", "galeria", "contacto"]
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visible) return;
        $$(".desktop-nav a").forEach((link) => {
          link.classList.toggle("is-active", link.getAttribute("href") === `#${visible.target.id}`);
        });
      },
      { rootMargin: "-35% 0px -50%", threshold: [0.05, 0.2, 0.5] }
    );

    sections.forEach((section) => observer.observe(section));
  }

  function scrollToSection(selector) {
    const section = $(selector);
    if (!section) return;
    section.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
  }

  function updateScrollProgress() {
    const progress = $("#scrollProgress");
    if (!progress) return;

    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const percentage = maxScroll > 0 ? Math.min(100, Math.max(0, (window.scrollY / maxScroll) * 100)) : 0;
    progress.style.width = `${percentage}%`;
  }

  /* ================================================================
     TOASTS
  ================================================================= */
  function toast(title, text, icon = "✦") {
    const container = $("#toasts");
    if (!container) return;

    const element = document.createElement("div");
    element.className = "toast";
    element.innerHTML = `
      <span class="toast__icon" aria-hidden="true">${escapeHTML(icon)}</span>
      <span>
        <strong>${escapeHTML(title)}</strong>
        <span>${escapeHTML(text)}</span>
      </span>
    `;

    container.appendChild(element);

    if (hasGSAP && !prefersReducedMotion) {
      window.gsap.fromTo(element, { x: 22, y: 10, opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: 0.32, ease: "power3.out" });
    }

    window.setTimeout(() => {
      if (hasGSAP && !prefersReducedMotion) {
        window.gsap.to(element, { x: 18, opacity: 0, duration: 0.25, ease: "power2.in", onComplete: () => element.remove() });
      } else {
        element.remove();
      }
    }, 2800);
  }

  /* ================================================================
     UTILIDADES
  ================================================================= */
  function getProduct(id) {
    return products.find((product) => product.id === id);
  }

  function niceCategory(category) {
    const categories = {
      "pan-nube": "Pan Nube",
      nubes: "Nubes",
      tortas: "Tortas",
      tartas: "Tartas",
      budines: "Budines",
      salado: "Salado",
      otros: "Otros"
    };

    return categories[category] || category || "Pastelería";
  }

  function formatMoney(value) {
    return Number(value || 0).toLocaleString("es-AR", {
      style: "currency",
      currency: "ARS",
      maximumFractionDigits: 0
    });
  }

  function loadJSON(key, fallback) {
    try {
      const value = JSON.parse(localStorage.getItem(key) || "null");
      return value ?? fallback;
    } catch (error) {
      console.warn(`No se pudo leer ${key} desde localStorage.`, error);
      return fallback;
    }
  }

  function saveJSON(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn(`No se pudo guardar ${key} en localStorage.`, error);
    }
  }

  function lockBody() {
    document.body.classList.add("is-locked");
  }

  function unlockBodyIfPossible() {
    const overlayOpen = $("#drawer")?.classList.contains("open") || $("#modal")?.classList.contains("open");
    if (!overlayOpen) document.body.classList.remove("is-locked");
  }

  function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>'"]/g, (character) => {
      const entities = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "'": "&#039;",
        '"': "&quot;"
      };
      return entities[character];
    });
  }

  function cssEscape(value) {
    if (window.CSS?.escape) return window.CSS.escape(value);
    return String(value).replace(/[^a-zA-Z0-9_-]/g, "\\$&");
  }
})();

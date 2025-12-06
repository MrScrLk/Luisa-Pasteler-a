const PRODUCTS = [
  // PAN NUBES
  {
    id: "pan-nubes-clasicos",
    name: "Pan nubes clásicos",
    category: "pan-nubes",
    unit: "Docena",
    price: 4500,
    cover: "img/pan-nube-1.jpg",
    images: [
      "img/pan-nube-1.jpg",
      "img/pan-nube-2.jpg",
      "img/hero-pan-nubes.JPG"
    ],
    short:
      "Los pan nubes de siempre: suaves, livianos y esponjosos. Ideales para el mate o el café.",
    description:
      "Pan nubes clásicos recién horneados, perfectos para desayunos, meriendas y bandejas para compartir. Se pueden congelar y regenerar en horno o airfryer."
  },
  {
    id: "pan-nubes-surtidos",
    name: "Pan nubes surtidos",
    category: "pan-nubes",
    unit: "Bandeja",
    price: 6800,
    cover: "img/hero-pan-nubes.JPG",
    images: [
      "img/hero-pan-nubes.JPG",
      "img/Nubes-simple-1.jpeg",
      "img/Nubes-especiados-1.jpeg",
      "img/Nubes-Cacao-dulces-1.jpeg"
    ],
    short:
      "Combinación de dulces y salados en una misma bandeja. Ideal para eventos y reuniones.",
    description:
      "Bandejas armadas a medida con variedades de nubes simples, especiados, dulces y especiales. Consultá por combinaciones según la ocasión."
  },
  {
    id: "nubes-cacao",
    name: "Nubes dulces sabor cacao",
    category: "pan-nubes",
    unit: "Docena",
    price: 4900,
    cover: "img/Nubes-Cacao-dulces-1.jpeg",
    images: [
      "img/Nubes-Cacao-dulces-1.jpeg",
      "img/Nubes-Cacao-dulces-2.jpeg",
      "img/Nubes-Cacao-dulces-3.jpeg",
      "img/Nubes-Cacao-dulces-4.jpeg"
    ],
    short:
      "Versión dulce de los pan nubes con cacao. Livianos y perfectos para café o mate.",
    description:
      "Nubes dulces con cacao, suaves por dentro y con un sabor equilibrado. Se pueden combinar con otras variedades dulces."
  },
  {
    id: "nubes-coco",
    name: "Nubes dulces sabor coco",
    category: "pan-nubes",
    unit: "Docena",
    price: 4900,
    cover: "img/Nubes-coco-1.jpeg",
    images: [
      "img/Nubes-coco-1.jpeg",
      "img/Nubes-coco-2.jpeg",
      "img/Nubes-coco-3.jpeg"
    ],
    short:
      "Aromáticos y suaves, con un toque de coco ideal para meriendas.",
    description:
      "Nubes dulces con coco rallado. Livianos, ideales para bandejas dulces o para un antojo de media tarde."
  },
  {
    id: "nubes-naranja",
    name: "Nubes dulces sabor naranja",
    category: "pan-nubes",
    unit: "Docena",
    price: 4900,
    cover: "img/Nubes-naranja-1.jpeg",
    images: [
      "img/Nubes-naranja-1.jpeg",
      "img/Nubes-naranja-2.jpeg"
    ],
    short:
      "Toque cítrico suave y muy fresco. Ideal con té o café.",
    description:
      "Nubes dulces sabor naranja. Perfectos para combinar con coco o cacao."
  },
  {
    id: "nubes-semillas",
    name: "Nubes con semillas",
    category: "pan-nubes",
    unit: "Docena",
    price: 5200,
    cover: "img/Nubes-semillas-1.jpeg",
    images: [
      "img/Nubes-semillas-1.jpeg",
      "img/Nubes-semillas-2.jpeg",
      "img/Nubes-semillas-3.jpeg",
      "img/Nubes-semillas-4.jpeg"
    ],
    short:
      "Opción distinta y más rústica con mezcla de semillas.",
    description:
      "Pan nubes con semillas, ideales para quienes buscan una alternativa con textura y sabor diferenciados."
  },
  {
    id: "nubes-harina-almendra",
    name: "Nubes con harina de almendra",
    category: "pan-nubes",
    unit: "Docena",
    price: 5800,
    cover: "img/nubes-harina-almendra-1.jpeg",
    images: [
      "img/nubes-harina-almendra-1.jpeg",
      "img/nubes-harina-almendra-2.jpeg",
      "img/nubes-harina-almendra-3.jpeg",
      "img/nubes-harina-almendra-4.jpeg"
    ],
    short:
      "Hechos con harina de almendra. Variante especial y muy pedida.",
    description:
      "Nubes con harina de almendra para quienes buscan opciones con harinas alternativas."
  },
  {
    id: "nubes-simples",
    name: "Nubes simples",
    category: "pan-nubes",
    unit: "Docena",
    price: 4300,
    cover: "img/Nubes-simple-1.jpeg",
    images: [
      "img/Nubes-simple-1.jpeg",
      "img/Nubes-simple-2.jpeg",
      "img/Nubes-simple-3.jpeg",
      "img/Nubes-simple-4.jpeg",
      "img/Nubes-simple-5.jpeg",
      "img/Nubes-simple-6.jpeg"
    ],
    short:
      "La base de todas las variedades: neutros, suaves y súper versátiles.",
    description:
      "Nubes simples perfectos para combinar con dulce o salado y armar bandejas a medida."
  },
  {
    id: "nubes-especiados",
    name: "Nubes especiados (orégano/queso/pizza)",
    category: "pan-nubes",
    unit: "Bandeja",
    price: 7900,
    cover: "img/Nubes-especiados-1.jpeg",
    images: [
      "img/Nubes-especiados-1.jpeg",
      "img/Nubes-especiados-2.jpeg",
      "img/Nubes-especiados-3.jpeg",
      "img/Nubes-especiados-4.jpeg"
    ],
    short:
      "Nubes salados saborizados ideales para picadas y mesas saladas.",
    description:
      "Variedades especiadas con perfiles tipo orégano, queso y pizza. Gran opción para eventos."
  },
  {
    id: "nubes-pata",
    name: "Nubes para pata y picadas",
    category: "pan-nubes",
    unit: "Bandeja",
    price: 7500,
    cover: "img/Nubes-Pata-1.jpeg",
    images: [
      "img/Nubes-Pata-1.jpeg",
      "img/Nubes-Pata-2.jpeg",
      "img/Nubes-Pata-3.jpeg",
      "img/Nubes-Pata-4.jpeg",
      "img/Nubes-Pata-5.jpeg",
      "img/Nubes-Pata-6.jpeg",
      "img/Nubes-Pata-7.jpeg"
    ],
    short:
      "Pensados para acompañar pata, fiambres y grandes reuniones.",
    description:
      "Bandejas de nubes salados para eventos. Se arman según cantidad de invitados."
  },
  {
    id: "nubes-lomo",
    name: "Nubes lomo",
    category: "pan-nubes",
    unit: "Bandeja",
    price: 8200,
    cover: "img/Nubes-lomo-1.jpeg",
    images: [
      "img/Nubes-lomo-1.jpeg",
      "img/Nubes-lomo-2.jpeg",
      "img/Nubes-lomo-3.jpeg"
    ],
    short:
      "Nubes pensados para sándwiches de lomo y rellenos salados.",
    description:
      "Textura suave pero firme para sostener rellenos. Ideal para eventos."
  },

  // DULCES
  {
    id: "budines-saludables",
    name: "Budines saludables",
    category: "dulce",
    unit: "Unidad",
    price: 3800,
    cover: "img/budines-saludables-1.jpeg",
    images: [
      "img/budines-saludables-1.jpeg",
      "img/budines-saludables-2.jpeg",
      "img/budines-saludables-3.jpeg",
      "img/budines-saludables-4.jpeg",
      "img/budines-saludables-5.jpeg",
      "img/budines-saludables-6.jpeg"
    ],
    short:
      "Sin harina de trigo y sin azúcar refinada. Con harinas alternativas.",
    description:
      "Budines pensados para quienes buscan algo rico y más liviano, con variantes de almendra o nuez."
  },
  {
    id: "cheesecake",
    name: "Cheesecake",
    category: "dulce",
    unit: "Torta",
    price: 15000,
    cover: "img/Cheesecake-1.jpeg",
    images: ["img/Cheesecake-1.jpeg"],
    short:
      "Cremoso, clásico y perfecto para celebraciones.",
    description:
      "Cheesecake con base de galletas y cobertura a elección."
  },
  {
    id: "tarta-frutillas",
    name: "Tarta de frutillas",
    category: "dulce",
    unit: "Tarta",
    price: 14000,
    cover: "img/Tarta-frutillas-1.jpeg",
    images: [
      "img/Tarta-frutillas-1.jpeg",
      "img/Tarta-frutillas-2.jpeg"
    ],
    short:
      "Base crocante, crema suave y frutillas frescas.",
    description:
      "Un clásico ideal para meriendas y celebraciones."
  },
  {
    id: "tarta-peras-almendras",
    name: "Tarta de peras y almendras",
    category: "dulce",
    unit: "Tarta",
    price: 15000,
    cover: "img/tarta-peras-almendras-1.jpeg",
    images: ["img/tarta-peras-almendras-1.jpeg"],
    short:
      "Rústica, elegante y con sabor delicado.",
    description:
      "Peras frescas + crema de almendras. Ideal para una merienda especial."
  },
  {
    id: "torta-harina-nuez",
    name: "Torta con harina de nuez",
    category: "dulce",
    unit: "Torta",
    price: 18000,
    cover: "img/torta-harina-nuez-1.jpeg",
    images: [
      "img/torta-harina-nuez-1.jpeg",
      "img/torta-harina-nuez-2.jpeg",
      "img/torta-harina-nuez-3.jpeg",
      "img/torta-harina-nuez-4.jpeg"
    ],
    short:
      "Sabor intenso para amantes de los frutos secos.",
    description:
      "Bizcocho húmedo y aromático, ideal para celebraciones."
  },
  {
    id: "torta-selvanegra",
    name: "Torta selvanegra",
    category: "dulce",
    unit: "Torta",
    price: 19000,
    cover: "img/Torta-selvanegra-1.jpeg",
    images: ["img/Torta-selvanegra-1.jpeg"],
    short:
      "Clásica, elegante y deliciosa.",
    description:
      "Capas de bizcochuelo, crema y frutas. Ideal para ocasiones especiales."
  },
  {
    id: "torta-cumple",
    name: "Torta de cumpleaños",
    category: "dulce",
    unit: "Torta",
    price: 20000,
    cover: "img/torta-1.JPG",
    images: ["img/torta-1.JPG"],
    short:
      "Personalizadas a pedido: sabores, rellenos y decoración.",
    description:
      "Diseños simples o elaborados según la ocasión."
  },
  {
    id: "facturas",
    name: "Medialunas y facturas",
    category: "dulce",
    unit: "Docena",
    price: 5200,
    cover: "img/facturas-1.JPG",
    images: ["img/facturas-1.JPG"],
    short:
      "Bandejas surtidas para desayunos y reuniones.",
    description:
      "Consultá por variedades disponibles."
  },
  {
    id: "mesa-dulce",
    name: "Mesa dulce para eventos",
    category: "dulce",
    unit: "Servicio",
    price: 30000,
    cover: "img/mesa-dulce-1.JPG",
    images: ["img/mesa-dulce-1.JPG"],
    short:
      "Armada a medida según invitados y presupuesto.",
    description:
      "Incluye mini postres, tartas, shots dulces y más."
  },
  {
    id: "pepas-scones",
    name: "Pepas y scones",
    category: "dulce",
    unit: "Bandeja",
    price: 4800,
    cover: "img/Pepas-scones-1.jpeg",
    images: ["img/Pepas-scones-1.jpeg"],
    short:
      "Ideal para mate o café.",
    description:
      "Bandejas surtidas a pedido."
  },

  // SALADOS
  {
    id: "chipa",
    name: "Chipa misionera",
    category: "salado",
    unit: "Docena",
    price: 4800,
    cover: "img/chipa-1.JPG",
    images: ["img/chipa-1.JPG"],
    short:
      "Suave, con mucho queso. Perfecta para picadas.",
    description:
      "Estilo misionero, ideal para acompañar el mate."
  },
  {
    id: "focaccias",
    name: "Focaccias caseras",
    category: "salado",
    unit: "Bandeja",
    price: 9500,
    cover: "img/Focaccias-1.jpeg",
    images: [
      "img/Focaccias-1.jpeg",
      "img/Focaccias-2.jpeg",
      "img/Focaccias-3.jpeg",
      "img/Focaccias-4.jpeg",
      "img/Focaccias-5.jpeg"
    ],
    short:
      "Esponjosas con aceite de oliva, hierbas y toppings.",
    description:
      "Ideales para picadas y mesas saladas."
  },
  {
    id: "scones-salados",
    name: "Scones salados",
    category: "salado",
    unit: "Docena",
    price: 4200,
    cover: "img/scones-1.JPG",
    images: ["img/scones-1.JPG"],
    short:
      "Para picadas, sopas y meriendas distintas.",
    description:
      "Se pueden combinar con chipa y nubes salados."
  }
];

// ==============================
//  Helpers
// ==============================
const money = (n) =>
  new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(n);

const byId = (id) => document.getElementById(id);

// ==============================
//  Render Cards
// ==============================
function productCardHTML(p) {
  return `
    <article class="card catalog-item" data-category="${p.category}">
      <div class="card-img-wrapper">
        <img src="${p.cover}" alt="${p.name}" loading="lazy" />
        <div class="card-pill">${labelCategory(p.category)}</div>
      </div>
      <div class="card-body">
        <h3 class="card-title">${p.name}</h3>
        <p class="card-text">${p.short}</p>

        <div class="card-meta-row">
          <span>${p.unit}</span>
          <span class="price">${money(p.price)} <em style="font-weight:400">(ejemplo)</em></span>
        </div>

        <button
          class="btn-add"
          type="button"
          data-add-to-cart="${p.id}"
        >
          <span>+</span> Agregar al carrito
        </button>

        <button
          class="btn-detail"
          type="button"
          data-open-product="${p.id}"
        >
          Ver más fotos y detalles
        </button>
      </div>
    </article>
  `;
}

function labelCategory(cat){
  if(cat === "pan-nubes") return "Pan nubes";
  if(cat === "dulce") return "Dulce";
  if(cat === "salado") return "Salado";
  return "Producto";
}

function renderCatalog() {
  const grid = byId("catalog-grid");
  if (!grid) return;

  grid.innerHTML = PRODUCTS.map(productCardHTML).join("");
}

function renderHomeFeatured() {
  const grid = byId("home-feature-grid");
  if (!grid) return;

  // destacados: se eligen algunos representativos
  const featuredIds = [
    "pan-nubes-clasicos",
    "nubes-cacao",
    "nubes-especiados",
    "focaccias",
    "cheesecake",
    "chipa"
  ];
  const featured = PRODUCTS.filter(p => featuredIds.includes(p.id));

  grid.innerHTML = featured.map(productCardHTML).join("");
}

// ==============================
//  Modal
// ==============================
function buildModalHTML(p){
  const imgs = (p.images && p.images.length ? p.images : [p.cover])
    .map(src => `<img src="${src}" alt="${p.name}" loading="lazy" />`)
    .join("");

  return `
    <h2 class="modal-title">${p.name}</h2>
    <p class="modal-sub">${p.description || p.short}</p>

    <div class="modal-meta">
      <span><strong>Categoría:</strong> ${labelCategory(p.category)}</span>
      <span><strong>Unidad:</strong> ${p.unit}</span>
      <span><strong>Precio:</strong> ${money(p.price)} <em>(ejemplo)</em></span>
    </div>

    <div class="modal-actions">
      <button class="btn-add" type="button" data-add-to-cart="${p.id}">
        <span>+</span> Agregar al carrito
      </button>
      <button class="btn-ghost" type="button" id="modal-close-ghost">
        Cerrar
      </button>
    </div>

    <div class="product-gallery">
      ${imgs}
    </div>
  `;
}

function setupModal(){
  const backdrop = byId("product-modal-backdrop");
  const content = byId("product-modal-content");
  const closeBtn = byId("close-product-modal");
  if (!backdrop || !content || !closeBtn) return;

  function open(id){
    const p = PRODUCTS.find(x => x.id === id);
    if (!p) return;
    content.innerHTML = buildModalHTML(p);
    backdrop.classList.add("is-visible");

    // cerrar secundario
    const ghost = byId("modal-close-ghost");
    if(ghost) ghost.onclick = close;

    // botón add dentro del modal
    content.querySelectorAll("[data-add-to-cart]").forEach(btn=>{
      btn.addEventListener("click", () => addToCart(btn.getAttribute("data-add-to-cart")));
    });
  }

  function close(){
    backdrop.classList.remove("is-visible");
    content.innerHTML = "";
  }

  closeBtn.addEventListener("click", close);
  backdrop.addEventListener("click", (e) => {
    if (e.target === backdrop) close();
  });

  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-open-product]");
    if (!btn) return;
    const id = btn.getAttribute("data-open-product");
    open(id);
  });
}

// ==============================
//  Filters
// ==============================
function setupFilters(){
  const chips = document.querySelectorAll(".chip[data-filter]");
  const grid = byId("catalog-grid");
  if (!chips.length || !grid) return;

  chips.forEach(chip => {
    chip.addEventListener("click", () => {
      chips.forEach(c => c.classList.remove("active"));
      chip.classList.add("active");

      const filter = chip.getAttribute("data-filter");
      const cards = grid.querySelectorAll(".catalog-item");
      cards.forEach(card => {
        const cat = card.getAttribute("data-category");
        const show = filter === "all" || filter === cat;
        card.style.display = show ? "" : "none";
      });
    });
  });
}

// ==============================
//  Cart
// ==============================
const CART_KEY = "luisa_cart_v1";
let cart = loadCart();

function loadCart(){
  try{
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  }catch{
    return [];
  }
}

function saveCart(){
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function findProduct(id){
  return PRODUCTS.find(p => p.id === id);
}

function addToCart(id){
  const p = findProduct(id);
  if (!p) return;

  const item = cart.find(i => i.id === id);
  if(item) item.qty += 1;
  else cart.push({ id, qty: 1 });

  saveCart();
  renderCartUI();
}

function removeFromCart(id){
  cart = cart.filter(i => i.id !== id);
  saveCart();
  renderCartUI();
}

function changeQty(id, delta){
  const item = cart.find(i => i.id === id);
  if(!item) return;
  item.qty += delta;
  if(item.qty <= 0) removeFromCart(id);
  saveCart();
  renderCartUI();
}

function clearCart(){
  cart = [];
  saveCart();
  renderCartUI();
}

function cartTotal(){
  return cart.reduce((acc, i) => {
    const p = findProduct(i.id);
    return acc + (p ? p.price * i.qty : 0);
  }, 0);
}

function cartCount(){
  return cart.reduce((acc, i) => acc + i.qty, 0);
}

function renderCartUI(){
  const countEl = byId("cart-count");
  const itemsEl = byId("cart-items");
  const emptyEl = byId("cart-empty");
  const totalEl = byId("cart-total");

  if(countEl) countEl.textContent = String(cartCount());
  if(totalEl) totalEl.textContent = money(cartTotal());

  if(!itemsEl || !emptyEl) return;

  if(cart.length === 0){
    itemsEl.innerHTML = "";
    emptyEl.style.display = "block";
    return;
  }

  emptyEl.style.display = "none";

  itemsEl.innerHTML = cart.map(i => {
    const p = findProduct(i.id);
    if(!p) return "";
    const line = p.price * i.qty;

    return `
      <div class="cart-item">
        <div>
          <h5>${p.name}</h5>
          <small>${p.unit} · ${money(p.price)} (ejemplo)</small>
          <div class="cart-qty">
            <button class="qty-btn" data-qty-minus="${p.id}">-</button>
            <strong>${i.qty}</strong>
            <button class="qty-btn" data-qty-plus="${p.id}">+</button>
            <small style="margin-left:8px">${money(line)}</small>
          </div>
        </div>
        <div>
          <button class="icon-btn" title="Quitar" data-remove="${p.id}">🗑️</button>
        </div>
      </div>
    `;
  }).join("");

  // bind actions
  itemsEl.querySelectorAll("[data-qty-minus]").forEach(btn=>{
    btn.addEventListener("click", ()=> changeQty(btn.getAttribute("data-qty-minus"), -1));
  });
  itemsEl.querySelectorAll("[data-qty-plus]").forEach(btn=>{
    btn.addEventListener("click", ()=> changeQty(btn.getAttribute("data-qty-plus"), +1));
  });
  itemsEl.querySelectorAll("[data-remove]").forEach(btn=>{
    btn.addEventListener("click", ()=> removeFromCart(btn.getAttribute("data-remove")));
  });
}

// open/close cart
function setupCartPanel(){
  const panel = byId("cart-panel");
  const overlay = byId("overlay");
  const openBtn = byId("open-cart");
  const closeBtn = byId("close-cart");
  const clearBtn = byId("clear-cart");
  const wspBtn = byId("send-wsp");

  if(!panel || !overlay || !openBtn) return;

  function open(){
    panel.classList.add("is-visible");
    overlay.classList.add("is-visible");
    panel.setAttribute("aria-hidden", "false");
  }
  function close(){
    panel.classList.remove("is-visible");
    overlay.classList.remove("is-visible");
    panel.setAttribute("aria-hidden", "true");
  }

  openBtn.addEventListener("click", open);
  overlay.addEventListener("click", close);
  if(closeBtn) closeBtn.addEventListener("click", close);
  if(clearBtn) clearBtn.addEventListener("click", clearCart);

  if(wspBtn){
    wspBtn.addEventListener("click", () => {
      if(cart.length === 0){
        alert("Tu carrito está vacío.");
        return;
      }

      // REEMPLAZAR CON MI NUMERO REAL
      const phone = "549XXXXXXXXXX";

      const lines = cart.map(i => {
        const p = findProduct(i.id);
        if(!p) return "";
        return `• ${p.name} x${i.qty} (${p.unit})`;
      }).filter(Boolean);

      const text =
        `Hola! Quisiera hacer un pedido:%0A` +
        lines.join("%0A") +
        `%0A%0ATotal estimado: ${encodeURIComponent(money(cartTotal()))}` +
        `%0A%0A(Precios de ejemplo, confirmar disponibilidad y valor final)`;

      const url = `https://wa.me/${phone}?text=${text}`;
      window.open(url, "_blank");
    });
  }
}

// global add-to-cart clicks
function setupAddButtons(){
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-add-to-cart]");
    if(!btn) return;
    const id = btn.getAttribute("data-add-to-cart");
    addToCart(id);
  });
}

// ==============================
//  Init
// ==============================
document.addEventListener("DOMContentLoaded", () => {
  renderCatalog();
  renderHomeFeatured();
  setupFilters();
  setupModal();

  setupAddButtons();
  setupCartPanel();
  renderCartUI();
});

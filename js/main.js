document.addEventListener("DOMContentLoaded", () => {
  setupBackToTop();
  setupCatalogFilters();
  setupProductModal();
});

function setupBackToTop() {
  const btn = document.getElementById("back-to-top");
  if (!btn) return;

  const toggle = () => {
    if (window.scrollY > 280) {
      btn.classList.add("fab--visible");
    } else {
      btn.classList.remove("fab--visible");
    }
  };

  toggle();
  window.addEventListener("scroll", toggle);

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

function setupCatalogFilters() {
  const container = document.querySelector("[data-filter-container]");
  if (!container) return;

  const buttons = Array.from(
    container.querySelectorAll("[data-filter]")
  );
  const items = Array.from(
    document.querySelectorAll(".catalog-item[data-category]")
  );

  const applyFilter = (filter) => {
    items.forEach((item) => {
      const cat = item.getAttribute("data-category");
      const show = filter === "todos" || filter === cat;
      item.style.display = show ? "" : "none";
    });
  };

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.getAttribute("data-filter") || "todos";
      applyFilter(filter);
    });
  });

  // filtro inicial
  applyFilter("todos");
}

function setupProductModal() {
  const backdrop = document.getElementById("product-modal-backdrop");
  const content = document.getElementById("product-modal-content");
  if (!backdrop || !content) return;

  const templatesRoot = document.querySelector(".product-templates");
  if (!templatesRoot) return;

  const openButtons = document.querySelectorAll("[data-open-product]");
  const closeBtn = document.getElementById("close-product-modal");

  const openModal = (templateId) => {
    const tpl = templatesRoot.querySelector("#detalle-" + templateId);
    if (!tpl) return;
    content.innerHTML = tpl.innerHTML;
    backdrop.classList.add("is-open");
  };

  const closeModal = () => {
    backdrop.classList.remove("is-open");
    content.innerHTML = "";
  };

  openButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const key = btn.getAttribute("data-open-product");
      if (key) {
        openModal(key);
      }
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", closeModal);
  }

  backdrop.addEventListener("click", (ev) => {
    if (ev.target === backdrop) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (ev) => {
    if (ev.key === "Escape" && backdrop.classList.contains("is-open")) {
      closeModal();
    }
  });
}

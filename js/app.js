// ============================================
// GEEK STORE - E-commerce JavaScript
// ============================================

// Base de datos de productos (simulada)
const products = [
  {
    id: 1, 
    name: "Taza Geek", 
    price: 5000, 
    img: "img/taza.png",
    description: "La taza definitiva para desarrolladores con sentido del humor y buen gusto por el café. \"En caso de fuego: git commit, git push, salga del edificio\" — porque incluso en emergencias, el código va primero.",
    features: "• Cerámica blanca con diseño impreso de alta calidad\n• Apta para café, té o lágrimas de debugging\n• Ideal para escritorio, oficina o bunker de deploy",
    status: "Lista para salvar tu día (y tu repo)"
  },
  {
    id: 2, 
    name: "Polera React", 
    price: 12000, 
    img: "img/polera404.png",
    description: "¿Te sientes fuera de servicio? Esta polera negra lo dice todo por ti: \"Error 404, Lo siento, no estoy disponible\" — ideal para esos días en que tu energía está en mantenimiento.",
    features: "• Tela suave y cómoda, perfecta para programadores, estudiantes y humanos en modo off\n• Letras blancas en tipografía clara, para que el mensaje se lea incluso en modo oscuro\n• Disponible en tallas ficticias: XS (Extra Saturado), M (Modo Silencio), XL (Extremadamente Libre)",
    status: "No disponible emocionalmente, pero sí en stock"
  },
  {
    id: 3, 
    name: "Sticker Bootcamp", 
    price: 2000, 
    img: "img/stickers.png",
    description: "¡Decora tu laptop, cuaderno o alma con estos stickers vibrantes! Frases como \"Bootcamp Power\", \"Code Mode ON\" y \"Keep Calm and Debug\" para que tu entorno grite: \"¡Estoy aprendiendo y no me detengo!\"",
    features: "• Pack de 3 stickers redondos, resistentes al agua y al drama\n• Colores llamativos y diseño moderno\n• Se adhieren a cualquier superficie (menos a tus excusas)",
    status: "Pegajosos y motivadores"
  }
];

// Inicializar carrito desde localStorage o crear uno vacío
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ============================================
// FUNCIONES DE RENDERIZADO
// ============================================

// Renderizar productos en Home (index.html)
function renderProducts() {
  const list = document.getElementById("product-list");
  if (!list) return;
  list.innerHTML = products.map(p => `
    <div class="col-md-4 mb-4">
      <div class="card h-100">
        <a href="product.html?id=${p.id}" class="text-decoration-none" style="cursor: pointer;">
          <img src="${p.img}" class="card-img-top product-image" alt="${p.name}" title="Click para ver más detalles">
        </a>
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${p.name}</h5>
          <p class="card-text fw-bold text-success">$${p.price.toLocaleString('es-CL')}</p>
          <div class="mt-auto d-grid gap-2">
            <a href="product.html?id=${p.id}" class="btn btn-outline-secondary">Ver más</a>
            <button class="btn btn-primary" onclick="addToCart(${p.id})">Agregar al carrito</button>
          </div>
        </div>
      </div>
    </div>
  `).join("");
}

// Renderizar detalle de producto (product.html)
function renderProductDetail() {
  const container = document.getElementById("product-detail");
  if (!container) return;

  // Obtener ID del producto desde la URL
  const params = new URLSearchParams(window.location.search);
  const productId = parseInt(params.get("id"));
  const product = products.find(p => p.id === productId);

  // Validar si el producto existe
  if (!product) {
    container.innerHTML = "<p class='alert alert-warning'>Producto no encontrado.</p>";
    return;
  }

  // Renderizar información del producto
  container.innerHTML = `
    <div class="col-lg-8">
      <div class="card">
        <div class="row g-0">
          <div class="col-md-6">
            <img src="${product.img}" class="img-fluid rounded-start p-3" alt="${product.name}">
          </div>
          <div class="col-md-6">
            <div class="card-body">
              <h2 class="card-title mb-3">${product.name}</h2>
              <h4 class="text-success mb-3">$${product.price.toLocaleString('es-CL')}</h4>
              
              <h5 class="mt-4">Descripción:</h5>
              <p class="card-text">${product.description}</p>
              
              <h5 class="mt-4">Características:</h5>
              <p class="card-text" style="white-space: pre-line;">${product.features}</p>
              
              <p class="card-text mt-4"><small class="text-muted"><strong>Estado:</strong> ${product.status}</small></p>
              
              <div class="d-grid gap-2 mt-4">
                <button class="btn btn-primary btn-lg" onclick="addToCart(${product.id})">
                  <i class="bi bi-cart-plus"></i> Agregar al carrito
                </button>
                <a href="index.html" class="btn btn-outline-secondary">
                  <i class="bi bi-arrow-left"></i> Volver al catálogo
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// ============================================
// FUNCIONES DEL CARRITO
// ============================================

// Agregar producto al carrito
function addToCart(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;
  
  // Buscar si el producto ya existe en el carrito
  const existingItem = cart.find(item => item.id === id);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  
  // Mostrar feedback al usuario
  showCartFeedback(product.name);
}

// Mostrar mensaje de confirmación
function showCartFeedback(productName) {
  const existingAlert = document.querySelector('.cart-alert');
  if (existingAlert) existingAlert.remove();
  
  const alert = document.createElement('div');
  alert.className = 'alert alert-success alert-dismissible fade show cart-alert position-fixed top-0 start-50 translate-middle-x mt-5';
  alert.style.zIndex = '9999';
  alert.innerHTML = `
    <strong>¡Agregado!</strong> ${productName} se agregó al carrito.
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
  `;
  document.body.appendChild(alert);
  
  setTimeout(() => alert.remove(), 3000);
}

// Aumentar cantidad de un producto en el carrito
function increaseQuantity(id) {
  const item = cart.find(item => item.id === id);
  if (item) {
    item.quantity += 1;
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
    updateCartCount();
  }
}

// Disminuir cantidad de un producto en el carrito
function decreaseQuantity(id) {
  const item = cart.find(item => item.id === id);
  if (item && item.quantity > 1) {
    item.quantity -= 1;
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
    updateCartCount();
  }
}

// Eliminar producto del carrito
function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
  updateCartCount();
}

// Vaciar todo el carrito
function clearCart() {
  if (confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
    updateCartCount();
  }
}

// Actualizar contador del carrito en navbar
function updateCartCount() {
  const count = document.getElementById("cart-count");
  if (count) {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    count.textContent = totalItems;
  }
}

// Calcular total del carrito
function calculateTotal() {
  return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

// Mostrar items del carrito (cart.html)
function renderCart() {
  const list = document.getElementById("cart-items");
  if (!list) return;
  
  if (cart.length === 0) {
    list.innerHTML = `
      <li class="list-group-item text-center py-5">
        <i class="bi bi-cart-x fs-1 text-muted"></i>
        <p class="mt-3 text-muted">Tu carrito está vacío</p>
        <a href="index.html" class="btn btn-primary mt-2">Ir a comprar</a>
      </li>
    `;
    document.getElementById("cart-total").innerHTML = '';
    return;
  }
  
  list.innerHTML = cart.map(item => `
    <li class="list-group-item">
      <div class="row align-items-center">
        <div class="col-md-2">
          <img src="${item.img}" alt="${item.name}" class="img-fluid rounded" style="max-height: 80px;">
        </div>
        <div class="col-md-3">
          <h6 class="mb-0">${item.name}</h6>
        </div>
        <div class="col-md-2">
          <span class="text-success fw-bold">$${item.price.toLocaleString('es-CL')}</span>
        </div>
        <div class="col-md-3">
          <div class="btn-group" role="group">
            <button class="btn btn-sm btn-outline-secondary" onclick="decreaseQuantity(${item.id})">-</button>
            <button class="btn btn-sm btn-outline-secondary" disabled>${item.quantity}</button>
            <button class="btn btn-sm btn-outline-secondary" onclick="increaseQuantity(${item.id})">+</button>
          </div>
        </div>
        <div class="col-md-2 text-end">
          <button class="btn btn-sm btn-danger" onclick="removeFromCart(${item.id})">
            <i class="bi bi-trash"></i> Eliminar
          </button>
        </div>
      </div>
    </li>
  `).join("");
  
  // Mostrar total
  const total = calculateTotal();
  const totalContainer = document.getElementById("cart-total");
  if (totalContainer) {
    totalContainer.innerHTML = `
      <div class="card mt-4">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h5 class="mb-0">Total:</h5>
            <h3 class="mb-0 text-success">$${total.toLocaleString('es-CL')}</h3>
          </div>
          <div class="d-grid gap-2">
            <button class="btn btn-success btn-lg">Proceder al pago</button>
            <button class="btn btn-outline-danger" onclick="clearCart()">Vaciar carrito</button>
            <a href="index.html" class="btn btn-outline-secondary">Seguir comprando</a>
          </div>
        </div>
      </div>
    `;
  }
}

// ============================================
// INICIALIZACIÓN
// ============================================

// Ejecutar funciones al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();       // Renderizar catálogo (si existe)
  renderCart();           // Renderizar carrito (si existe)
  renderProductDetail();  // Renderizar detalle (si existe)
  updateCartCount();      // Actualizar contador
});
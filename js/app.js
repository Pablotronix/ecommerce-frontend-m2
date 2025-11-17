const products = [
  {id:1, name:"Taza Geek", price:5000, img:"img/taza.png"},
  {id:2, name:"Polera React", price:12000, img:"img/polera404.png"},
  {id:3, name:"Sticker Bootcamp", price:2000, img:"img/stickers.png"}
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Renderizar productos en Home
function renderProducts() {
  const list = document.getElementById("product-list");
  if (!list) return;
  list.innerHTML = products.map(p => `
    <div class="col-md-4 mb-3">
      <div class="card">
        <img src="${p.img}" class="card-img-top" alt="${p.name}">
        <div class="card-body">
          <h5 class="card-title">${p.name}</h5>
          <p class="card-text">$${p.price}</p>
          <button class="btn btn-primary" onclick="addToCart(${p.id})">Agregar al carrito</button>
        </div>
      </div>
    </div>
  `).join("");
}

// Renderizar detalle de producto
function renderProductDetail() {
  const container = document.getElementById("product-detail");
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const productId = parseInt(params.get("id"));
  const product = products.find(p => p.id === productId);

  if (!product) {
    container.innerHTML = "<p>Producto no encontrado.</p>";
    return;
  }

  container.innerHTML = `
    <div class="col-md-6">
      <div class="card">
        <img src="${product.img}" class="card-img-top" alt="${product.name}">
        <div class="card-body">
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text">$${product.price}</p>
          <p class="card-text">Descripción: Producto geek exclusivo para tu colección.</p>
          <button class="btn btn-primary" onclick="addToCart(${product.id})">Agregar al carrito</button>
        </div>
      </div>
    </div>
  `;
}

// Agregar al carrito
function addToCart(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

// Actualizar contador
function updateCartCount() {
  const count = document.getElementById("cart-count");
  if (count) count.textContent = cart.length;
}

// Mostrar carrito
function renderCart() {
  const list = document.getElementById("cart-items");
  if (!list) return;
  list.innerHTML = cart.map(p => `<li class="list-group-item">${p.name} - $${p.price}</li>`).join("");
}

// Inicialización
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  renderCart();
  renderProductDetail();
  updateCartCount();
});
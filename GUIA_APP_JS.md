# 💻 Guía Detallada: app.js (JavaScript)

## Estructura Completa Comentada

```javascript
// ============================================
// GEEK STORE - E-commerce JavaScript
// ============================================
// Este archivo contiene toda la lógica de la aplicación:
// - Renderizado dinámico de productos
// - Gestión del carrito de compras
// - Interacción con localStorage
// - Manipulación del DOM

// ============================================
// BASE DE DATOS DE PRODUCTOS (SIMULADA)
// ============================================

const products = [
  // ARRAY: Lista ordenada de objetos
  // const: Variable constante (no se puede reasignar)
  
  {
    // OBJETO: Conjunto de pares clave-valor
    // Cada objeto representa un producto
    
    id: 1,                    // Identificador único (number)
    name: "Taza Geek",        // Nombre del producto (string)
    price: 5000,              // Precio en pesos (number)
    img: "img/taza.png",      // Ruta de la imagen (string)
    
    // Descripción completa del producto
    description: "La taza definitiva para desarrolladores con sentido del humor...",
    
    // Características del producto (usa \n para saltos de línea)
    features: "• Cerámica blanca...\n• Apta para café...",
    
    // Estado de disponibilidad
    status: "Lista para salvar tu día (y tu repo)"
  },
  {
    id: 2,
    name: "Polera 404",
    price: 12000,
    img: "img/polera404.png",
    description: "¿Te sientes fuera de servicio?...",
    features: "• Tela suave y cómoda...",
    status: "No disponible emocionalmente, pero sí en stock"
  },
  {
    id: 3,
    name: "Sticker Bootcamp",
    price: 2000,
    img: "img/stickers.png",
    description: "¡Decora tu laptop, cuaderno o alma...",
    features: "• Pack de 3 stickers...",
    status: "Pegajosos y motivadores"
  }
];

// ¿POR QUÉ UN ARRAY DE OBJETOS?
// - Fácil de recorrer con .map(), .find(), .filter()
// - Simula una base de datos real
// - Cada producto tiene su propia información estructurada

// ============================================
// INICIALIZAR CARRITO DESDE LOCALSTORAGE
// ============================================

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// DESGLOSANDO ESTA LÍNEA:

// 1. localStorage.getItem("cart")
//    - Busca en localStorage un item con clave "cart"
//    - Retorna un STRING o null si no existe

// 2. JSON.parse(...)
//    - Convierte el string JSON en un objeto/array JavaScript
//    - Ejemplo: '[{"id":1}]' → [{id:1}]

// 3. || []
//    - Operador OR lógico
//    - Si JSON.parse retorna null (carrito vacío), usa []
//    - Resultado: cart siempre será un array

// FLUJO:
// Primera visita:    localStorage.getItem("cart") → null → JSON.parse(null) → null → cart = []
// Visita posterior:  localStorage.getItem("cart") → "[{...}]" → JSON.parse → [...] → cart = [...]

// ============================================
// FUNCIONES DE RENDERIZADO
// ============================================

// --------------------------------------------
// RENDERIZAR PRODUCTOS EN HOME (index.html)
// --------------------------------------------
function renderProducts() {
  // 1. SELECCIONAR EL ELEMENTO DEL DOM
  const list = document.getElementById("product-list");
  // document: Objeto global que representa el documento HTML
  // getElementById: Busca un elemento por su ID
  // Retorna: El elemento <div id="product-list"> o null
  
  // 2. VALIDACIÓN: Si no existe el elemento, salir de la función
  if (!list) return;
  // !list significa "si list es null o undefined"
  // return: Sale de la función inmediatamente
  // ¿Por qué? Esta función solo debe ejecutarse en index.html
  
  // 3. GENERAR HTML DINÁMICAMENTE
  list.innerHTML = products.map(p => `
    // innerHTML: Propiedad que permite insertar HTML como string
    
    // products.map(p => ...)
    // - Recorre el array products
    // - p: Variable que representa cada producto
    // - Transforma cada producto en HTML
    // - Retorna un nuevo array de strings
    
    // TEMPLATE LITERAL: Usa backticks (`) y ${} para interpolar variables
    
    <div class="col-md-4 mb-4">
      <!-- Grid de Bootstrap: 3 columnas en desktop, 1 en móvil -->
      
      <div class="card h-100">
        <!-- card: Componente tarjeta
             h-100: Height 100% (todas las cards tienen la misma altura) -->
        
        <a href="product.html?id=${p.id}" class="text-decoration-none" style="cursor: pointer;">
          <!-- 
            ENLACE CLICABLE EN LA IMAGEN
            href="product.html?id=${p.id}"
            - Navega a product.html
            - Pasa el ID como parámetro de URL
            - Ejemplo: product.html?id=2
            
            text-decoration-none: Sin subrayado
            cursor: pointer: Muestra manito al hacer hover
          -->
          
          <img src="${p.img}" class="card-img-top product-image" 
               alt="${p.name}" title="Click para ver más detalles">
          <!-- 
            src="${p.img}": Ruta de la imagen (interpolada)
            alt: Texto alternativo para accesibilidad
            title: Tooltip que aparece al hacer hover
          -->
        </a>
        
        <div class="card-body d-flex flex-column">
          <!-- 
            d-flex: Display flex
            flex-column: Dirección vertical
            Permite que los botones se queden al final
          -->
          
          <h5 class="card-title">${p.name}</h5>
          <!-- Nombre del producto interpolado -->
          
          <p class="card-text fw-bold text-success">$${p.price.toLocaleString('es-CL')}</p>
          <!-- 
            p.price.toLocaleString('es-CL')
            - Formatea el número al estilo chileno
            - 5000 → "5.000"
            - 12000 → "12.000"
            
            fw-bold: Font weight bold (negrita)
            text-success: Color verde de Bootstrap
          -->
          
          <div class="mt-auto d-grid gap-2">
            <!-- 
              mt-auto: Margin top auto
              - En un contenedor flex-column, empuja este div al final
              - Resultado: botones siempre al fondo de la card
              
              d-grid: Display grid
              gap-2: Espacio de 0.5rem entre botones
            -->
            
            <a href="product.html?id=${p.id}" class="btn btn-outline-secondary">Ver más</a>
            <!-- Botón con borde gris -->
            
            <button class="btn btn-primary" onclick="addToCart(${p.id})">Agregar al carrito</button>
            <!-- 
              onclick="addToCart(${p.id})"
              - Evento inline: ejecuta función al hacer click
              - Pasa el ID del producto como argumento
              - Ejemplo: onclick="addToCart(2)"
            -->
          </div>
        </div>
      </div>
    </div>
  `).join("");
  // .join("")
  // - map() retorna un array de strings
  // - join("") une todos los strings en uno solo
  // - Ejemplo: ["<div>A</div>", "<div>B</div>"] → "<div>A</div><div>B</div>"
}

// FLUJO COMPLETO:
// 1. products = [{id:1, name:"Taza",...}, {id:2, name:"Polera",...}]
// 2. products.map(...) → ["<div>Card 1</div>", "<div>Card 2</div>"]
// 3. .join("") → "<div>Card 1</div><div>Card 2</div>"
// 4. list.innerHTML = "..." → Se inserta en el DOM

// --------------------------------------------
// RENDERIZAR DETALLE DE PRODUCTO (product.html)
// --------------------------------------------
function renderProductDetail() {
  const container = document.getElementById("product-detail");
  if (!container) return;
  
  // OBTENER ID DEL PRODUCTO DESDE LA URL
  const params = new URLSearchParams(window.location.search);
  // window.location.search: Parte de la URL después del ?
  // Ejemplo: Si URL = "product.html?id=2&color=blue"
  //          window.location.search = "?id=2&color=blue"
  
  // URLSearchParams: Clase para trabajar con parámetros de URL
  // params.get("id") → "2" (string)
  
  const productId = parseInt(params.get("id"));
  // parseInt: Convierte string a número entero
  // "2" → 2
  
  // BUSCAR EL PRODUCTO EN EL ARRAY
  const product = products.find(p => p.id === productId);
  // .find(condición)
  // - Busca el primer elemento que cumpla la condición
  // - p => p.id === productId: Arrow function que compara IDs
  // - Retorna: El objeto encontrado o undefined
  
  // VALIDAR SI EL PRODUCTO EXISTE
  if (!product) {
    container.innerHTML = "<p class='alert alert-warning'>Producto no encontrado.</p>";
    return;
  }
  
  // RENDERIZAR INFORMACIÓN DEL PRODUCTO
  container.innerHTML = `
    <div class="col-lg-8">
      <!-- col-lg-8: 8/12 columnas en pantallas large -->
      
      <div class="card">
        <div class="row g-0">
          <!-- g-0: Sin gutters (espacios entre columnas) -->
          
          <div class="col-md-6">
            <!-- 50% del ancho en desktop -->
            <img src="${product.img}" class="img-fluid rounded-start p-3" alt="${product.name}">
            <!-- 
              img-fluid: Responsive (max-width: 100%)
              rounded-start: Bordes redondeados a la izquierda
              p-3: Padding de 1rem
            -->
          </div>
          
          <div class="col-md-6">
            <!-- 50% del ancho en desktop -->
            
            <div class="card-body">
              <h2 class="card-title mb-3">${product.name}</h2>
              <h4 class="text-success mb-3">$${product.price.toLocaleString('es-CL')}</h4>
              
              <h5 class="mt-4">Descripción:</h5>
              <p class="card-text">${product.description}</p>
              
              <h5 class="mt-4">Características:</h5>
              <p class="card-text" style="white-space: pre-line;">${product.features}</p>
              <!-- 
                white-space: pre-line
                - Respeta los saltos de línea (\n) del texto
                - "Línea 1\nLínea 2" se muestra en dos líneas
              -->
              
              <p class="card-text mt-4">
                <small class="text-muted"><strong>Estado:</strong> ${product.status}</small>
              </p>
              
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

// --------------------------------------------
// AGREGAR PRODUCTO AL CARRITO
// --------------------------------------------
function addToCart(id) {
  // 1. BUSCAR EL PRODUCTO POR ID
  const product = products.find(p => p.id === id);
  if (!product) return; // Validación: si no existe, salir
  
  // 2. VERIFICAR SI EL PRODUCTO YA ESTÁ EN EL CARRITO
  const existingItem = cart.find(item => item.id === id);
  
  if (existingItem) {
    // Si ya existe: AUMENTAR LA CANTIDAD
    existingItem.quantity += 1;
    // +=: Operador de suma y asignación
    // quantity = quantity + 1
  } else {
    // Si NO existe: AGREGAR COMO NUEVO ITEM
    cart.push({ ...product, quantity: 1 });
    // { ...product, quantity: 1 }
    // - SPREAD OPERATOR (...): Copia todas las propiedades de product
    // - Agrega una nueva propiedad: quantity: 1
    // - Resultado: {id: 1, name: "Taza", price: 5000, ..., quantity: 1}
    
    // .push(): Agrega un elemento al final del array
  }
  
  // 3. GUARDAR CARRITO EN LOCALSTORAGE
  localStorage.setItem("cart", JSON.stringify(cart));
  // JSON.stringify: Convierte objeto/array JavaScript a string JSON
  // [{id:1}] → '[{"id":1}]'
  // localStorage solo guarda strings
  
  // 4. ACTUALIZAR CONTADOR EN EL NAVBAR
  updateCartCount();
  
  // 5. MOSTRAR FEEDBACK AL USUARIO
  showCartFeedback(product.name);
}

// --------------------------------------------
// MOSTRAR MENSAJE DE CONFIRMACIÓN
// --------------------------------------------
function showCartFeedback(productName) {
  // 1. ELIMINAR ALERTA ANTERIOR SI EXISTE
  const existingAlert = document.querySelector('.cart-alert');
  // querySelector: Busca el primer elemento con esa clase
  // Retorna: Elemento o null
  
  if (existingAlert) existingAlert.remove();
  // .remove(): Elimina el elemento del DOM
  
  // 2. CREAR NUEVA ALERTA
  const alert = document.createElement('div');
  // document.createElement: Crea un nuevo elemento HTML
  // Similar a: <div></div>
  
  // 3. ASIGNAR CLASES
  alert.className = 'alert alert-success alert-dismissible fade show cart-alert position-fixed top-0 start-50 translate-middle-x mt-5';
  // className: Propiedad para asignar clases CSS
  
  // 4. CONFIGURAR Z-INDEX
  alert.style.zIndex = '9999';
  // style.zIndex: Propiedad CSS para controlar el orden de apilamiento
  // 9999: Número alto para que aparezca por encima de todo
  
  // 5. ASIGNAR CONTENIDO HTML
  alert.innerHTML = `
    <strong>¡Agregado!</strong> ${productName} se agregó al carrito.
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
  `;
  
  // 6. INSERTAR EN EL DOM
  document.body.appendChild(alert);
  // appendChild: Agrega el elemento como hijo del body
  
  // 7. ELIMINAR AUTOMÁTICAMENTE DESPUÉS DE 3 SEGUNDOS
  setTimeout(() => alert.remove(), 3000);
  // setTimeout(función, milisegundos)
  // - Ejecuta la función después del tiempo especificado
  // - 3000ms = 3 segundos
  // - Arrow function: () => alert.remove()
}

// --------------------------------------------
// AUMENTAR CANTIDAD DE UN PRODUCTO
// --------------------------------------------
function increaseQuantity(id) {
  const item = cart.find(item => item.id === id);
  if (item) {
    item.quantity += 1;
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
    updateCartCount();
  }
}

// --------------------------------------------
// DISMINUIR CANTIDAD DE UN PRODUCTO
// --------------------------------------------
function decreaseQuantity(id) {
  const item = cart.find(item => item.id === id);
  if (item && item.quantity > 1) {
    // Solo disminuye si la cantidad es mayor a 1
    item.quantity -= 1;
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
    updateCartCount();
  }
}

// --------------------------------------------
// ELIMINAR PRODUCTO DEL CARRITO
// --------------------------------------------
function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  // .filter(condición)
  // - Crea un nuevo array con los elementos que cumplen la condición
  // - item.id !== id: Mantiene todos EXCEPTO el que tiene ese ID
  // - Ejemplo: cart = [{id:1}, {id:2}, {id:3}]
  //            removeFromCart(2)
  //            cart = [{id:1}, {id:3}]
  
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
  updateCartCount();
}

// --------------------------------------------
// VACIAR TODO EL CARRITO
// --------------------------------------------
function clearCart() {
  if (confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
    // confirm(): Muestra un diálogo de confirmación
    // Retorna: true si acepta, false si cancela
    
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
    updateCartCount();
  }
}

// --------------------------------------------
// ACTUALIZAR CONTADOR DEL CARRITO
// --------------------------------------------
function updateCartCount() {
  const count = document.getElementById("cart-count");
  if (count) {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    // .reduce(función, valorInicial)
    // - Reduce el array a un único valor
    // - (sum, item) => sum + item.quantity
    //   sum: Acumulador (comienza en 0)
    //   item: Elemento actual
    //   Retorna: sum + cantidad del item
    
    // EJEMPLO:
    // cart = [{quantity: 2}, {quantity: 1}, {quantity: 3}]
    // Iteración 1: sum=0,  item={quantity:2}  → 0 + 2 = 2
    // Iteración 2: sum=2,  item={quantity:1}  → 2 + 1 = 3
    // Iteración 3: sum=3,  item={quantity:3}  → 3 + 3 = 6
    // totalItems = 6
    
    count.textContent = totalItems;
    // textContent: Cambia el texto del elemento
    // <span>0</span> → <span>6</span>
  }
}

// --------------------------------------------
// CALCULAR TOTAL DEL CARRITO
// --------------------------------------------
function calculateTotal() {
  return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  // Suma el precio por la cantidad de cada item
  
  // EJEMPLO:
  // cart = [
  //   {price: 5000, quantity: 2},   // 10.000
  //   {price: 12000, quantity: 1}   // 12.000
  // ]
  // total = 22.000
}

// --------------------------------------------
// MOSTRAR ITEMS DEL CARRITO (cart.html)
// --------------------------------------------
function renderCart() {
  const list = document.getElementById("cart-items");
  if (!list) return;
  
  // CASO 1: CARRITO VACÍO
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
  
  // CASO 2: CARRITO CON PRODUCTOS
  list.innerHTML = cart.map(item => `
    <li class="list-group-item">
      <div class="row align-items-center">
        <!-- align-items-center: Alinea verticalmente al centro -->
        
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
            <!-- btn-group: Agrupa botones juntos -->
            
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
  
  // MOSTRAR TOTAL
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

document.addEventListener("DOMContentLoaded", () => {
  // DOMContentLoaded: Evento que se dispara cuando el DOM está completamente cargado
  // ¿Por qué? Asegura que los elementos HTML existan antes de manipularlos
  
  // Arrow function: () => { código }
  
  renderProducts();       // Renderiza catálogo en index.html
  renderCart();           // Renderiza carrito en cart.html
  renderProductDetail();  // Renderiza detalle en product.html
  updateCartCount();      // Actualiza contador en navbar
  
  // ¿Por qué llamar a todas?
  // - Solo se ejecutará la que corresponda a la página actual
  // - Las demás retornan inmediatamente porque no encuentran su elemento
});

// FLUJO DE EJECUCIÓN:
// 1. Navegador carga HTML
// 2. Navegador encuentra <script src="js/app.js">
// 3. JavaScript se ejecuta:
//    - Define variables (products, cart)
//    - Define funciones (renderProducts, etc.)
//    - Registra event listener para DOMContentLoaded
// 4. DOM termina de cargar
// 5. Se dispara el evento DOMContentLoaded
// 6. Se ejecutan las funciones de renderizado
// 7. El usuario ve el contenido dinámico
```

---

## 🎯 Conceptos Clave

### 1. Manipulación del DOM
- `getElementById()`: Seleccionar elemento
- `innerHTML`: Insertar HTML
- `textContent`: Cambiar texto
- `createElement()`: Crear elemento
- `appendChild()`: Agregar al DOM

### 2. Arrays y Métodos
- `.map()`: Transformar elementos
- `.find()`: Buscar elemento
- `.filter()`: Filtrar elementos
- `.reduce()`: Reducir a un valor
- `.push()`: Agregar al final
- `.join()`: Unir en string

### 3. Objetos
- Pares clave-valor: `{id: 1, name: "Taza"}`
- Acceso: `product.name` o `product['name']`
- Spread operator: `{...product, quantity: 1}`

### 4. LocalStorage
- `setItem()`: Guardar
- `getItem()`: Leer
- `JSON.stringify()`: Objeto → String
- `JSON.parse()`: String → Objeto

### 5. Eventos
- `onclick`: Evento inline
- `addEventListener()`: Evento en JavaScript
- `DOMContentLoaded`: DOM listo

---

**¡Este es el corazón de la aplicación! 💪**

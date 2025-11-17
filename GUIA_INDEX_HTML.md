# 📄 Guía Detallada: index.html

## Estructura Completa Comentada

```html
<!DOCTYPE html>
<!-- DOCTYPE: Declara que este es un documento HTML5 -->

<html lang="es">
<!-- 
  <html>: Elemento raíz del documento
  lang="es": Idioma del contenido (español) - importante para accesibilidad
-->

<head>
  <!-- HEAD: Contiene metadatos (información sobre el documento) -->
  
  <meta charset="UTF-8">
  <!-- 
    charset="UTF-8": Codificación de caracteres Unicode
    Permite usar acentos, ñ y caracteres especiales
  -->
  
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <!-- 
    viewport: Controla cómo se ve la página en dispositivos móviles
    width=device-width: Ancho = ancho del dispositivo
    initial-scale=1.0: Zoom inicial al 100%
    ¡ESENCIAL para diseño responsive!
  -->
  
  <title>Geek Store</title>
  <!-- Título que aparece en la pestaña del navegador -->
  
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
  <!-- 
    Incluye Bootstrap CSS desde CDN (Content Delivery Network)
    CDN = servidor optimizado para servir archivos estáticos
    Versión 5.3.2 de Bootstrap
  -->
  
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
  <!-- 
    Bootstrap Icons: Biblioteca de íconos
    Permite usar <i class="bi bi-cart3"></i>
  -->
  
  <link rel="stylesheet" href="css/styles.css">
  <!-- Nuestros estilos personalizados (se cargan al final para sobreescribir Bootstrap) -->
</head>

<body>
<!-- BODY: Contiene todo el contenido visible de la página -->

  <!-- ====================== HEADER (ENCABEZADO) ====================== -->
  <header>
  <!-- 
    <header>: Etiqueta semántica para encabezado de página
    Contiene la navegación principal
  -->
  
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <!-- 
      <nav>: Etiqueta semántica para navegación
      
      CLASES DE BOOTSTRAP:
      - navbar: Componente navbar de Bootstrap
      - navbar-expand-lg: Se expande en pantallas Large (≥992px), colapsa en menores
      - navbar-dark: Texto claro para fondos oscuros
      - bg-dark: Fondo oscuro (#212529)
    -->
    
      <div class="container-fluid">
      <!-- 
        container-fluid: Contenedor que ocupa el 100% del ancho
        Alternativa: container (tiene márgenes laterales)
      -->
      
        <a class="navbar-brand" href="index.html">Geek Store</a>
        <!-- 
          navbar-brand: Estilo para el logo/nombre de la marca
          Normalmente va a la izquierda del navbar
        -->
        
        <button class="navbar-toggler" type="button" 
                data-bs-toggle="collapse" 
                data-bs-target="#navbarNav" 
                aria-controls="navbarNav" 
                aria-expanded="false" 
                aria-label="Toggle navigation">
        <!-- 
          BOTÓN HAMBURGUESA (solo visible en móviles)
          
          navbar-toggler: Estilo del botón hamburguesa
          type="button": Tipo de botón HTML
          
          ATRIBUTOS DATA DE BOOTSTRAP:
          data-bs-toggle="collapse": Activa el comportamiento de colapso
          data-bs-target="#navbarNav": ID del elemento a colapsar/expandir
          
          ATRIBUTOS ARIA (accesibilidad):
          aria-controls: Qué elemento controla
          aria-expanded: Si está expandido o no
          aria-label: Etiqueta para lectores de pantalla
        -->
        
          <span class="navbar-toggler-icon"></span>
          <!-- Ícono de hamburguesa (tres líneas) -->
        </button>
        
        <div class="collapse navbar-collapse" id="navbarNav">
        <!-- 
          collapse: Estado inicial = colapsado (oculto en móviles)
          navbar-collapse: Contenedor del menú que se colapsa
          id="navbarNav": Identificador único (debe coincidir con data-bs-target)
        -->
        
          <ul class="navbar-nav ms-auto">
          <!-- 
            navbar-nav: Lista de navegación
            ms-auto: Margin Start Auto (empuja el menú a la derecha)
          -->
          
            <li class="nav-item">
              <a class="nav-link active" href="index.html">Inicio</a>
              <!-- 
                nav-item: Item de lista
                nav-link: Estilo para enlaces de navegación
                active: Marca la página actual (más brillante/destacada)
              -->
            </li>
            
            <li class="nav-item">
              <a class="nav-link" href="cart.html">
                <i class="bi bi-cart3"></i> Carrito 
                <!-- 
                  <i>: Elemento inline para íconos
                  bi bi-cart3: Clases de Bootstrap Icons
                  bi = Bootstrap Icons
                  cart3 = ícono específico de carrito
                -->
                
                <span id="cart-count" class="badge bg-warning">0</span>
                <!-- 
                  badge: Componente insignia/etiqueta
                  bg-warning: Fondo amarillo/naranja
                  id="cart-count": Identificador para actualizar con JavaScript
                  El "0" se actualizará dinámicamente
                -->
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>

  <!-- ====================== MAIN (CONTENIDO PRINCIPAL) ====================== -->
  <main class="container mt-4">
  <!-- 
    <main>: Etiqueta semántica para contenido principal
    Solo debe haber UN <main> por página
    
    container: Contenedor con márgenes laterales (centrado)
    mt-4: Margin Top = 1.5rem (24px)
  -->
  
    <section id="catalog">
    <!-- 
      <section>: Sección temática del documento
      id="catalog": Identificador único para esta sección
    -->
    
      <h1 class="mb-4">Productos</h1>
      <!-- 
        <h1>: Encabezado de nivel 1 (el más importante)
        mb-4: Margin Bottom = 1.5rem
      -->
      
      <div id="product-list" class="row"></div>
      <!-- 
        IMPORTANTE: Este div está VACÍO en el HTML
        Se llenará dinámicamente con JavaScript
        
        id="product-list": Identificador para JavaScript
        row: Clase de Bootstrap Grid System (fila)
        
        JavaScript insertará aquí:
        <div class="col-md-4">
          <div class="card">...</div>
        </div>
      -->
    </section>
  </main>

  <!-- ====================== FOOTER (PIE DE PÁGINA) ====================== -->
  <footer class="bg-dark text-white text-center p-3 mt-4">
  <!-- 
    <footer>: Etiqueta semántica para pie de página
    
    bg-dark: Fondo oscuro
    text-white: Texto blanco
    text-center: Texto centrado
    p-3: Padding = 1rem en todos los lados
    mt-4: Margin Top = 1.5rem
  -->
  
    <p>Geek Store © 2025 - Tienda ficticia</p>
    <!-- <p>: Párrafo -->
  </footer>

  <!-- ====================== SCRIPTS (JAVASCRIPT) ====================== -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
  <!-- 
    Bootstrap JavaScript
    IMPORTANTE: Debe ir ANTES de nuestro script
    Incluye:
    - Comportamiento del navbar colapsable
    - Componentes interactivos (modales, tooltips, etc.)
    bundle.min.js = versión minificada con Popper.js incluido
  -->
  
  <script src="js/app.js"></script>
  <!-- 
    Nuestro JavaScript personalizado
    Se carga al final para asegurar que el DOM esté listo
  -->
</body>
</html>
```

---

## 🎯 Flujo de Carga de la Página

1. **El navegador lee el HTML de arriba hacia abajo**
2. **En `<head>`**:
   - Carga Bootstrap CSS (estilos)
   - Carga Bootstrap Icons (íconos)
   - Carga nuestro CSS (estilos personalizados)
3. **En `<body>`**:
   - Renderiza el header con navbar
   - Renderiza el main con un `<div id="product-list">` VACÍO
   - Renderiza el footer
4. **Al final del `<body>`**:
   - Carga Bootstrap JS
   - Carga app.js
5. **JavaScript ejecuta**:
   - Espera evento `DOMContentLoaded`
   - Llama a `renderProducts()`
   - Inserta HTML de las cards en `#product-list`

---

## 📱 Comportamiento Responsive

### En Desktop (≥992px):
```
┌─────────────────────────────────────────┐
│ [Geek Store]         Inicio   🛒 Carrito│
├─────────────────────────────────────────┤
│                                         │
│  [Card] [Card] [Card]                  │
│  [Card] [Card] [Card]                  │
│                                         │
└─────────────────────────────────────────┘
```

### En Móvil (<992px):
```
┌────────────────┐
│[Geek Store] ☰ │
├────────────────┤
│                │
│    [Card]      │
│    [Card]      │
│    [Card]      │
│                │
└────────────────┘
```

**Al tocar ☰:**
```
┌────────────────┐
│[Geek Store] ☰ │
├────────────────┤
│ Inicio         │
│ 🛒 Carrito     │
├────────────────┤
│    [Card]      │
│    [Card]      │
└────────────────┘
```

---

## ✅ Checklist de Requisitos Cumplidos

### HTML5 Semántico:
- ✅ `<header>` para encabezado
- ✅ `<nav>` para navegación
- ✅ `<main>` para contenido principal
- ✅ `<section>` para catálogo
- ✅ `<footer>` para pie de página

### Bootstrap:
- ✅ Grid system (`.row`, `.col-md-4`)
- ✅ Navbar responsive
- ✅ Cards para productos
- ✅ Buttons
- ✅ Badge para contador
- ✅ Utilidades (spacing, display)

### Responsive:
- ✅ `<meta viewport>` configurado
- ✅ Navbar colapsa en móviles
- ✅ Grid adapta de 3 columnas a 1 columna

---

## 🎓 Preguntas de Autoevaluación

1. **¿Por qué usamos `<header>` en lugar de `<div class="header">`?**
   - Por semántica: `<header>` describe el contenido, no solo su presentación

2. **¿Qué pasaría si quitamos `<meta viewport>`?**
   - La página se vería mal en móviles (texto muy pequeño, sin responsive)

3. **¿Por qué Bootstrap JS va antes de app.js?**
   - Para que nuestro código pueda usar las funcionalidades de Bootstrap

4. **¿Qué hace `id="product-list"`?**
   - Permite que JavaScript identifique y modifique ese elemento específico

5. **¿Por qué el div `product-list` está vacío?**
   - Porque JavaScript lo llenará dinámicamente con las cards de productos

---

## 💡 Experimentos Sugeridos

1. **Cambiar el breakpoint del navbar**:
   ```html
   <!-- De: -->
   <nav class="navbar navbar-expand-lg">
   <!-- A: -->
   <nav class="navbar navbar-expand-md">
   ```
   Ahora colapsa en pantallas Medium (<768px)

2. **Agregar un enlace más al navbar**:
   ```html
   <li class="nav-item">
     <a class="nav-link" href="about.html">Acerca de</a>
   </li>
   ```

3. **Cambiar el ícono del carrito**:
   - Busca otros íconos en: https://icons.getbootstrap.com/
   - Ejemplos: `bi-bag`, `bi-basket`, `bi-cart4`

---

**¡Practica modificando el código! La mejor forma de aprender es experimentando.** 🚀

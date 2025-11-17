# 🛍️ Geek Store - E-commerce Frontend

Tienda en línea de productos geek desarrollada con HTML5, Bootstrap 5 y JavaScript vanilla.

## 📋 Descripción

Este proyecto es el **MVP (Minimum Viable Product)** de un e-commerce frontend desarrollado como parte del Módulo 2 del curso Java Full Stack. La tienda ofrece productos geek como tazas, poleras y stickers, con funcionalidades básicas de catálogo y carrito de compras.

## 🚀 Características

- ✅ **Catálogo de productos**: Visualización de productos en formato de cards responsivas
- ✅ **Página de detalle**: Información completa de cada producto
- ✅ **Carrito de compras**: Sistema de carrito con contador en tiempo real
- ✅ **Persistencia de datos**: Uso de localStorage para mantener el carrito entre sesiones
- ✅ **Diseño responsivo**: Compatible con dispositivos móviles (≤420px) y escritorio (≥1024px)
- ✅ **Interfaz moderna**: Diseño con Bootstrap 5 y estilos personalizados

## 🛠️ Tecnologías utilizadas

- **HTML5**: Estructura semántica del sitio
- **CSS3**: Estilos personalizados y responsive design
- **Bootstrap 5.3.2**: Framework CSS para componentes y grid system
- **JavaScript ES6**: Interactividad y manipulación del DOM
- **LocalStorage**: Persistencia del carrito de compras

## 📁 Estructura del proyecto

```
ecommerce-frontend-m2/
├── index.html          # Página principal con catálogo
├── product.html        # Página de detalle de producto
├── cart.html           # Página del carrito de compras
├── css/
│   └── styles.css      # Estilos personalizados
├── js/
│   └── app.js          # Lógica de la aplicación
├── img/                # Imágenes de productos
│   ├── taza.png
│   ├── polera404.png
│   └── stickers.png
└── README.md           # Documentación del proyecto
```

## 🎯 Funcionalidades principales

### 1. Página de inicio (index.html)
- Muestra todos los productos disponibles en cards de Bootstrap
- Cada card incluye imagen, nombre, precio y botón "Agregar al carrito"
- Contador de items en el navbar

### 2. Página de detalle (product.html)
- Información detallada del producto seleccionado
- Imagen ampliada
- Descripción del producto
- Opción para agregar al carrito

### 3. Carrito de compras (cart.html)
- Lista de productos agregados
- Persistencia mediante localStorage
- Visualización de nombre y precio de cada item

## 💻 Instalación y uso

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/Pablotronix/ecommerce-frontend-m2.git
   ```

2. **Navegar al directorio**
   ```bash
   cd ecommerce-frontend-m2
   ```

3. **Abrir en el navegador**
   - Abre el archivo `index.html` directamente en tu navegador, o
   - Usa un servidor local como Live Server (extensión de VS Code)

## 🌐 Demo en vivo

Repositorio: [https://github.com/Pablotronix/ecommerce-frontend-m2](https://github.com/Pablotronix/ecommerce-frontend-m2)

## 📱 Responsive Design

El sitio está optimizado para:
- 📱 **Móvil**: ≤ 420px
- 💻 **Desktop**: ≥ 1024px
- 📊 **Tablet**: Tamaños intermedios

## 👨‍💻 Autor

**Pablo Cutiño**
- GitHub: [@Pablotronix](https://github.com/Pablotronix)

## 📄 Licencia

Este proyecto es de código abierto y está disponible para fines educativos.

---

**Proyecto desarrollado como parte del Módulo 2 - Curso Java Full Stack Sustantiva 2025-2026**

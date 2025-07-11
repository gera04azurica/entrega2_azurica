// js/script.js

const seleccionar = (selector, contexto = document) => contexto.querySelector(selector);

/* Toast */
function mostrarToast(msg) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2000);
}

let productos = []; // ahora se carga con fetch

/* Render de tarjetas */
function pintarProductos() {
  const contenedorProductos = seleccionar("#contenedor-productos");
  if (!contenedorProductos) return;
  contenedorProductos.innerHTML = productos.map(producto => `
    <div class="producto" data-id="${producto.id}">
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <h3>${producto.nombre}</h3>
      <div class="precio">$${producto.precio.toLocaleString("es-UY")} <span style="color:#888;font-size:.9em;">${producto.marca}</span></div>
      <a href="pages/producto.html?id=${producto.id}" class="detalle">Ver detalle</a>
      <div class="acciones">
        <input type="number" min="1" value="1" class="cantidad">
        <button class="agregar">Añadir</button>
      </div>
    </div>
  `).join("");
}

/* Eventos de “Agregar” */
function initListado() {
  const contenedorProductos = seleccionar("#contenedor-productos");
  if (!contenedorProductos) return;
  contenedorProductos.addEventListener("click", e => {
    if (!e.target.classList.contains("agregar")) return;
    const tarjeta = e.target.closest(".producto");
    const id   = +tarjeta.dataset.id;
    const productoSeleccionado = productos.find(x => x.id === id);
    const cantidadElegida  = Math.max(1, parseInt(tarjeta.querySelector(".cantidad").value));
    const carritoActual = JSON.parse(localStorage.getItem("carrito")) || [];
    const productoExistente   = carritoActual.find(x => x.id === id);
    if (productoExistente) productoExistente.cantidad += cantidadElegida;
    else carritoActual.push({ id, nombre: productoSeleccionado.nombre, precio: productoSeleccionado.precio, cantidad: cantidadElegida });
    localStorage.setItem("carrito", JSON.stringify(carritoActual));
    mostrarToast(`${cantidadElegida} × ${productoSeleccionado.nombre} añadido al carrito`);
  });
}

/* Cargar productos desde JSON */
async function cargarProductos() {
  try {
    const resp = await fetch("productos.json");
    if (!resp.ok) throw new Error("No se pudo cargar el archivo productos.json");
    productos = await resp.json();
    pintarProductos();
    initListado();
  } catch (error) {
    mostrarToast("Error al cargar productos");
    console.error(error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  cargarProductos();
  seleccionar(".menu-toggle")?.addEventListener("click", () => {
    seleccionar(".menu-categorias").classList.toggle("active");
  });
});

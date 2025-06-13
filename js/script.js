// js/script.js
import { productos } from "./productos.js";

/* Helpers */
const $ = (sel, ctx = document) => ctx.querySelector(sel);

/* Toast */
function mostrarToast(msg) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2000);
}

/* Render de tarjetas */
function pintarProductos() {
  const cont = $("#contenedor-productos");
  if (!cont) return;
  cont.innerHTML = productos.map(p => `
    <div class="producto" data-id="${p.id}">
      <img src="${p.imagen}" alt="${p.nombre}">
      <h3>${p.nombre}</h3>
      <p class="precio">$${p.precio.toLocaleString("es-UY")}</p>
      <p class="marca">${p.marca}</p>
      <a href="pages/producto.html?id=${p.id}" class="detalle">Ver detalle</a>
      <div class="acciones">
        <input type="number" min="1" value="1" class="cantidad">
        <button class="agregar">Añadir</button>
      </div>
    </div>
  `).join("");
}

/* Eventos de “Agregar” */
function initListado() {
  const cont = $("#contenedor-productos");
  cont.addEventListener("click", e => {
    if (!e.target.classList.contains("agregar")) return;
    const card = e.target.closest(".producto");
    const id   = +card.dataset.id;
    const prod = productos.find(x => x.id === id);
    const qty  = Math.max(1, parseInt(card.querySelector(".cantidad").value));
    const cart = JSON.parse(localStorage.getItem("carrito")) || [];
    const ex   = cart.find(x => x.id === id);
    if (ex) ex.cantidad += qty;
    else cart.push({ id, nombre: prod.nombre, precio: prod.precio, cantidad: qty });
    localStorage.setItem("carrito", JSON.stringify(cart));
    mostrarToast(`${qty} × ${prod.nombre} añadido al carrito`);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  pintarProductos();
  initListado();
  document.querySelector(".menu-toggle")?.addEventListener("click", () => {
    document.querySelector(".menu-categorias").classList.toggle("active");
  });
});

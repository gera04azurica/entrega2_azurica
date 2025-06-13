// js/producto.js
import { productos } from "./productos.js";

/* URL param */
function getParam(key) {
  return new URLSearchParams(window.location.search).get(key);
}

/* Mostrar datos */
function renderProducto() {
  const id   = Number(getParam("id"));
  const prod = productos.find(p => p.id === id);
  const titulo = document.getElementById("titulo");
  if (!prod) {
    titulo.textContent = "Producto no encontrado";
    return;
  }
  document.getElementById("imagen").src = prod.imagen;
  document.getElementById("titulo").textContent = prod.nombre;
  document.getElementById("precio").textContent = prod.precio.toLocaleString("es-UY");
  document.getElementById("marca").textContent  = prod.marca;
  document.getElementById("descripcion").textContent = prod.descripcion;
  document.getElementById("contenido").textContent   = prod.contenido;
}

/* Toast */
function mostrarToast(msg) {
  const t = document.createElement("div");
  t.className = "toast";
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2000);
}

/* Botones de cantidad + añadir/comprar */
function initDetalle() {
  const qtyEl  = document.getElementById("cantidad-producto");
  const btnAdd = document.getElementById("btn-add");
  const btnBuy = document.getElementById("btn-comprar");
  document.querySelector(".acciones-producto").addEventListener("click", e => {
    if (e.target.classList.contains("mas")) {
      qtyEl.value = +qtyEl.value + 1;
    }
    if (e.target.classList.contains("menos")) {
      qtyEl.value = Math.max(1, +qtyEl.value - 1);
    }
  });
  btnAdd.addEventListener("click", () => {
    const id   = Number(getParam("id"));
    const prod = productos.find(p => p.id === id);
    const cart = JSON.parse(localStorage.getItem("carrito")) || [];
    const qty  = Math.max(1, +qtyEl.value);
    const ex   = cart.find(x => x.id === id);
    if (ex) ex.cantidad += qty;
    else cart.push({ id, nombre: prod.nombre, precio: prod.precio, cantidad: qty });
    localStorage.setItem("carrito", JSON.stringify(cart));
    mostrarToast(`${qty} × ${prod.nombre} añadido`);
  });
  btnBuy.addEventListener("click", () => {
    btnAdd.click();
    window.location.href = "carrito.html";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderProducto();
  initDetalle();
});

// js/carrito.js
const $ = (sel, ctx = document) => ctx.querySelector(sel);
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const tbody   = $("#carrito-body");
const totalEl = $("#total");

function renderCarrito() {
  carrito = carrito.filter(item => item.cantidad > 0);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  tbody.innerHTML = "";
  if (carrito.length === 0) {
    tbody.innerHTML = `<tr><td colspan="4" class="empty">Tu carrito está vacío.</td></tr>`;
    totalEl.textContent = "0";
    return;
  }
  let total = 0;
  carrito.forEach(({ id, nombre, precio, cantidad }) => {
    total += precio * cantidad;
    const tr = document.createElement("tr");
    tr.dataset.id = id;
    tr.innerHTML = `
      <td>${nombre}</td>
      <td>$${precio.toLocaleString("es-UY")}</td>
      <td class="qty">
        <button class="menos">−</button>
        <span class="cant">${cantidad}</span>
        <button class="mas">+</button>
      </td>
      <td class="sub">$${(precio * cantidad).toLocaleString("es-UY")}</td>
    `;
    tbody.appendChild(tr);
  });
  totalEl.textContent = total.toLocaleString("es-UY");
}

const btnPagar = document.getElementById("btn-pagar");
btnPagar?.addEventListener("click", () => {
  alert("Redirigiendo a la pasarela de pago…");
});


tbody.addEventListener("click", e => {
  const btn = e.target;
  if (!btn.classList.contains("mas") && !btn.classList.contains("menos")) return;
  const tr = btn.closest("tr");
  const id = +tr.dataset.id;
  const item = carrito.find(p => p.id === id);
  if (!item) return;
  btn.classList.contains("mas") ? item.cantidad++ : item.cantidad--;
  renderCarrito();
});

document.addEventListener("DOMContentLoaded", renderCarrito);

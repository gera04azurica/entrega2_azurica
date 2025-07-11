let carritoActual = JSON.parse(localStorage.getItem("carrito")) || [];
const cuerpoTablaCarrito = document.getElementById("carrito-body");
const totalElemento = document.getElementById("total");

function renderizarCarrito() {
  carritoActual = carritoActual.filter(item => item.cantidad > 0);
  localStorage.setItem("carrito", JSON.stringify(carritoActual));
  cuerpoTablaCarrito.innerHTML = "";
  if (carritoActual.length === 0) {
    cuerpoTablaCarrito.innerHTML = `<tr><td colspan="4" class="empty">Tu carrito está vacío.</td></tr>`;
    totalElemento.textContent = "0";
    return;
  }
  let total = 0;
  carritoActual.forEach(({ id, nombre, precio, cantidad }) => {
    total += precio * cantidad;
    const fila = document.createElement("tr");
    fila.dataset.id = id;
    fila.innerHTML = `
      <td>${nombre}</td>
      <td>$${precio.toLocaleString("es-UY")}</td>
      <td class="qty">
        <button class="menos">−</button>
        <span class="cant">${cantidad}</span>
        <button class="mas">+</button>
      </td>
      <td class="sub">$${(precio * cantidad).toLocaleString("es-UY")}</td>
    `;
    cuerpoTablaCarrito.appendChild(fila);
  });
  totalElemento.textContent = total.toLocaleString("es-UY");
}

const botonPagar = document.getElementById("btn-pagar");
const botonVaciar = document.getElementById("btn-vaciar");

botonPagar?.addEventListener("click", () => {
  if (carritoActual.length === 0) {
    Swal.fire("Tu carrito está vacío", "", "info");
    return;
  }
  window.location.href = "finalizar.html";
});

botonVaciar?.addEventListener("click", () => {
  if (carritoActual.length === 0) {
    Swal.fire("El carrito ya está vacío", "", "info");
    return;
  }
  Swal.fire({
    title: "¿Estás seguro de que querés vaciar el carrito?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, vaciar",
    cancelButtonText: "Cancelar"
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.removeItem("carrito");
      carritoActual = [];
      renderizarCarrito();
    }
  });
});

cuerpoTablaCarrito.addEventListener("click", evento => {
  const boton = evento.target;
  if (!boton.classList.contains("mas") && !boton.classList.contains("menos")) return;
  const fila = boton.closest("tr");
  const idProducto = Number(fila.dataset.id);
  const productoEnCarrito = carritoActual.find(producto => producto.id === idProducto);
  if (!productoEnCarrito) return;
  if (boton.classList.contains("mas")) {
    productoEnCarrito.cantidad++;
  } else {
    productoEnCarrito.cantidad--;
  }
  renderizarCarrito();
});

renderizarCarrito();




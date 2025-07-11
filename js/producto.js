// js/producto.js

function getParam(key) {
  return new URLSearchParams(window.location.search).get(key);
}

/* Mostrar datos */
function renderProducto() {
  const id = Number(getParam("id")); // ESTE es el parámetro de la URL: producto.html?id=3
  const productoSeleccionado = productos.find(p => p.id === id);
  const titulo = document.getElementById("titulo");
  if (!productoSeleccionado) {
    titulo.textContent = "Producto no encontrado";
    return;
  }
  document.getElementById("imagen").src = "../" + productoSeleccionado.imagen;
  document.getElementById("titulo").textContent = productoSeleccionado.nombre;
  document.getElementById("precio").textContent = productoSeleccionado.precio.toLocaleString("es-UY");
  document.getElementById("marca").textContent = productoSeleccionado.marca;
  document.getElementById("descripcion").textContent = productoSeleccionado.descripcion;
  document.getElementById("contenido").textContent = productoSeleccionado.contenido;
}

/* Toast */
function mostrarToast(msg) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2000);
}

/* Botones de cantidad + añadir/comprar */
function initDetalle() {
  const inputCantidad = document.getElementById("cantidad-producto");
  const btnAdd = document.getElementById("btn-add");
  const btnBuy = document.getElementById("btn-comprar");

  document.querySelector(".acciones-producto").addEventListener("click", e => {
    if (e.target.classList.contains("mas")) {
      inputCantidad.value = +inputCantidad.value + 1;
    }
    if (e.target.classList.contains("menos")) {
      inputCantidad.value = Math.max(1, +inputCantidad.value - 1);
    }
  });

  btnAdd.addEventListener("click", () => {
    const id = Number(getParam("id")); // ¡Mismo parámetro que arriba!
    const productoSeleccionado = productos.find(p => p.id === id); 
    const carritoActual = JSON.parse(localStorage.getItem("carrito")) || [];
    const cantidadElegida = Math.max(1, +inputCantidad.value);
    const productoExistente = carritoActual.find(x => x.id === id);
    if (productoExistente) productoExistente.cantidad += cantidadElegida;
    else carritoActual.push({ id, nombre: productoSeleccionado.nombre, precio: productoSeleccionado.precio, cantidad: cantidadElegida });
    localStorage.setItem("carrito", JSON.stringify(carritoActual));
    mostrarToast(`${cantidadElegida} × ${productoSeleccionado.nombre} añadido`);
  });

  btnBuy.addEventListener("click", () => {
    btnAdd.click();
    window.location.href = "carrito.html";
  });
}

renderProducto();
initDetalle();

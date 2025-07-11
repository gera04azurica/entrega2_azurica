document.getElementById("form-finalizar").addEventListener("submit", function(e){
  e.preventDefault();
  const data = Object.fromEntries(new FormData(this).entries());

  // Validación simple
  if (Object.values(data).some(val => !val.trim())) {
    Swal.fire("Completa todos los campos", "", "warning");
    return;
  }
  if (data.tarjeta.replace(/\s/g, "").length < 12) {
    Swal.fire("El número de tarjeta debe tener al menos 12 dígitos", "", "error");
    return;
  }

  // Vaciar carrito
  localStorage.removeItem("carrito");

  // Papelitos de confetti
  confetti({
    particleCount: 200,
    spread: 80,
    origin: { y: 0.6 }
  });

  // Mensaje de éxito
  Swal.fire({
    title: "¡Gracias por tu compra!",
    html: `<b>Pronto recibirás tu pedido en <u>${data.ciudad}</u></b>`,
    icon: "success",
    confirmButtonText: "Volver al inicio"
  }).then(() => {
    window.location.href = "../index.html";
  });
});

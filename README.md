# Silea Beauty Store - Proyecto Final JavaScript

Simulador de tienda online presentado como proyecto final para el curso JavaScript Flex de Coderhouse

---

## ¿Qué permite hacer este sitio?

- Navegar productos y ver detalles de cada uno.
- Agregar productos al carrito, modificar cantidades, eliminar o vaciar el carrito.
- Simular la compra con un formulario de datos personales y tarjeta (ficticia).
- Ver animación de confetti y mensaje de agradecimiento tras la compra.
- El carrito se guarda localmente para no perder el estado si recargás la página.

---

## ¿Cómo usarlo?

1. Desde la página principal, seleccioná productos y hacé clic en "Añadir".
2. Accedé al carrito (ícono arriba a la derecha) para ver tus productos y modificar cantidades.
3. Cuando estés listo, hacé clic en "Pagar" y completá el formulario de compra.
4. Después de completar el formulario, vas a ver una animación de confetti y mensaje de éxito.
5. El carrito se vacía y podés seguir navegando.

---

## Tecnologías y buenas prácticas

- **Productos cargados desde productos.json** usando `fetch` (no hardcodeados en JS).
- **DOM y eventos**: todo lo visual se genera y gestiona desde JS.
- **Librerías externas**:  
  - [SweetAlert2](https://sweetalert2.github.io/) para modales y confirmaciones.
  - [Canvas Confetti](https://www.kirilv.com/canvas-confetti/) para la animación de compra exitosa.
- **No se usan alert, confirm ni prompt nativos** (se reemplazaron por modales y mensajes visuales).
- **No hay console.log ni mensajes en consola**.
- **Código semántico**: variables y funciones con nombres claros, estructura limpia y comentarios útiles.
- **Responsivo**: el sitio funciona en desktop y móvil.
- **Sin login ni registro** (no es parte de la consigna).

---
---

¡Gracias por revisar mi proyecto!

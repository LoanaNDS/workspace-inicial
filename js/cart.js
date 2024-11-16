function badge() {
  const contador = document.getElementById("contador");
  const cont = document.getElementById("cont");

  // Obtenemos los productos guardados en localStorage
  const CantObjetos = JSON.parse(localStorage.getItem("compras")) || [];

  // Variable para almacenar la suma total de las cantidades de productos
  let totalCantidad = 0;

  // Recorremos los productos en CantObjetos y sumamos las cantidades desde los inputs
  CantObjetos.forEach((element, index) => {
    const inputCantidad = document.getElementById(`inputCantidad-${index}`);

    // Si el inputCantidad existe, lo usamos para obtener la cantidad
    if (inputCantidad) {
      let nuevaCantidad = parseInt(inputCantidad.value) || 0;  // Tomamos la cantidad tal cual
      if (nuevaCantidad > 0) {
        totalCantidad += nuevaCantidad; // Sumamos la nueva cantidad al total
      }
    }
  });

  // Actualizamos el contador en el DOM
  contador.innerHTML = totalCantidad;

  // Mostrar u ocultar el contador dependiendo de si hay productos o la cantidad total es 0
  if (CantObjetos.length === 0 || totalCantidad === 0) {
    contador.style.display = 'none';
    cont.style.display = 'none';
  } else {
    contador.style.display = 'block';
    cont.style.display = 'block';
  }
}

// Llamamos a badge() para actualizar el contador al cargar la página y después de cada cambio
document.addEventListener("DOMContentLoaded", () => {
  cargarproductos();
  badge(); // Llamamos a badge cuando la página se carga
});

function cargarproductos() {
  // Paso el array de compras a objeto JS
  const comprasGuardadas = JSON.parse(localStorage.getItem("compras"));

  if (!comprasGuardadas || comprasGuardadas.length === 0) {
    const paginavacia = document.getElementById("tablaDeCarrito");
    const carritovacio = `
      <div class="img-container" style="text-align: center;">
        <img src="img/carritovacio.svg" id="imagenCarroVacio"></img>
        <div id="alertaVacio">Oppss..parece que tu carrito esta vacio! Porque no das una vuelta por nuestra tienda?</div>
      </div>
    `;
    paginavacia.innerHTML = carritovacio;
  } else {
    const tabladecompras = document.getElementById("tablaDeCarrito");
    const headDeTabla = `
      <div class="table-responsive">
        <table class="table table-hover">
          <thead class="table-success">
            <tr>
              <th scope="col">Producto</th>
              <th scope="col">Precio</th>
              <th scope="col">Cantidad</th>
              <th scope="col">Subtotal</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
    `;
    let contenidoDeCarrito = "";
    comprasGuardadas.forEach((element, index) => {
      contenidoDeCarrito += `
        <tr class="nombresTabla">
          <td><img src="${element.image}" class="img-thumbnail img-fluid imagenProductoComprado">${element.name}</td>
          <td class="align-middle"> <span> UYU</span> ${element.price}</td>
          <td class="align-middle">
            <input type="number" min="0" class="cuantificador" id="inputCantidad-${index}" value="${element.quantity}">
          </td>
          <td class="align-middle" id="subTotal-${index}"> <span> UYU </span> ${element.price * element.quantity}</td>
          <td class="align-middle"><i class="bi bi-trash" type="button" onclick='eliminar(${index})'></i></td>
        </tr>
      `;
    });

    // Cerramos la tabla y agregamos el contenido de checkout
    const finalDeTabla = `</tbody></table></div><div class="box"></div>`;
    const checkout = `
      <div class="container" id="checkout">
        <div class="card border-success" style="width:26rem; height:auto;">
        <div>
        <div class="btn-group d-flex col-9 mx-auto mt-3 justify-content-center" role="group" aria-label="Basic outlined example">
          <!-- Button trigger modal -->
<button type="button" class="btn btn-success" style="font-size: 0.8rem;" data-bs-toggle="modal" data-bs-target="#direccion">
  <i class="bi bi-house-add" style="font-size: 1.50rem;"></i><br>Dirección de envío
</button>
<!-- Button trigger modal -->
<button type="button" class="btn btn-success" style="font-size: 0.8rem;" data-bs-toggle="modal" data-bs-target="#envio">
    <i class="bi bi-truck" style="font-size: 1.50rem;"></i><br>Tipo de envío
</button>
<!-- Button trigger modal -->
<button type="button" class="btn btn-success" style="font-size: 0.8rem;" data-bs-toggle="modal" data-bs-target="#metodoDePago">
  <i class="bi bi-cash-stack"style="font-size: 1.50rem;"></i><br>Forma de pago 
</button>
</div>


<!-- Modal -->
<div class="modal fade" id="direccion" tabindex="-1" aria-labelledby="direccion" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="direccionLabel">A donde enviamos tu compra?</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form class="row g-3">
        <div class="col-md-6">
    <label for="inputLocalidad" class="form-label">Departamento:</label>
    <input type="text" class="form-control" id="inputLocalidad" placeholder="ej: Montevideo">
  </div>
  <div class="col-md-6">
    <label for="inputDepartamento" class="form-label">Localidad:</label>
    <input type="text" class="form-control" id="inputDepartamento" placeholder="ej: Tres Cruces">
  </div>

  <div class="col-12">
    <label for="inputAddress" class="form-label">Dirección:</label>
    <input type="text" class="form-control" id="inputAddress" placeholder="Calle principal 1234">
  </div>
  <div class="col-12">
    <label for="inputAddress2" class="form-label">Esquina:</label>
    <input type="text" class="form-control" id="inputAddress2" placeholder="">
  </div>
  <div class="mb-3">
  <label for="exampleFormControlTextarea1" class="form-label">Notas:</label>
  <textarea class="form-control" id="exampleFormControlTextarea1" rows="2"></textarea>
</div>
</form>
      </div>
      <div class="modal-footer">
        <button type="submit" class="btn btn-success">Guardar cambios</button>
      </div>
    </div>
  </div>
</div>


<!-- Modal -->
<div class="modal fade" id="envio" tabindex="-1" aria-labelledby="envio" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="envioLabel">Métodos de envío:</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <div class="form-check">
  <input class="form-check-input" type="radio" name="tipoDeEnvio" id="premium">
  <label class="form-check-label" for="premium">
    Premium 2 a 5 días (15%)
  </label>
</div>
<div class="form-check">
  <input class="form-check-input" type="radio" name="tipoDeEnvio" id="express">
  <label class="form-check-label" for="express">
    Express 5 a 8 días (7%)
  </label>
</div>
<div class="form-check">
  <input class="form-check-input" type="radio" name="tipoDeEnvio" id="standard">
  <label class="form-check-label" for="standard">
    Standard 12 a 15 días (5%)
  </label>
</div>
      </div>
      <div class="modal-footer">
        <button type="submit" class="btn btn-success" id="guardarcambiosEnvio">Guardar cambios</button>
      </div>
    </div>
  </div>
</div>


<!-- Modal -->
<div class="modal fade" id="metodoDePago" tabindex="-1" aria-labelledby="metodoDePago" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="metodoDePagoLabel">Elige como pagar:</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="form-check">
  <input class="form-check-input" type="radio" name="metodoDePago" id="credito">
  <label class="form-check-label" for="credito">
    Tarjeta de crédito
  </label>
</div>
<div class="form-check">
  <input class="form-check-input" type="radio" name="metodoDePago" id="debito">
  <label class="form-check-label" for="debito">
    Tarjeta de debito
  </label>
</div>
<div class="form-check">
  <input class="form-check-input" type="radio" name="metodoDePago" id="transferencia">
  <label class="form-check-label" for="transferencia">
    Transferencia Bancaria
  </label>
</div>
<div class="form-check">
  <input class="form-check-input" type="radio" name="metodoDePago" id="efectivo">
  <label class="form-check-label" for="efectivo">  
Efectivo en redes de cobranza
  </label>
</div>
      </div>
      <div class="modal-footer">
        <button type="submit" class="btn btn-success">Guardar cambios</button>
      </div>
    </div>
  </div>
</div>
        </div>
          <div class="card-body">
            <table class="table">
              <tbody>
                <tr>
                  <th scope="row">Subtotal:</th>
                  <td></td>
                  <td>UYU</td>
                  <td id="subtotalGen" class="campoDinero"></td>
                </tr>
                <tr>
                  <th scope="row">Envío:</th>
                  <td></td>
                  <td>UYU</td>
                  <td id="costoEnvio" class="campoDinero"></td>
                </tr>
                <tr>
                  <th scope="row">Total:</th>
                  <td></td>
                  <td>UYU</td>
                  <td id="total" class="campoDinero"></td>
                </tr>
              </tbody>
            </table>
            <button class="btn btn-success justify-content-center" id="RealizarCompra">Finalizar Compra</button>
          </div>
        </div>
      </div>
    `;

    // Insertar la estructura en el DOM
    tabladecompras.innerHTML = headDeTabla + contenidoDeCarrito + finalDeTabla + checkout;


    // Función para calcular el costo de envío y el total según el tipo de envío seleccionado
    function calcularCostoEnvioYTotal() {
      let subtotal = 0;
      comprasGuardadas.forEach((element, index) => {
        const inputCantidad = document.getElementById(`inputCantidad-${index}`);
        const nuevaCantidad = parseInt(inputCantidad.value) || 0;
        subtotal += element.price * nuevaCantidad;
      });
      // Mostrar el subtotal general en el campo con id subtotalGen
      document.getElementById("subtotalGen").textContent = subtotal;

      const costoEnvioElement = document.getElementById("costoEnvio");
      if (!costoEnvioElement) {
        console.error("El elemento con ID envio no existe en el DOM");
      }
      const totalElement = document.getElementById("total");

      // Tipo de envío y porcentaje asociado
      const opcionPremium = document.getElementById("premium");
      const opcionExpress = document.getElementById("express");
      const opcionStandard = document.getElementById("standard");

      let costoEnvio = 0;

      if (opcionPremium.checked) {
        costoEnvio = subtotal * 0.15;
      } else if (opcionExpress.checked) {
        costoEnvio = subtotal * 0.07;
      } else if (opcionStandard.checked) {
        costoEnvio = subtotal * 0.05;
      } else {
        costoEnvio = 0; // O asigna un valor predeterminado
      }

      // Mostrar el costo de envío en el DOM
      costoEnvioElement.innerHTML = parseInt(costoEnvio);

      // Calcular y mostrar el total
      const total = subtotal + costoEnvio;
      totalElement.textContent = parseInt(total);
    }

    // Agregar evento al botón "Guardar cambios" en el modal de envío
    document
      .getElementById("guardarcambiosEnvio")
      .addEventListener("click", () => { calcularCostoEnvioYTotal();});

      calcularCostoEnvioYTotal();

    // Agregar evento para actualizar subtotal al cambiar cantidad
    comprasGuardadas.forEach((element, index) => {
      const inputCantidad = document.getElementById(`inputCantidad-${index}`);
      const subTotal = document.getElementById(`subTotal-${index}`);

      inputCantidad.addEventListener('input', () => {
        // Forzamos el valor a ser un número, y si es NaN (por campo vacío), asumimos 0
        const nuevaCantidad = parseInt(inputCantidad.value) || 0; // Sin restar 1
        const nuevoSubtotal = element.price * nuevaCantidad;

        // Actualizamos el subtotal mostrado en la tabla
        subTotal.textContent = nuevoSubtotal;

        // Llamamos a la función para actualizar el subtotal general
        calcularCostoEnvioYTotal();

        // Llamamos a badge() para actualizar el contador
        badge();
      });
    });

    // Función para eliminar un producto del carrito
    window.eliminar = function(posicion) {
      const comprasGuardadas = JSON.parse(localStorage.getItem("compras"));
      comprasGuardadas.splice(posicion, 1); // Eliminamos el producto
      localStorage.setItem("compras", JSON.stringify(comprasGuardadas));
      cargarproductos(); // Recargamos los productos para reflejar el cambio
      badge(); // Actualizamos el contador
    };
  }
}
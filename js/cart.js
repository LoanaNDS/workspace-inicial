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
          <td class="align-middle"> ${element.price}</td>
          <td class="align-middle">
            <input type="number" min="0" class="cuantificador" id="inputCantidad-${index}" value="${element.quantity}">
          </td>
          <td class="align-middle" id="subTotal-${index}"> ${element.price * element.quantity}</td>
          <td class="align-middle"><i class="bi bi-trash" type="button" onclick='eliminar(${index})'></i></td>
        </tr>
      `;
    });

    // Cerramos la tabla y agregamos el contenido de checkout
    const finalDeTabla = `
        </tbody>
        </table> 
      </div>
      <div class="box"></div>
    `;
    const checkout = `
      <div class="container" id="checkout">
        <div class="card border-success" style="width: 26rem; height:auto;">
          <div class="card-body">
            <table class="table">
              <tbody>
                <tr>
                  <th scope="row">Subtotal:</th>
                  <td></td>
                  <td>$</td>
                  <td id="subtotalGen" ></td>
                  
                  
                </tr>
                <tr>
                  <th scope="row">Envío:</th>
                  <td></td>
                  <td></td>
                  <td>UYU 00.00</td>
                </tr>
                <tr>
                  <th scope="row">Total:</th>
                  <td></td>
                  <td></td>
                  <td>$</td>
                </tr>
              </tbody>
            </table>
            <button class="btn btn-success" id="RealizarCompra">Finalizar Compra</button>
          </div>
        </div>
      </div>
    `;

    // Insertar toda la estructura en el DOM
    tabladecompras.innerHTML = headDeTabla + contenidoDeCarrito + finalDeTabla + checkout;

// Función para actualizar el subtotal general
function actualizarSubtotalGeneral() {
  let subtotalGeneral = 0;
  comprasGuardadas.forEach((element, index) => {
    const inputCantidad = document.getElementById(`inputCantidad-${index}`);
    const nuevaCantidad = parseInt(inputCantidad.value) || 0;
    subtotalGeneral += element.price * nuevaCantidad;
  });
     // Mostrar el subtotal general en el campo con id subtotalGen
     document.getElementById("subtotalGen").textContent = subtotalGeneral;
    }

    // Agregar evento para actualizar subtotal al cambiar cantidad
    comprasGuardadas.forEach((element, index) => {
      const inputCantidad = document.getElementById(`inputCantidad-${index}`);
      const subTotal = document.getElementById(`subTotal-${index}`);

      inputCantidad.addEventListener('input', () => {
        // Forzamos el valor a ser un número, y si es NaN (por campo vacío), asumimos 0
        const nuevaCantidad = parseInt(inputCantidad.value) || 0;
        const nuevoSubtotal = element.price * nuevaCantidad;

        // Actualizamos el subtotal mostrado en la tabla
        subTotal.textContent = nuevoSubtotal;
         // Llamar a la función para actualizar el subtotal general
         actualizarSubtotalGeneral();
      });
    });
      // Función para eliminar un producto del carrito
      window.eliminar = function(posicion) {
        const comprasGuardadas = JSON.parse(localStorage.getItem("compras"));
        comprasGuardadas.splice(posicion, 1);
        localStorage.setItem("compras", JSON.stringify(comprasGuardadas));
        cargarproductos(); // Recargar los productos para reflejar el cambio
      };
      
     // Inicializar el subtotal general al cargar la página
     actualizarSubtotalGeneral();
  }
}

document.addEventListener("DOMContentLoaded", cargarproductos);

const contador = document.getElementById("contador");
const cont = document.getElementById("cont");

const comprasGuardadas = JSON.parse(localStorage.getItem("compras")) || [];
contador.innerHTML = comprasGuardadas.length;

if (comprasGuardadas.length === 0) {
  contador.style.display = 'none';
  cont.style.display = 'none';
}



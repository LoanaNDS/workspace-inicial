function cargarproductos(){
  // Paso el array de compras a objeto JS
  const comprasGuardadas = JSON.parse(localStorage.getItem("compras"));

  if (!comprasGuardadas || comprasGuardadas.length==0) {
    const paginavacia = document.getElementById("tablaDeCarrito");
    const carritovacio = `<div class="img-container" style="text-align: center;">
        <img src="img/carritovacio.svg"id="imagenCarroVacio"></img>
        <div id="alertaVacio">Oppss..parece que tu carrito esta vacio! Porque no das una vuelta por nuestra tienda?</div>
        </div>
        `;
    paginavacia.innerHTML = carritovacio;
  } else {
    // obtengo donde se va a ubicar la tabla en HTML
    const tabladecompras = document.getElementById("tablaDeCarrito");
    // creo la cabeza de la tabla para que aparezca una sola vez
    const headDeTabla = `<div class="table-responsive">
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
    // creo una variable vacia para ir guardando el contenido de foreach en las filas (se repite por producto)
    
    let contenidoDeCarrito = "";
    comprasGuardadas.forEach((element,index) => {
      contenidoDeCarrito += `
              <tr class="nombresTabla">
                <td><img src="${element.image}"class="img-thumbnail img-fluid imagenProductoComprado">${element.name}</td>
                <td class="align-middle">${element.price}</td>
                <td class="align-middle"><input type=number min="0" class="cuantificador" value="${element.quantity}"></input></td>
                <td class="align-middle">aqui va el subtotal</td>
                <td class="align-middle"><i class="bi bi-trash" type="button"onclick='eliminar(${index})'></i></td>
              </tr>
            `;
    });
    // cierro la tabla y agrego el checkout al final
    const finalDeTabla = `
            </tbody>
            </table> 
            </div>
            <div class=box></div>`;
    // recuadro donde se finaliza la compra
    const checkout = `<div class=container" id="checkout">
            <div class="card border-success"style="width: 26rem; height:auto;">
  <div class="card-body">
  <table class="table">
  <tbody>
    <tr>
      <th scope="row">Subtotal:</th>
      <td></td>
      <td></td>
      <td>$</td>
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
            // concateno todo para que se muestre
    tabladecompras.innerHTML =
      headDeTabla + contenidoDeCarrito + finalDeTabla + checkout;
    }
  }
function eliminar(posicion){
  const comprasGuardadas = JSON.parse(localStorage.getItem("compras"));
  comprasGuardadas.splice(posicion,1)
  localStorage.setItem("compras", JSON.stringify(comprasGuardadas));
  cargarproductos();
}

document.addEventListener("DOMContentLoaded", cargarproductos());

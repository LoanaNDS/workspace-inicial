function setProductID(id){
  localStorage.setItem("prodID",id);
  window.location="product-info.html";
}

document.addEventListener("DOMContentLoaded", () => {
  let idCategoria = localStorage.getItem("catID");

  fetch(
    "https://japceibal.github.io/emercado-api/cats_products/" +
      idCategoria +
      ".json"
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json(); // Parsear el JSON
    })
    .then((data) => {
      const productListElement = document.getElementById("product-list");
      // Vaciar el contenido previo
      productListElement.innerHTML = "";
      //Asumiendo que la estructura del JSON es una lista de productos
      data.products.forEach((element) => {
        const cardContent = `
<div class= "row container col-sm-12 col-md-4 col-lg-4">
<div onclick="setProductID(${element.id})" class="card mb-4 box-shadow col-ms-6">
        <img class="card-img-top" data-src="holder.js/100px225?theme=thumb&amp;bg=55595c&amp;fg=eceeef&amp;text=Thumbnail" alt="Thumbnail [100%x225]" src=${
          element.image
        } data-holder-rendered="true" style="height: 225px; width: 100%; display: block;">
        <div class="card-body">
        <h5 class="card-title"> ${element.name} </h5>
          <p class="card-text"> ${element.description} </p>
          <p class="card-text"> ${element.currency + element.cost} </p>
          <div class="d-flex justify-content-between align-items-center">
          <small class="text-muted"> Vendidos: ${element.soldCount}  </small>
          </div>
        </div>
      </div>
      </div>
`;
        productListElement.innerHTML += cardContent;
      });
      const getProducts = (arr) => {
        productListElement.innerHTML = "";
        arr.forEach((element) => {
          const cardContent = `
        <div class= "row container col-sm-12 col-md-4 col-lg-4">
        <div class="card mb-4 box-shadow col-ms-6">
                <img class="card-img-top" data-src="holder.js/100px225?theme=thumb&amp;bg=55595c&amp;fg=eceeef&amp;text=Thumbnail" alt="Thumbnail [100%x225]" src=${
                  element.image
                } data-holder-rendered="true" style="height: 225px; width: 100%; display: block;">
                <div class="card-body">
                <h5 class="card-title"> ${element.name} </h5>
                  <p class="card-text"> ${element.description} </p>
                  <p class="card-text"> ${element.currency + element.cost} </p>
                  <div class="d-flex justify-content-between align-items-center">
                  <small class="text-muted"> Vendidos: ${
                    element.soldCount
                  }  </small>
                  </div>
                </div>
              </div>
              </div>
        `;
          productListElement.innerHTML += cardContent;
        });
      };

      const botonAscendente = document.getElementById("botonAscendente");
      botonAscendente.addEventListener("click", () => {
        const productosAscendentes = data.products.sort(
          (a, b) => a.cost - b.cost
        );
        getProducts(productosAscendentes);
      });

      const botonDescendente = document.getElementById("botonDescendente");
      botonDescendente.addEventListener("click", () => {
        const productosDescendentes = data.products.sort(
          (a, b) => b.cost - a.cost
        );
        getProducts(productosDescendentes);
      });

      const filterInput = document.getElementById("inputPrecio");
      const filterInput2 = document.getElementById("inputPrecio2");
      const botonFiltro = document.getElementById("botonFiltro");
      const limpiarFiltro = document.getElementById("limpieza");
      const botonRelevancia = document.getElementById("botonRelevancia");

      botonFiltro.addEventListener("click", () => {
        const productosFiltrados = data.products.filter(
          (product) =>
            product.cost >= filterInput.value &&
            product.cost <= filterInput2.value
        );
        getProducts(productosFiltrados);
      });

      limpiarFiltro.addEventListener("click", () => {
        filterInput.value = "";
        filterInput2.value = "";
        getProducts(data.products);
      });

      botonRelevancia.addEventListener("click", () => {
        const productosRelevantes = data.products.sort(
          (a, b) => b.soldCount - a.soldCount
        );
        getProducts(productosRelevantes);
      });
    })
    .catch((error) => {
      console.error("Hubo un problema con la solicitud Fetch:", error);
    });
});

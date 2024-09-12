document.addEventListener('DOMContentLoaded', () => {
  let idCategoria = localStorage.getItem('catID')
    
  fetch("https://japceibal.github.io/emercado-api/cats_products/"+ idCategoria +".json")
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // Parsear el JSON
      })
      .then(data => {

        
        const productListElement = document.getElementById('product-list');
        // Vaciar el contenido previo
        productListElement.innerHTML = '';
  
        //Asumiendo que la estructura del JSON es una lista de productos
        data.products.forEach(element => {
        const cardContent = 
        `
        <div class= "row container col-sm-12 col-md-4 col-lg-4">
        <div class="card mb-4 box-shadow col-ms-6">
                <img class="card-img-top" data-src="holder.js/100px225?theme=thumb&amp;bg=55595c&amp;fg=eceeef&amp;text=Thumbnail" alt="Thumbnail [100%x225]" src=${element.image} data-holder-rendered="true" style="height: 225px; width: 100%; display: block;">
                <div class="card-body">
                <h5 class="card-title"> ${element.name} </h5>
                  <p class="card-text"> ${element.description} </p>
                  <p class="card-text"> ${element.currency+element.cost} </p>
                  <div class="d-flex justify-content-between align-items-center">
                  <small class="text-muted"> Vendidos: ${element.soldCount}  </small>
                  </div>
                </div>
              </div>
              </div>
        `
      productListElement.innerHTML += cardContent;

      });
            
  
          
        });
      })
      .catch(error => {
        console.error('Hubo un problema con la solicitud Fetch:', error);
      });

  
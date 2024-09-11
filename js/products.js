document.addEventListener("DOMContentLoaded", function () {
  let catID = localStorage.getItem("catID");  // Obtener el ID de la categoría
  let allProducts = [];  // Aquí guardaremos todos los productos de la categoría

  // Elemento del DOM para la búsqueda
  const searchInput = document.getElementById('searchInput');
  const productList = document.getElementById('product-list');

  // Verificar si hay un catID en el localStorage
  if (catID) {
      fetchProductsByCategory(catID);  // Llamar a la función para cargar los productos
  } else {
      console.error("No se ha seleccionado ninguna categoría.");
  }

  // Función para obtener los productos según el ID de la categoría
  async function fetchProductsByCategory(catID) {
      try {
          const response = await fetch(`https://japceibal.github.io/emercado-api/cats_products/${catID}.json`);
          const data = await response.json();
          allProducts = data.products;  // Guardar los productos en la variable global

          renderProducts(allProducts);  // Renderizar todos los productos
      } catch (error) {
          console.error("Error al cargar los productos:", error);
      }
  }

  // Función para renderizar los productos en la página
  function renderProducts(products) {
      productList.innerHTML = '';  // Limpiar la lista antes de agregar los productos filtrados

      products.forEach(product => {
          const productItem = document.createElement('div');
          productItem.className = 'col';
          productItem.innerHTML = `
              <div class="card shadow-sm">
                  <img src="${product.image}" class="card-img-top" alt="${product.name}">
                  <div class="card-body">
                      <h5 class="card-title">${product.name}</h5>
                      <p class="card-text">${product.description}</p>
                      <div class="d-flex justify-content-between align-items-center">
                          <small class="text-muted">${product.currency} ${product.cost}</small>
                      </div>
                  </div>
              </div>
          `;
          productList.appendChild(productItem);  // Añadir el producto al DOM
      });
  }

  // Función para filtrar productos según el término de búsqueda
  function filterProducts() {
      const searchTerm = searchInput.value.toLowerCase();
      const filteredProducts = allProducts.filter(product =>
          product.name.toLowerCase().includes(searchTerm) ||
          product.description.toLowerCase().includes(searchTerm)
      );
      renderProducts(filteredProducts);  // Renderizar los productos filtrados
  }

  // Escuchar el evento 'input' en el campo de búsqueda
  searchInput.addEventListener('input', filterProducts);
});

document.addEventListener('DOMContentLoaded', () => {
    fetch('https://japceibal.github.io/emercado-api/cats_products/101.json')
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
  
        // Asumiendo que la estructura del JSON es una lista de productos
        data.products.forEach(product => {
          const productItem = document.createElement('div');
          productItem.className = 'product-item';
  
          productItem.innerHTML = `
            <h2>${product.name}</h2>
            <p>${product.description}</p>
            <p>Price: $${product.price}</p>
            <img src="${product.image}" alt="${product.name}" />
          `;
  
          productListElement.appendChild(productItem);
        });
      })
      .catch(error => {
        console.error('Hubo un problema con la solicitud Fetch:', error);
      });
  });
  
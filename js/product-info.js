document.addEventListener("DOMContentLoaded", () => {
  const llamarIdProducto = localStorage.getItem("prodID");
  fetch(
    "https://japceibal.github.io/emercado-api/products/" +
      llamarIdProducto +
      ".json"
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Esto es un error");
      }
      return response.json();
    })
    .then((data) => {
      // Mostrar la información del producto en la página
      document.getElementById("product-name").textContent = data.name;
      document.getElementById("product-description").textContent =
        data.description;
      document.getElementById(
        "product-price"
      ).textContent = `${data.currency} ${data.cost}`;
      document.getElementById("product-category").textContent = data.category;

      // Mostrar las imágenes del producto
      const imageContainer = document.getElementById("product-images");
      data.images.forEach((imageUrl) => {
        const imgElement = document.createElement("img");
        imgElement.src = imageUrl;
        imgElement.alt = data.name;
        imgElement.classList.add("img-thumbnail", "m-2");
        imageContainer.appendChild(imgElement);
      });
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Hubo un problema al cargar la información del producto.");
    });

  fetch(
    "https://japceibal.github.io/emercado-api/products_comments/" +
      llamarIdProducto +
      ".json"
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Esto es un error");
      }
      return response.json();
    })
    .then((data) => {
      // Mostrar reseñas de los productos
      const comentarios = document.getElementById("contenedorComentario");
      data.forEach((element) => {
        //Pinta estrellas según el score
        const estrellas =
          "★".repeat(element.score) + "☆".repeat(5 - element.score);
        const contenidoComentario = `
      <div class="contenedorReseñas">
      <hr>
      <p>
      <strong>Fecha: </strong> ${element.dateTime}
      </p>
      <p>
      <strong>Usuario: </strong> ${element.user}
      </p>
      <p>
      ${element.description}
      </p>
      <p>
      ${estrellas} 
      </p>
      
      </div>
      `;
        comentarios.innerHTML += contenidoComentario;
      });
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Hubo un problema al cargar la información del producto.");
    });
});

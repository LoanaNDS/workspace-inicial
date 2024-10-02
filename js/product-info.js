function setProductID(id){
  localStorage.setItem("prodID",id);
  window.location="product-info.html";
}
document.addEventListener("DOMContentLoaded",()=>{

const llamarIdProducto = localStorage.getItem("prodID");
fetch("https://japceibal.github.io/emercado-api/products/" + llamarIdProducto + ".json")
.then((response)=>{
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
//mostrar los productos relacionados
const listaDeProdRelacionados = document.getElementById("cardsPR");
data.relatedProducts.forEach((element) =>{
   const contenidoDePR = `
    <div class="col">
<div class="card bg-dark text-white" onclick="setProductID(${element.id})">
 <img class="card-img" src=${element.image} alt="Card image">
 <div class="card-img-overlay">
   <h5 class="card-title" id="card-titlePR">${element.name}</h5>
 </div>
</div>
   `;
   listaDeProdRelacionados.innerHTML+= contenidoDePR;

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

/* Parte de enviar estrellas y comentario */

const ratings = document.querySelectorAll('.star-rating input');
ratings.forEach(radio => {
  radio.addEventListener('change', () => {
    console.log(`Rated: ${radio.value} stars`);
    // Aquí puedes agregar funcionalidad para enviar la calificación
  });
});

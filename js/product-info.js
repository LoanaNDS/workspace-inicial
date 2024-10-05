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
    selectedRating = parseInt(radio.value); //Actualizar NUEVO
    console.log(`Rated: ${radio.value} stars`);
    // Aquí puedes agregar funcionalidad para enviar la calificación
  });
});

// Función para enviar comentario

let selectedRating = 0; 

// Función para guardar el comentario en Local Storage
function guardarComentario(comentario) {
  let comentarios = JSON.parse(localStorage.getItem('comentarios')) || [];
  comentarios.push(comentario);
  localStorage.setItem('comentarios', JSON.stringify(comentarios));
}

// Función para mostrar el comentario
function mostrarComentario(element) {
  const comentarios = document.getElementById("contenedorComentario");
  const estrellas = "★".repeat(element.score) + "☆".repeat(5 - element.score);
  const contenidoComentario = `
    <div class="contenedorReseñas">
      <hr>
      <p><strong>Fecha: </strong> ${element.dateTime}</p>
      <p><strong>Usuario: </strong> ${element.user}</p>
      <p>${element.description}</p>
      <p>${estrellas}</p>
    </div>
  `;
  
  comentarios.innerHTML += contenidoComentario;
  console.log("Comentario mostrado:", contenidoComentario);
}

// Función para enviar comentario
document.getElementById('botonEnviar').addEventListener('click', () => {
  const comentario = document.getElementById('review-text').value;
  const fecha = new Date().toLocaleString(); // Agrega la fecha actual
  const usuario = localStorage.getItem("user");; // Cambia esto a la lógica de usuario real
  console.log("Mensaje 1");

  if (comentario && selectedRating > 0) {
    const nuevoComentario = {
      dateTime: fecha,
      user: usuario,
      description: comentario,
      score: selectedRating
    };

    console.log("Mensaje 3", nuevoComentario);
    guardarComentario(nuevoComentario);
    mostrarComentario(nuevoComentario);

    // Limpia el textarea y la puntuación seleccionada
    document.getElementById('review-text').value = '';
    selectedRating = 0;
    const ratings = document.querySelectorAll('.star-rating input');
    ratings.forEach(radio => radio.checked = false);
  } else {
    alert('Por favor, escribe un comentario y selecciona una calificación.');
  }
});

// Función para cargar comentarios al iniciar
function cargarComentarios() {
  const comentarios = JSON.parse(localStorage.getItem('comentarios')) || [];
  comentarios.forEach(comentario => mostrarComentario(comentario));
}

// Cargar los comentarios al iniciar
window.onload = cargarComentarios;

  

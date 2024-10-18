document.addEventListener('DOMContentLoaded', ()=> {
/* Visulizando email al momento de entrar a Mi Perfil */
  const Email = document.getElementById('email');
  Email.value = localStorage.getItem('user');


/* Guardando los datos del formulario en Local Storage */
  function guardadoDatos() {

  const nombre = document.getElementById('nombre').value;
  const segundoNombre = document.getElementById('segundoNombre').value;
  const apellido = document.getElementById('apellido').value;
  const segundoApellido = document.getElementById('segundoApellido').value;
  const email = document.getElementById('email').value;
  const telefono = document.getElementById('telefono').value;


  if (nombre) {
    localStorage.setItem('nombre', nombre);
  }
  if (segundoNombre) {
    localStorage.setItem('segundoNombre', segundoNombre);
  }
  if (apellido) {
    localStorage.setItem('apellido', apellido);
  }
  if (segundoApellido) {
    localStorage.setItem('segundoApellido', segundoApellido);
  }
  if (email) {
    localStorage.setItem('email', email);
  }
  if (telefono) {
    localStorage.setItem('telefono', telefono);
  }
}

/* Validacion de datos con Boostrap */
(function () {
    'use strict'
  
    var forms = document.querySelectorAll('.needs-validation')
  
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }else{
          guardadoDatos()

          }
  
          form.classList.add('was-validated')
        }, false)
      })
  })()




})

///////////////////////////////////////////////////////////////////////////////////////
// Manejar cambio de foto de perfil
const inputFotoPerfil = document.getElementById('inputFotoPerfil');
const imgFotoPerfil = document.getElementById('imgFotoPerfil'); 

inputFotoPerfil.addEventListener('change', function(evento) {
    const archivoSeleccionado = evento.target.files[0];
    if (archivoSeleccionado) {
        const lectorArchivo = new FileReader(); 
        lectorArchivo.onload = function(evento) {
            imgFotoPerfil.src = evento.target.result; // Establecer la fuente de la imagen
            localStorage.setItem('fotoPerfil', evento.target.result); 
        };
        lectorArchivo.readAsDataURL(archivoSeleccionado);
    }
});

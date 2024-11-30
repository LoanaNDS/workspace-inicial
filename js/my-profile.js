document.addEventListener('DOMContentLoaded', ()=> {
  // Constantes globales y carga de datos
  
  const Email = document.getElementById('email');
  Email.value = localStorage.getItem('user');

  const nombre = document.getElementById('nombre');
  nombre.value = localStorage.getItem('nombre');

  const segundoNombre = document.getElementById('segundoNombre');
  segundoNombre.value = localStorage.getItem('segundoNombre');

  const apellido = document.getElementById('apellido');
  apellido.value = localStorage.getItem('apellido');

  const segundoApellido = document.getElementById('segundoApellido');
  segundoApellido.value = localStorage.getItem('segundoApellido');

  const telefono = document.getElementById('telefono').value;
  telefono.value = localStorage.getItem('telefono');

  const imgFotoPerfil = document.getElementById('imgFotoPerfil'); 
  imgFotoPerfil.src = localStorage.getItem('fotoPerfil');

 // UI Switch
const inputSwitch = document.getElementById('inputSwitch');
const navbar = document.querySelector('.navbar'); // Seleccionamos el elemento navbar
const div = document.getElementById('darkcontent'); // Seleccionamos el div adicional

inputSwitch.addEventListener('change', () => {
  if (!document.body.classList.contains('dark')) {
    // Modo oscuro activado
    document.body.classList.add('dark');
    navbar.classList.add('dark_'); // Clase específica para la navbar
    div.classList.add('dark');
  } else {
    // Modo oscuro desactivado
    document.body.classList.remove('dark');
    navbar.classList.remove('dark_'); // Clase específica para la navbar
    div.classList.remove('dark');
  }
});




/* Guardando los datos del formulario en Local Storage */
  function guardadoDatos() {
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
          event.preventDefault() // Detiene que la página se recargue.
          if (!form.checkValidity()) {
            event.stopPropagation()
            }
            guardadoDatos() // Guarda los datos ingresados en el formulario

          form.classList.add('was-validated')
        }, false)
      })
  })
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

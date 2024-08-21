document.addEventListener('DOMContentLoaded', () => {
    const botonIngresar = document.getElementById('botonIngresar');
    const formulario = document.querySelector('form.login');
  
    botonIngresar.addEventListener('click', (event) => {
    
      event.preventDefault();
  
      
      const usuario = document.getElementById('usuario').value.trim();
      const contrasena = document.getElementById('contrasena').value.trim();
  
    
      if (usuario === '' || contrasena === '') {
        alert('Por favor, complete todos los campos.');
      } else {
        window.location.href = 'portada.html';
      }
    });
  });
  
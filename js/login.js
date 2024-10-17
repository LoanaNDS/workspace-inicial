document.addEventListener('DOMContentLoaded', () => {
    const botonIngresar = document.getElementById('botonIngresar');
    const formulario = document.querySelector('form.login');
    
    botonIngresar.addEventListener('click', (event) => {
    
      event.preventDefault();
  
      
      const usuario = document.getElementById('usuario').value.trim();
      const contrasena = document.getElementById('contrasena').value.trim();
      const emailValidado = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
      if (usuario === '' || contrasena === '') {
        alert('Por favor, complete todos los campos.');
        return
      
      } 
      if (!emailValidado.test(usuario)) {
        alert('Por favor, ingresa un correo válido');
      return
      } else {
        window.location.href = 'index.html';
        localStorage.setItem("user",usuario)
      }
    });
  });
  
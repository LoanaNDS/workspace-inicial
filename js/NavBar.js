document.addEventListener("DOMContentLoaded", function () {
  var nombreUsuario = localStorage.getItem("user");

  if (nombreUsuario) {
    var navbar = document.querySelector(".navbar-nav");
    var userItem = document.createElement("li");
    userItem.classList.add("nav-item");
    userItem.innerHTML = `<div class="dropdown">
        <a class="btn btn-success dropdown-toggle" href="my-profile.html"role="button" data-bs-toggle="dropdown" aria-expanded="false">${nombreUsuario}</a>
        <ul class="dropdown-menu">
    <li><a class="dropdown-item" href="cart.html">Mi Carrito</a></li>
    <li><a class="dropdown-item" href="my-profile.html">Mi Perfil</a></li>
    <li><hr class="dropdown-divider"></li>
    <li><a class="dropdown-item" href="login.html">Cerrar sesión</a></li>
  </ul>
  </div>`;
    navbar.appendChild(userItem);
  }
});

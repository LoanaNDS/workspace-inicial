document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
    let usuarioGuardado = localStorage.getItem("user");
    
    if (usuarioGuardado==null){
        this.location.href="login.html";
    }
    var nombreUsuario = localStorage.getItem("user");
      
      if (nombreUsuario) {
        var navbar = document.querySelector(".navbar-nav");
        var userItem = document.createElement("li");
        userItem.classList.add("nav-item");
        userItem.innerHTML = `<a class="nav-link" href="my-profile.html">${nombreUsuario}</a>`;
        navbar.appendChild(userItem);
      }
});
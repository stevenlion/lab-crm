document.getElementById('logout-link').addEventListener('click', function(event) {
    event.preventDefault(); // Evita la acción predeterminada del enlace
  
    // Limpiar el id de sesión almacenado en sessionStorage
    sessionStorage.removeItem('idSessionStart');
  
    // Redireccionar a la página de inicio de sesión
    window.location.href = './auth-logout.html';
  });
  
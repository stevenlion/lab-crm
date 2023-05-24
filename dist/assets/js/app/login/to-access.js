let idSessionStart = sessionStorage.getItem('idSessionStart') || null;

document.getElementById('login-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Evita el envío del formulario por defecto

  const email = document.getElementById('email-input').value;
  const password = document.getElementById('password-input').value;

  // Validar campos vacíos
  if (!email || !password) {
    showAlert('Por favor, completa todos los campos');
    return;
  }

  const formData = new FormData();
  formData.append('email', email);
  formData.append('password', password);

  fetch('https://api.lab-crm.ws/login/to-access.php', {
    method: 'POST',
    body: formData
  })
    .then(response => response.json())
    .then(responseData => {
      if (responseData.success) {
        // Login exitoso, redireccionar al index.html
        console.log(responseData.message);
        idSessionStart = responseData.user.id;
        sessionStorage.setItem('idSessionStart', idSessionStart);
        window.location.href = './index.html';
      } else {
        // Error en el login, mostrar mensaje de error
        showAlert(responseData.message);
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
});

function showAlert(message) {
  const alertContainer = document.getElementById('alert-container');
  alertContainer.textContent = message;
  alertContainer.classList.add('show');

  setTimeout(() => {
    alertContainer.classList.remove('show');
  }, 3000);
}
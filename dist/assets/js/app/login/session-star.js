const idSessionStartConsult = sessionStorage.getItem('idSessionStart') || null;

if (idSessionStartConsult === null) {
    window.location.href = './auth-logout.html';
}

// Función para realizar la solicitud y actualizar los resultados
function fetchAndRenderResults() {

  // Generar un valor único para cacheBust
  const cacheBust = Date.now();

  // Realizar la solicitud GET a la API
  fetch(`https://api.lab-crm.ws/login/user-data.php?id=${idSessionStartConsult}&cacheBust=${cacheBust}`)
    .then(response => response.json()) // Decodificar la respuesta JSON
    .then(data => {
      if (Array.isArray(data)) {
        // Llamar a la función para procesar y mostrar los elementos de la lista
        renderListItems(data);

        document.getElementById('nameUsers-text').textContent = data[0].name + ' ' + data[0].surnames;
        document.getElementById('namePhoneNumber-text').textContent = data[0].phone_number;
        document.getElementById('nameEmail-text').textContent = data[0].email;
        document.getElementById('nameBranchOffice-text').textContent = data[0].branch_office;
        document.getElementById('nameLastLoginDate-text').textContent = data[0].last_login_date;

      } else {
        console.log('Error al decodificar el archivo JSON');
      }
    })
    .catch(error => {
      console.log('Error en la solicitud:', error);
    })
}

// Llamar a la función por primera vez
fetchAndRenderResults();

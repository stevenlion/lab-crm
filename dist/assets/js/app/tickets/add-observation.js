// Variables globales para almacenar el último estado de los datos
let idTicket = '';

function handleClickIdObservacion(element) {
    event.preventDefault();
    
    // Obtener el valor de href del elemento
    idTicket = element.getAttribute('href');
    
    // Realizar las operaciones necesarias con el valor de idTicket
    console.log('Ticketid:', idTicket);
    // ...otro código aquí
    
}

// Obtén una referencia al elemento donde deseas asignar la función al presionar Enter
const inputIdTicket = document.getElementById('id-ticket-input');
const inputObservation = document.getElementById('add-observation-input');

// Asigna la función al evento keydown o keyup del elemento
inputObservation.addEventListener('keydown', function(event) {
  // Verifica si la tecla presionada es Enter
  if (event.key === 'Enter' || event.key === '13') {
    // Llama a tu función aquí
    event.preventDefault();
  }
});

// Capturar el evento de clic del botón de envío
document.getElementById('btn-add-observation').addEventListener('click', function(event) {
  event.preventDefault(); // Evitar que la página se recargue
  
// Verificar si se ingresaron todos los campos
if (idTicket !== '') {
    // Crear objeto FormData y agregar los campos necesarios
    const formData = new FormData();
    formData.append('idticket', idTicket);
    formData.append('observation', inputObservation.value);
  
    fetch('https://api.lab-crm.ws/tickets/add-observation/', {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        console.log(data.message);
        showAlert(data.message);
      })
      .catch(error => {
        console.error('Failed to create observation:', error);
        showAlert('Failed to add observation');
      });
  
    // Restablecer el valor del campo de entrada
    inputObservation.value = '';
  } else {
    // Mostrar un mensaje de error si no se ingresó ningún campo
    const feedbackElement = document.querySelector('.add-observation-input');
    feedbackElement.textContent = 'Por favor, ingresa todos los campos';
  }  
});

function showAlert(message) {
    const alertContainer = document.getElementById('alert-container');
    alertContainer.textContent = message;
    alertContainer.classList.add('show');
  
    setTimeout(() => {
      alertContainer.classList.remove('show');
    }, 3000);
}

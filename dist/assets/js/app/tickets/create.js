// Obtén una referencia al elemento donde deseas asignar la función al presionar Enter
const ElementCellPhoneNumber = document.getElementById('ticket-cell-phone-number-input');
const ElementPriority = document.getElementById('ticket-priority-input');
const ElementResponsible = document.getElementById('ticket-responsible-input');
const ElementAffair = document.getElementById('ticket-affair-input');
const ElementObservation = document.getElementById('ticket-observation-input');

// Asigna la función al evento keydown o keyup del elemento
ElementObservation.addEventListener('keydown', function(event) {
  // Verifica si la tecla presionada es Enter
  if (event.key === 'Enter' || event.key === 13) {
    // Llama a tu función aquí
    event.preventDefault();
  }
});

// Capturar el evento de clic del botón de envío
document.getElementById('btn-create-ticket').addEventListener('click', function(event) {
  event.preventDefault(); // Evitar que la página se recargue
  
  // Verificar si se ingresaron todos los campos
  if (ElementCellPhoneNumber !== '') {
    // Crear objeto FormData y agregar los campos necesarios
    const formData = new FormData();
    formData.append('cell_phone_number', ElementCellPhoneNumber.value);
    formData.append('priority', ElementPriority.value);
    formData.append('responsible', ElementResponsible.value);
    formData.append('affair', ElementAffair.value);
    formData.append('observation', ElementObservation.value);
    formData.append('state', '1');
  
    fetch('https://api.lab-crm.ws/tickets/create/', {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        console.log(data.message);
        
        fetchAndRenderResultsTickets();
        showAlert(data.message);
      })
      .catch(error => {
        console.error('Failed to create ticket:', error);
      });
  
    // Restablecer el valor del campo de entrada
    ElementPriority.value = '';
    ElementResponsible.value = '';
    ElementAffair.value = '';
    ElementObservation.value = '';
  } else {
    // Mostrar un mensaje de error si no se ingresó ningún campo
    const feedbackElement = document.querySelector('.ticket-observation-input');
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
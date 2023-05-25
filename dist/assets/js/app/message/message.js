// Obtén una referencia al elemento donde deseas asignar la función al presionar Enter
var inputElement = document.getElementById('chat-input');

// Asigna la función al evento keydown o keyup del elemento
inputElement.addEventListener('keydown', function(event) {
  // Verifica si la tecla presionada es Enter
  if (event.key === 'Enter' || event.key === 13) {
    // Llama a tu función aquí
    event.preventDefault();
  }
});


// Capturar el evento de clic del botón de envío
document.getElementById('btn-send-message').addEventListener('click', function(event) {
  event.preventDefault(); // Evitar que la página se recargue

  // Obtener el mensaje ingresado
  const inputElement = document.getElementById('chat-input');

  const message = inputElement.value.trim();

  // Verificar si se ingresó un mensaje válido
  if (message !== '') {
    // Enviar mensaje
    const params = new URLSearchParams({
      token: 'w8iavep1womskmas',
      to: document.getElementById('chatId-text').textContent,
      body: message,
      priority: '1',
      referenceId: '',
      msgId: '',
      mentions: ''
    });

    fetch('https://api.ultramsg.com/instance10658/messages/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: params.toString()
    })
      .then(response => response.text())
      .then(data => {
        console.log('Respuesta de la API:', data);
      })
      .catch(error => {
        console.error('Error al enviar el mensaje:', error);
      });

    // Restablecer el valor del campo de entrada
    inputElement.value = '';
  } else {
    // Mostrar un mensaje de error si no se ingresó ningún mensaje
    const feedbackElement = document.querySelector('.chat-input-feedback');
    feedbackElement.textContent = 'Por favor, ingresa un mensaje';
  }
});

// Variables globales para almacenar el último estado de los datos
let lastListItems = '';

// Función para procesar y mostrar los elementos de la lista
function renderListItems(data) {
	// Variable para almacenar los elementos de lista
	let listItems = '';

	// Limitar el número de elementos a procesar utilizando slice
	const limitedData = data.slice(0, 50); // Limitar a los primeros 30 elementos

	// Iterar sobre los elementos del arreglo limitado
	limitedData.forEach(item => {
		// Acceder a las propiedades de cada elemento
		const id = item.id;
		const name = item.name;
		const unread = item.unread;

		// Construir el elemento de lista y agregarlo a la variable
		listItems += `
			<li id="contact-id-6" data-name="direct-message">                  
                <a class="unread-msg-user" href="${id}" onclick="handleClick(this)">                   
                    <div class="d-flex align-items-center">                      
                        <div class="chat-user-img online align-self-center me-2 ms-0">                          
                            <img src="assets/images/users/user-dummy-img.jpg" class="rounded-circle avatar-xs" alt=""><span class="user-status"></span>                      
                        </div>                      
                        <div class="overflow-hidden">                          
                            <p class="text-truncate mb-0">${name}</p>                      
                        </div>                      
                        <div class="ms-auto"><span class="badge badge-soft-dark rounded p-1">${unread}</span></div>                  
                    </div>              
                </a>          
            </li>
		`;
	});

	// Obtener el elemento ul donde se mostrarán los resultados
	const ulElement = document.getElementById('listItems');

	// Comparar el contenido actual con el último contenido generado
	if (listItems !== lastListItems) {
		// Asignar los elementos de lista al contenido del ul solo si ha habido cambios
		ulElement.innerHTML = listItems;

		// Actualizar el último contenido generado
		lastListItems = listItems;
	}
}

// Función para realizar la solicitud y actualizar los resultados
function fetchAndRenderResults() {

	// Generar un valor único para cacheBust
    const cacheBust = Date.now();

	// Realizar la solicitud GET a la API
	fetch(`https://api.ultramsg.com/instance10658/chats?token=w8iavep1womskmas&page=1&limit=50&sort=desc&cacheBust=${cacheBust}`)
		.then(response => response.json()) // Decodificar la respuesta JSON
		.then(data => {
			if (Array.isArray(data)) {
				// Llamar a la función para procesar y mostrar los elementos de la lista
				renderListItems(data);
			} else {
				console.log('Error al decodificar el archivo JSON');
			}
		})
		.catch(error => {
			console.log('Error en la solicitud:', error);
		})
		.finally(() => {
			// Llamar a la función nuevamente después de 8 segundos
			setTimeout(fetchAndRenderResults, 8000);
		});
}

// Llamar a la función por primera vez
fetchAndRenderResults();
// Variables globales para almacenar el último estado de los datos
let lastListItemsTickets = '';


// Función para procesar y mostrar los elementos de la lista
function renderListItemsTickets(data) {
	// Variable para almacenar los elementos de lista
	let listItemsTickets = '';

	// Limitar el número de elementos a procesar utilizando slice
	const limitedData = data.slice(0, 50); // Limitar a los primeros 30 elementos

	// Iterar sobre los elementos del arreglo limitado
	limitedData.forEach(item => {
		// Acceder a las propiedades de cada elemento
		const id = item.id;
		const affair = item.affair;
		const freation_date = item.freation_date;
		const state = item.state;
    
		let iconsstatus;
		let colorstatus;
		let colortext;

		if (state === 'Pendiente' || state === 'En proceso') {
			iconsstatus = 'bx bx-task-x';
			colorstatus = 'danger';
			colortext = 'dark';
		} else {
			iconsstatus = 'bx bx-task';
			colorstatus = 'primary';
			colortext = 'primary';
		}

		// Construir el elemento de lista y agregarlo a la variable
		listItemsTickets += `<li>
		<div class="d-flex align-items-center">
			<div class="flex-shrink-0 avatar-xs ms-1 me-3">
				<div class="avatar-title bg-soft-${colorstatus} text-${colortext} rounded-circle">
					<i class="${iconsstatus}"></i>
					</div>
				</div>
				<div class="flex-grow-1 overflow-hidden">
					<h5 class="font-size-14 mb-1"><a href="#" class="text-truncate p-0">${id} - ${affair}</a></h5>
					<p class="text-muted text-truncate font-size-13 mb-0">${freation_date}</p>
				</div>
			</div>
		</li>
		`;
	});

	// Obtener el elemento ul donde se mostrarán los resultados
	const ulElement = document.getElementById('listRead');

	// Comparar el contenido actual con el último contenido generado
	if (listItemsTickets !== lastListItemsTickets) {
		// Asignar los elementos de lista al contenido del ul solo si ha habido cambios
		ulElement.innerHTML = listItemsTickets;

		// Actualizar el último contenido generado
		lastListItemsTickets = listItemsTickets;
	}
}

// Función para realizar la solicitud y actualizar los resultados
function fetchAndRenderResultsTickets() {

	// Generar un valor único para cacheBust
	const cacheBust = Date.now();

	// Realizar la solicitud GET a la API
	fetch(`https://api.vitalidadintegral.store/tickets/read/?responsible=1&cacheBust=${cacheBust}`)
		.then(response => response.json()) // Decodificar la respuesta JSON
		.then(data => {
			if (Array.isArray(data)) {
				// Llamar a la función para procesar y mostrar los elementos de la lista
				renderListItemsTickets(data);
			} else {
				console.log('Error al decodificar el archivo JSON');
			}
		})
		.catch(error => {
			console.log('Error en la solicitud:', error);
		})
}

// Llamar a la función por primera vez
fetchAndRenderResultsTickets();
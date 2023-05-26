// Variables globales para almacenar el último estado de los datos
let lastHtmlContent = '';
let chatId = '';
let chatIdUserName = '';
let contactNumber = '';

function handleClick(element) {
    event.preventDefault();
    
    // Obtener el valor de href del elemento
    chatId = element.getAttribute('href');
        
    // Obtiene el elemento del documento con el Id y lo asigna a la variable chatIdUserName
    chatIdUserName = document.getElementById('chatId-text');
    contactNumber = document.getElementById('ticket-cell-phone-number-input');

    // Asigna el valor de la variable chatId al contenido de texto del elemento chatIdUserName
    chatIdUserName.textContent = chatId;
    contactNumber.value = chatId;

    var container = document.querySelector('.simplebar-content-wrapper');
    
    container.scrollTop = container.scrollHeight;




    // Llamar a la función para solicitar y renderizar los mensajes con el chatId
    fetchAndRenderMessages();
}

// Función para procesar y mostrar los mensajes
function renderMessages(data) {
	// Variable para almacenar el contenido HTML generado
	let htmlContent = '';

	// Iterar sobre los mensajes del arreglo
	data.forEach(item => {
		// Acceder a las propiedades de cada mensaje
		const fromMe = item.fromMe;
		const from = item.from;
		const body = item.body;
        const bodyImg = item.body;
        const type = item.type;

		// Construir el contenido HTML según la condición
		if (fromMe === true) {
            // Resaltar los asteriscos con la etiqueta <strong>
            const formattedBody = body.replace(/\*(.*?)\*/g, '<strong>$1</strong>');
            
            if (type === 'image') {

                if (body === '') {

                    htmlContent += ``;
                    
                } else {

                    htmlContent += `
                    <li class="chat-list right" id="chat-list-1">                
                        <div class="conversation-list">                    
                            <div class="user-chat-content">                        
                                <div class="ctext-wrap">                            
                                    <div class="ctext-wrap-content">                                
                                        <p class="mb-0 ctext-content">${formattedBody}</p>   
                                    </div>                                            
                                </div>                    
                                <div class="conversation-name">                        
                                    <small class="text-muted time">00:00</small>                       
                                    <span class="text-success check-message-icon"><i class="bx bx-check"></i></span>                    
                                </div>                
                            </div>            
                        </div>        
                    </li>
                `;
                    
                }

            } else if (type === 'e2e_notification') {
            
                htmlContent += ``;

            } else if (type === 'protocol') {
            
                htmlContent += ``;

            } else if (type === 'call_log') {
            
                htmlContent += ``;

            } else if (type === 'revoked') {
            
                htmlContent += `
				<li class="chat-list right" id="chat-list-1">                
                    <div class="conversation-list">                    
                        <div class="user-chat-content">                        
                            <div class="ctext-wrap">                            
                                <div class="ctext-wrap-content">                                
                                    <p class="mb-0 ctext-content">Se eliminó este mensaje.</p>   
                                </div>                                            
                            </div>                    
                            <div class="conversation-name">                                             
                                <span class="text-success check-message-icon"><i class="bx bx-check"></i></span>                    
                            </div>                
                        </div>            
                    </div>        
                </li>
			`;

            } else {

                htmlContent += `
				<li class="chat-list right" id="chat-list-1">                
                    <div class="conversation-list">                    
                        <div class="user-chat-content">                        
                            <div class="ctext-wrap">                            
                                <div class="ctext-wrap-content">                                
                                    <p class="mb-0 ctext-content">${formattedBody}</p>   
                                </div>                                            
                            </div>                    
                            <div class="conversation-name">                        
                                <small class="text-muted time">00:00</small>                       
                                <span class="text-success check-message-icon"><i class="bx bx-check"></i></span>                    
                            </div>                
                        </div>            
                    </div>        
                </li>
			`;
            
            }

		} else {
            // Resaltar los asteriscos con la etiqueta <strong>
            const formattedBody = body.replace(/\*(.*?)\*/g, '<strong>$1</strong>');

            if (type === 'image') {

                if (body === '') {

                    htmlContent += ``;
                    
                } else {

                    htmlContent += `
				<li class="chat-list left" id="8">                        
                    <div class="conversation-list">
                        <div class="chat-avatar">
                            <img src="assets/images/users/user-dummy-img.jpg" alt="">
                        </div>
                        <div class="user-chat-content">
                            <div class="ctext-wrap">
                                <div class="ctext-wrap-content" id="8">        
                                    <p class="mb-0 ctext-content">${formattedBody}</p>
                                </div>
                            </div>
                            <div class="conversation-name">
                                <small class="text-muted time">

                                </small> 
                                <span class="text-success check-message-icon">
                                    <i class="bx bx-check-double"></i>
                                </span>
                            </div>
                        </div>                
                    </div>           
                </li>
			`;
                    
                }

            } else if (type === 'e2e_notification') {
            
                htmlContent += ``;

            } else if (type === 'protocol') {
            
                htmlContent += ``;

            } else if (type === 'call_log') {
            
                htmlContent += ``;

            } else if (type === 'revoked') {

                htmlContent += `
				<li class="chat-list left" id="8">                        
                    <div class="conversation-list">
                        <div class="chat-avatar">
                            <img src="assets/images/users/user-dummy-img.jpg" alt="">
                        </div>
                        <div class="user-chat-content">
                            <div class="ctext-wrap">
                                <div class="ctext-wrap-content" id="8">        
                                    <p class="mb-0 ctext-content">Se eliminó este mensaje.</p>
                                </div>
                            </div>
                            <div class="conversation-name">
                                <small class="text-muted time">

                                </small> 
                                <span class="text-success check-message-icon">
                                    <i class="bx bx-check-double"></i>
                                </span>
                            </div>
                        </div>                
                    </div>           
                </li>
			`;
                
            } else {

                htmlContent += `
				<li class="chat-list left" id="8">                        
                    <div class="conversation-list">
                        <div class="chat-avatar">
                            <img src="assets/images/users/user-dummy-img.jpg" alt="">
                        </div>
                        <div class="user-chat-content">
                            <div class="ctext-wrap">
                                <div class="ctext-wrap-content" id="8">        
                                    <p class="mb-0 ctext-content">${formattedBody}</p>
                                </div>
                            </div>
                            <div class="conversation-name">
                                <small class="text-muted time">

                                </small> 
                                <span class="text-success check-message-icon">
                                    <i class="bx bx-check-double"></i>
                                </span>
                            </div>
                        </div>                
                    </div>           
                </li>
			`;
                
            }

		}
	});

	// Obtener el elemento div donde se mostrarán los resultados
	const divElement = document.getElementById('resultChatDiv');

	// Comparar el contenido actual con el último contenido generado
	if (htmlContent !== lastHtmlContent) {
		// Asignar el contenido HTML al div solo si ha habido cambios
		divElement.innerHTML = htmlContent;

		// Actualizar el último contenido generado
		lastHtmlContent = htmlContent;

		// Hacer scroll hasta el final del div
		divElement.scrollTop = divElement.scrollHeight;
	}
}

// Función para realizar la solicitud y actualizar los resultados
function fetchAndRenderMessages() {

    // Generar un valor único para cacheBust
    const cacheBust = Date.now();

	// Realizar la solicitud GET a la API
	fetch(`https://api.ultramsg.com/instance10658/chats/messages?chatId=${chatId}&token=w8iavep1womskmas&page=1&limit=20&cacheBust=${cacheBust}`)
		.then(response => response.json()) // Decodificar la respuesta JSON
		.then(data => {
			if (Array.isArray(data)) {
				// Llamar a la función para procesar y mostrar los mensajes
				renderMessages(data);
			} else {
				console.log('Error al decodificar el archivo JSON');
			}
		})
		.catch(error => {
			console.log('Error en la solicitud:', error);
		})
		.finally(() => {
			// Llamar a la función nuevamente después de 8 segundos
			setTimeout(fetchAndRenderMessages, 8000);
		});
}

// Llamar a la función por primera vez
fetchAndRenderMessages();

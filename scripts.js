document.addEventListener('DOMContentLoaded', function() {
    const sendButton = document.getElementById('send-button');
    const messageInput = document.getElementById('message-input');
    const chatMessages = document.getElementById('chat-messages');
    
    const apiUrl = 'https://api-azure.botsonic.ai/v1/botsonic/generate';
    const apiKey = 'tu-clave-api-aqui';  // Reemplaza con tu clave API de Botsonic
    
    sendButton.addEventListener('click', async function() {
        const message = messageInput.value.trim();
        if (message) {
            appendMessage('You', message);  // Mostrar el mensaje del usuario
            messageInput.value = '';
            chatMessages.scrollTop = chatMessages.scrollHeight; // Desplazar hacia abajo

            // Enviar el mensaje al bot
            const response = await getBotResponse(message);
            appendMessage('Bot', response);  // Mostrar la respuesta del bot
        }
    });
    
    messageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendButton.click();
        }
    });

    function appendMessage(sender, text) {
        const messageElement = document.createElement('div');
        messageElement.className = 'chat-message';
        messageElement.innerHTML = `<strong>${sender}:</strong> ${text}`;
        chatMessages.appendChild(messageElement);
    }

    async function getBotResponse(message) {
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`  // Usar el encabezado de autorización si es necesario
                },
                body: JSON.stringify({ message: message })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            return data.response;  // Ajusta esto según el formato de la respuesta de la API
        } catch (error) {
            console.error('Error:', error);
            return 'Lo siento, hubo un error al procesar tu solicitud.';
        }
    }
});


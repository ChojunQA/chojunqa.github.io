document.addEventListener('DOMContentLoaded', function() {
    const sendButton = document.getElementById('send-button');
    const messageInput = document.getElementById('message-input');
    const chatMessages = document.getElementById('chat-messages');
    
    const apiUrl = 'https://api-azure.botsonic.ai/v1/botsonic/generate';
    const apiKey = '1b2366a2-ed9f-44f4-a3ac-880fe5d65127';
    
    sendButton.addEventListener('click', async function() {
        const message = messageInput.value.trim();
        if (message) {
            appendMessage('Tú', message);
            messageInput.value = '';
            chatMessages.scrollTop = chatMessages.scrollHeight;

            const response = await getBotResponse(message);
            appendMessage('Sabon Digital', response);
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
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({ message: message })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            return data.response; // Ajusta esto según el formato de la respuesta de la API
        } catch (error) {
            console.error('Error:', error);
            return 'Lo siento, hubo un error al procesar tu solicitud.';
        }
    }
});

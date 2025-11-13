document.addEventListener("DOMContentLoaded", () => {
    emailjs.init('0ismCqyKa9Pm9lgsI'); 

    const form = document.getElementById('contact-form');
    const statusMessage = document.getElementById('form-status');
    const submitButton = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        submitButton.disabled = true;
        submitButton.textContent = 'Enviando...';
        statusMessage.textContent = '';
        statusMessage.className = ''; 

        emailjs.sendForm('service_oaenqy5', 'template_r7cz95r', this)
            .then(() => {
                form.reset();
                submitButton.disabled = false;
                submitButton.textContent = 'Enviar Mensaje';
                
                statusMessage.textContent = '¡Mensaje enviado con éxito!';
                statusMessage.className = 'status-success';
                
                setTimeout(() => {
                    statusMessage.textContent = '';
                    statusMessage.className = '';
                }, 3000);
                
            }, (error) => {
                submitButton.disabled = false;
                submitButton.textContent = 'Enviar Mensaje';
                statusMessage.textContent = 'Error al enviar el mensaje. Inténtalo de nuevo.';
                statusMessage.className = 'status-error';
                console.log('ERROR DE EMAILJS:', error);
            });
    });
});
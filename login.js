document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Enviar as credenciais para a API de login
    fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Login bem-sucedido!');
            window.location.href = '/dashboard'; // redireciona para o dashboard ou página inicial
        } else {
            alert('Credenciais inválidas!');
        }
    })
    .catch(error => {
        console.error('Erro ao fazer login:', error);
    });
});

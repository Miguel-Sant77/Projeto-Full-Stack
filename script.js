const products = [
    {
        id: 1,
        name: 'Fone de Ouvido',
        price: 'R$ 199,90',
        image: 'https://qcybrasil.com/cdn/shop/files/Fone_de_ouvido_sem_fio_QCY_T13_ANC_2_Preto_2.jpg?v=1726077394'
    },
    {
        id: 2,
        name: 'Smartwatch',
        price: 'R$ 399,90',
        image: 'https://png.pngtree.com/png-vector/20240309/ourlarge/pngtree-the-smartwatch-banner-png-image_11919211.png'
    },
    {
        id: 3,
        name: 'Mouse Gamer',
        price: 'R$ 149,90',
        image: 'https://images6.kabum.com.br/produtos/fotos/98696/mouse-gamer-hyperx-pulsefire-core-hx-mc004b_mouse-gamer-hyperx-pulsefire-core-hx-mc004b_1539172781_g.jpg'
    },
    {
        id: 4,
        name: 'Monitor',
        price: 'R$ 899,90',
        image: 'https://images7.kabum.com.br/produtos/fotos/sync_mirakl/254367/Monitor-Gamer-Samsung-T350-Tela-Plana-24-FULL-HD-75Hz-5Ms-HDMI-FreeSync-Game-Mode_1728435360_g.jpg'
    },
    {
        id: 5,
        name: 'Headset Gamer',
        price: 'R$ 299,90',
        image: 'https://images.kabum.com.br/produtos/fotos/538921/headset-gamer-sem-fio-havit-h2039bg-rgb-driver-50mm-bluetooth-2-4ghz-preto_1712691587_original.jpg'
    },
    {
        id: 6,
        name: 'Teclado Mecânico',
        price: 'R$ 299,90',
        image: 'https://static.mundomax.com.br/produtos/84178/100/1.webp'
    },
    {
        id: 7,
        name: 'Cadeira Gamer',
        price: 'R$ 699,90',
        image: 'https://images5.kabum.com.br/produtos/fotos/sync_mirakl/313525/Cadeira-Gamer-Prizi-At-120-Kg-Com-Almofadas-Roxa-PZ1006E_1724255445_g.jpg'
    },
    {
        id: 8,
        name: 'Webcam',
        price: 'R$ 249,90',
        image: 'https://images1.kabum.com.br/produtos/fotos/294251/webcam-gamer-husky-gaming-snow-100-preta-720p-com-iluminacao-streaming-30fps-hgmn002_1668454755_g.jpg'
    },
    {
        id:9,
        name: 'Notebook Gamer',
        price: 'R$ 6990,90',
        image: 'https://images2.kabum.com.br/produtos/fotos/420222/notebook-gamer-gigabyte-aorus-5-intel-core-i5-12700h-16gb-ram-geforce-rtx3060-ssd-1tb-15-6-full-hd-win11-home-preto-ke4-72br314sh_1688757557_g.jpg'
    },
    {
        id: 10,
        name: 'PlayStation 5',
        price: 'R$ 4990,90',
        image: 'https://images0.kabum.com.br/produtos/fotos/636960/console-playstation-5-pro-sony-ssd-2tb-controle-sem-fio-dualsense-branco-1000046552_1727095996_g.jpg'
    },
];

let cart = [];

// Função para carregar carrinho do localStorage
function loadCart() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        cart = JSON.parse(storedCart);
        updateCart();
    }
}

// Função para salvar carrinho no localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}


// Função para renderizar produtos na Home
function renderProducts() {
    const productList = document.getElementById('product-list');
    if (productList) {
        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');
            productDiv.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.price}</p>
                <button onclick="addToCart(${product.id})">Adicionar ao Carrinho</button>
            `;
            productList.appendChild(productDiv);
        });
    }
}

// Função para adicionar produtos ao carrinho
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        alert(`Produto ${product.name} adicionado ao carrinho!`);
        updateCart();
        saveCart();  // Salva o carrinho no localStorage
    }
}


// Função para atualizar o carrinho
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    if (cartItems) {
        cartItems.innerHTML = ''; // Limpa itens do carrinho
        cart.forEach((item, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.innerHTML = `<p>${item.name} - ${item.price} <button onclick="removeFromCart(${index})">Remover</button></p>`;
            cartItems.appendChild(itemDiv);
        });
    }

    const total = cart.reduce((acc, item) => acc + parseFloat(item.price.replace('R$ ', '').replace(',', '.')), 0);
    if (cartTotal) {
        cartTotal.innerHTML = `<p>Total: R$ ${total.toFixed(2).replace('.', ',')}</p>`;
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);  // Remove o item do array
    updateCart();
    saveCart();  // Atualiza o localStorage
}


// Função para finalizar compra
function checkout() {
    alert("Finalizando a compra!");
}

// Função para cadastro
document.getElementById('signup-form')?.addEventListener('submit', function(event) {
    event.preventDefault(); // Evita o envio do formulário
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    alert(`Cadastro realizado com sucesso!\nNome: ${name}\nEmail: ${email}`);
});

// Renderiza os produtos na página inicial
renderProducts();

// Atualiza o carrinho na página de carrinho
if (document.getElementById('cart-items')) {
    updateCart();
}

// Carrega o carrinho ao iniciar
loadCart();

// Função para cadastro
document.getElementById('signup-form')?.addEventListener('submit', function(event) {
    event.preventDefault(); // Evita o envio do formulário
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    alert(`Cadastro realizado com sucesso!\nNome: ${name}\nEmail: ${email}`);
});


// Função para validação e cadastro
document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita o envio do formulário

    // Limpa mensagens de erro anteriores
    clearErrors();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    let hasError = false;

    // Validações básicas
    if (name.length < 3) {
        showError('name-error', 'O nome deve ter pelo menos 3 caracteres');
        hasError = true;
    }

    if (!validateEmail(email)) {
        showError('email-error', 'Por favor, insira um e-mail válido');
        hasError = true;
    }

    if (!validatePassword(password)) {
        showError('password-error', 'A senha deve ter pelo menos 8 caracteres, incluindo números e caracteres especiais');
        hasError = true;
    }

    // Se não houver erros, exibe mensagem de sucesso
    if (!hasError) {
        document.getElementById('success-message').textContent = `Cadastro realizado com sucesso!\nNome: ${name}\nEmail: ${email}`;
    }
});

// Função para validar e-mails
function validateEmail(email) {
    const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return emailPattern.test(email);
}

// Função para validar senhas
function validatePassword(password) {
    return password.length >= 8 && /\d/.test(password) && /[!@#$%^&*]/.test(password);
}

// Função para exibir erros
function showError(elementId, message) {
    document.getElementById(elementId).textContent = message;
}

// Função para limpar erros
function clearErrors() {
    document.querySelectorAll('.error-message').forEach(function(element) {
        element.textContent = '';
    });
}
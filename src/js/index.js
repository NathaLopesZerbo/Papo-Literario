
    const modal = document.getElementById('modal')
    const openModal = document.getElementById('openModal')
    const cardCompra = document.getElementById('card-compra')
    const overlay = document.getElementById('overlay')
    const openSidebar = document.getElementById('menu-btn')
    const sidebar = document.getElementById('sidebar')
    const dropdown = document.getElementById('dropdown')
    const dropdownContent = document.getElementById('dropdownContent')
    const sidebarCarrinho = document.getElementById('sidebar-carrinho')
    const closeSidebarCarrinho = document.getElementById('close-btn-carrinho')
    const cartCounter = document.getElementById('cartCount')
    const cartFavorito = document.getElementById('countFavorito')
    const cartTotal = document.getElementById('cart-total')
    const openSidebarCarrinho = document.getElementById('openSidebarCarrinho')
    const cartItemsContainer = document.getElementById('itens-carrinho')
    const cartItemsFavoritos = document.getElementById('item-favoritos')
    const closeSidebar = document.getElementById('close-btn')
    const openSidebarFavorito = document.getElementById('openSidebarFavorito')
    const sidebarFavorito = document.getElementById('sidebar-favorito')
    const closeSidebarFavorito = document.getElementById('close-btn-favorito')
    const buscarInput = document.getElementById('buscar-input');
    const buscarBtn = document.getElementById('buscar-btn');
    const listaLivros = document.getElementById('lista-livros');
    const livros = listaLivros.getElementsByClassName('card-livro');
    const livrosPesquisados = document.querySelector('.livros-pesquisados');


    let cart = [];
    let favoritos = [];


    $(document).ready(function(){
        $('.sub-btn').click(function(){
        $(this).next('.sub-menu').slideToggle();
        $(this).find('.dropdown').toggleClass('rotate');
        });
    });



    openSidebarFavorito.addEventListener('click', function(){
        updateFavoritos()
        sidebarFavorito.classList.add('active-favorito');
        document.body.classList.add("no-scroll");
    })

    closeSidebarFavorito.addEventListener('click',function(){
        sidebarFavorito.classList.remove('active-favorito')
        document.body.classList.remove("no-scroll");
    })

    openSidebarCarrinho.addEventListener('click',function(){
        sidebarCarrinho.classList.add('active-carrinho')
        overlay.style.display = 'flex'
        document.body.classList.add("no-scroll");
    })


    closeSidebarCarrinho.addEventListener('click',function(){
        sidebarCarrinho.classList.remove('active-carrinho')
        overlay.style.display = 'none'
        document.body.classList.remove("no-scroll");
    })


    openSidebar.addEventListener('click',function(){
        sidebar.classList.add('active')
        overlay.style.display = "flex"
        document.body.classList.add("no-scroll");
    })

    closeSidebar.addEventListener('click', function(){
        sidebar.classList.remove('active')
        overlay.style.display = "none"
        document.body.classList.remove("no-scroll");
    })


    overlay.addEventListener('click', function(event){
        if(event.target === overlay){
            sidebar.classList.remove('active');
            sidebarCarrinho.classList.remove('active-carrinho')
            overlay.style.display = "none";
            document.body.classList.remove("no-scroll"); 
        }
    })

   
   // Função para armazenar o nome de usuário e redirecionar
function storeUsername(event) {
    event.preventDefault(); 
    const username = document.getElementById('username').value;
    localStorage.setItem('username', username);
    
    // Verifica se já há itens no carrinho e favoritos no localStorage
    const currentCart = localStorage.getItem('cart');
    const currentFavoritos = localStorage.getItem('favoritos');
    
    if (!currentCart) {
        localStorage.setItem('cart', JSON.stringify([]));  // Inicia o carrinho vazio se não houver
    }
    
    if (!currentFavoritos) {
        localStorage.setItem('favoritos', JSON.stringify([]));  // Inicia favoritos vazio se não houver
    }    

    window.location.href = '../../index.html';   
}

document.addEventListener('DOMContentLoaded', function() {
    const lastToastTime = localStorage.getItem('lastToastTime');
    const currentTime = new Date().getTime();
    const showToastInterval = 24 * 60 * 60 * 1000; // 24 horas em milissegundos

    if (!lastToastTime || (currentTime - lastToastTime > showToastInterval)) {
        Toastify({
            text: "Seja Bem Vindo ao Papo Literário",
            duration: 4000, // 4 segundos
            gravity: "top", // Parte superior
            position: "right", // Lado direito
            backgroundColor: "#333", // Cor de fundo
            stopOnFocus: true, // Pausa na interação
            close: true, // Adiciona um botão de fechar (x)
            className: "custom-toast" // Adiciona uma classe personalizada
        }).showToast();

        // Atualiza a data da última exibição no localStorage
        localStorage.setItem('lastToastTime', currentTime);
    }
});



// Função para inicializar o estado da página
function initializePage() {
    const username = localStorage.getItem('username');
    const welcomeMessageElement = document.getElementById('welcome-message1');
    const welcomeMessageElement2 = document.getElementById('welcome-message');

    if (welcomeMessageElement && welcomeMessageElement2) {
        if (username) {
            welcomeMessageElement.textContent = `Olá, ${username}!`;
            welcomeMessageElement2.textContent = `Olá, ${username}!`;
            
            // Restaurar carrinho e favoritos
            const storedCart = localStorage.getItem('cart');
            const storedFavoritos = localStorage.getItem('favoritos');
            
            if (storedCart) {
                cart = JSON.parse(storedCart);
                updateCarrinho();  // Atualiza a exibição do carrinho
            }
            
            if (storedFavoritos) {
                favoritos = JSON.parse(storedFavoritos);
                updateFavoritos();  // Atualiza a exibição dos favoritos
            }
        } else {
            welcomeMessageElement.textContent = 'Login';
            welcomeMessageElement2.textContent = 'Login';
        }
    } else {
        console.error('Elemento com ID "welcome-message" não encontrado.');
    }
}

// Função para remover o nome de usuário e dados armazenados, e atualizar a página
function logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('cart');
    localStorage.removeItem('favoritos');
    
    const welcomeMessageElement = document.getElementById('welcome-message1');
    const welcomeMessageElement2 = document.getElementById('welcome-message');

    if (welcomeMessageElement && welcomeMessageElement2) {
        welcomeMessageElement.textContent = 'Login';
        welcomeMessageElement2.textContent = 'Login';
    } else {
        console.error('Elemento com ID "welcome-message" não encontrado.');
    }
    
    // Limpa as variáveis do carrinho e favoritos
    cart = [];
    favoritos = [];
    updateCarrinho();
    updateFavoritos();
}

// Inicializa a página ao carregar
document.addEventListener('DOMContentLoaded', () => {
    initializePage();

    // Adiciona o evento de clique para o botão de sair
    const sairFavoritosButton = document.querySelector('.sair-favoritos');
    if (sairFavoritosButton) {
        sairFavoritosButton.addEventListener('click', logout);
    } else {
        console.error('Elemento com a classe "sair-favoritos" não encontrado.');
    }
});

// Função para atualizar o carrinho (você precisa implementá-la)
function updateCarrinho() {
    
}

// Função para atualizar os favoritos (você precisa implementá-la)
function updateFavoritos() {
    // Lógica para atualizar a interface de favoritos com os itens armazenados em "favoritos"
}


    // Carrinho

    site.addEventListener('click', function(event){
        let parentButton = event.target.closest('#add-to-cart-btn');

        if(parentButton){   
            const name = parentButton.getAttribute('data-name');
            const image = parentButton.getAttribute('data-image');
            const price = parseFloat(parentButton.getAttribute('data-price'));

            addToCart(name, price, image);
        }
    });

    function addToCart(name, price, image){
        const existingItem = cart.find(item => item.name === name);

        if(existingItem){
            existingItem.quantity += 1;
        } else{
            cart.push({
                name,
                price,
                image,
                quantity: 1,
            });
        }

        updateCarrinho();
        saveCart(); 
    }

    function updateCarrinho(){
        cartItemsContainer.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
        const cartItemElement = document.createElement('div');

        cartItemElement.innerHTML = `
                <div class="item-carrinho">
                    <div class="img-titulo-carrinho">
                        <div class="img-item-carrinho">
                            <img src="${item.image}" alt="image-capa-livro">
                        </div>

                        <div class="titulo-item-carrinho">
                            <h1>${item.name}</h1>
                            <p class="quantidade-livro">Quantidade: ${item.quantity}</p>
                        </div>
                    </div>

                    <div class="lixeira-valor-livro">
                        <i class="fa-solid fa-trash remove-from-cart-btn" 
                        data-name="${item.name}"></i>
                        <p>Valor: <span class="valor-item-carrinho">R$ 
                        ${item.price.toFixed(2)}</span></p>
                    </div>

                    <div class="separacao-carrinho"></div>
                </div>
        `;

            total += item.price * item.quantity;
            cartItemsContainer.appendChild(cartItemElement);
        });

        cartTotal.textContent = total.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });

        cartCounter.innerHTML = cart.length;
    }

    cartItemsContainer.addEventListener('click', function(event){
        if(event.target.classList.contains("remove-from-cart-btn")){
            const name = event.target.getAttribute('data-name');

            removeItemCart(name);
        }
    });

    function removeItemCart(name){
        const index = cart.findIndex(item => item.name === name);

        if(index !== -1){
            const item = cart[index];

            if(item.quantity > 1){
                item.quantity -= 1;
            } else{
                cart.splice(index, 1);
            }
            updateCarrinho();
            saveCart(); 
        }
    }


    window.onload = function() {
        loadCart();
    };









    // Favoritos

    site.addEventListener('click', function (event){
        // console.log(event.target)

        let buttonFavoritos = event.target.closest("#add-to-favoritos-btn")
        
        if(buttonFavoritos){
            const imageFavoritos = buttonFavoritos.getAttribute('data-image')
            const nameFavoritos = buttonFavoritos.getAttribute('data-name')
            const priceFavoritos = parseFloat(buttonFavoritos.getAttribute('data-price'))

            //Adicionar aos Favoritos
            addToFavoritos(nameFavoritos, priceFavoritos, imageFavoritos);
        }
    })


    function addToFavoritos(nameFavoritos, priceFavoritos, imageFavoritos){

        const existingFavoritos = favoritos.find(itemf => itemf.nameFavoritos === nameFavoritos)

        if(existingFavoritos){
            existingFavoritos.quantidadeFavoritos +=1;
        } else{
            favoritos.push({
            imageFavoritos,
            nameFavoritos,
            priceFavoritos,
            quantidadeFavoritos:1
        })
    }

        updateFavoritos()
        saveFavoritosToLocalStorage();

    }

    function saveFavoritosToLocalStorage() {
        localStorage.setItem('favoritos', JSON.stringify(favoritos));
    }

    function loadFavoritosFromLocalStorage() {
        const favoritosData = localStorage.getItem('favoritos');
        if (favoritosData) {
            favoritos = JSON.parse(favoritosData);
            updateFavoritos();
        }
    }


    function updateFavoritos(){
        cartItemsFavoritos.innerHTML = '';

        favoritos.forEach(itemf => {
            const cartItemElementFavoritos = document.createElement("div");

            cartItemElementFavoritos.innerHTML = `

            <div class="favorito-itens">
                <div class="favoritos">
                    <div class="coracao-item">
                        <i class="fa-solid fa-heart"></i>
                    </div>
                    <div class="item-favoritos" id="item-favoritos">
                        <div class="img-favoritos-item">
                            <img src="${itemf.imageFavoritos}" alt="">
                        </div>
                
                        <div class="titulo-favoritos-item">${itemf.nameFavoritos}</div>
                        <div class="item-preco-remover">
                            <i class="fa-solid fa-trash remove-from-favoritos-btn"
                            data-name="${itemf.nameFavoritos}"></i>
                            <div class="preco-favoritos-item">R$ 
                            ${itemf.priceFavoritos.toFixed(2)}</div>
                        </div>
                    </div>
                </div>

        
            `
            cartItemsFavoritos.appendChild(cartItemElementFavoritos)

        })

        cartFavorito.innerHTML = favoritos.length;

    }


    cartItemsFavoritos.addEventListener('click', function (event){
        if(event.target.classList.contains("remove-from-favoritos-btn")){
            const nameFavoritos = event.target.getAttribute("data-name");
            
            removeItemFavorito(nameFavoritos)
        }
    })

    function removeItemFavorito(nameFavoritos){
        const index = favoritos.findIndex(itemf => itemf.nameFavoritos = nameFavoritos)

        if(index !== -1){
            const itemf = favoritos[index];
            
            if(itemf.quantidadeFavoritos >1){
                itemf.quantidadeFavoritos -=1;
                updateFavoritos();
                return;
            }

            favoritos.splice(index, 1);
            updateFavoritos();
            saveFavoritosToLocalStorage();

        }
    }

    document.addEventListener('DOMContentLoaded', function() {
        loadFavoritosFromLocalStorage();
    });







    function filtrarLivros() {
        const termoBusca = buscarInput.value.toLowerCase();
        const mainSite = document.getElementById('site');
        const livrosPesquisados = document.querySelector('.livros-pesquisados');
        const mensagemNenhumLivro = `

        <div class="livros-pesquisados"> 
        <img src="./src/img/icons/icone-livro-rasgado.png" alt="livro rasgado">
        <h1>Desculpe, livro não econtrado!</h1>
        <p>Verifique se tem algo de errado ou tente mais tarde</p>
        </div>

        `;

        livrosPesquisados.innerHTML = ''; // Limpa a seção de livros pesquisados

        if (termoBusca === '') {
            // Se o campo de busca estiver vazio, restaura a visibilidade de todos os elementos no main
            mainSite.classList.remove('ocultar-main');
            return;
        }

        let encontrouLivro = false;

        Array.from(livros).forEach(livro => {
            const tituloLivro = livro.getAttribute('data-title');
            const autorLivro = livro.querySelector('p')?.textContent;

            // Verifica se o título e autor não são nulos/undefined antes de aplicar toLowerCase
            const tituloLivroLower = tituloLivro ? tituloLivro.toLowerCase() : '';
            const autorLivroLower = autorLivro ? autorLivro.toLowerCase() : '';

            if (tituloLivroLower.includes(termoBusca) || autorLivroLower.includes(termoBusca)) {
                const livroClone = livro.cloneNode(true); // Clona o livro
                livrosPesquisados.appendChild(livroClone); // Adiciona o clone na seção de pesquisados
                encontrouLivro = true;
            }
        });

        if (!encontrouLivro) {
            // Oculta todo o conteúdo dentro de main e mostra a mensagem
            mainSite.classList.add('ocultar-main');
            livrosPesquisados.innerHTML = mensagemNenhumLivro;
            livrosPesquisados.style.display = 'block'; // Garante que a mensagem seja exibida
        } else {
            // Se encontrou livros, assegura que o conteúdo principal esteja visível
            mainSite.classList.remove('ocultar-main');
        }
    }

    // Filtrar ao clicar no botão de busca
    buscarBtn.addEventListener('click', filtrarLivros);

    // Filtrar ao digitar no campo de busca
    buscarInput.addEventListener('keyup', filtrarLivros);


    let timeout;

    function showDropdown() {
        clearTimeout(timeout);
        dropdownContent.style.display = 'block';
    }

    dropdown.addEventListener('mouseover', showDropdown);
    dropdown.addEventListener('mouseout', hideDropdown);

    function hideDropdown() {
        timeout = setTimeout(() => {
            dropdownContent.style.display = 'none';
        }, 100);
    }


    // Elementos do DOM
    const itemCabecalho = document.getElementById('item-cabecalho');
    const contentDropdown2 = document.getElementById('dropdown-content-2'); // Alterado ID para evitar conflito
    const okButton = document.getElementById('ok-button');
    const clearButton = document.getElementById('clear-button');
    const cepInput = document.getElementById('cep');
    const localizacaoTexto = document.getElementById('localizacao-texto');

    let dropdownTimeout2; // Renomeado para evitar conflito

    // Função para mostrar o dropdown
    function showDropdown2() { // Renomeada para evitar conflito
    clearTimeout(dropdownTimeout2); // Cancela o timeout caso exista
    contentDropdown2.style.display = 'block'; // Mostra o dropdown
    }

    // Função para esconder o dropdown com atraso
    function hideDropdown2() { // Renomeada para evitar conflito
    dropdownTimeout2 = setTimeout(() => {
        contentDropdown2.style.display = 'none'; // Esconde o dropdown após o atraso
    }, 1000); // Tempo de espera antes de esconder
    }

    // Eventos do dropdown ao passar o mouse no cabeçalho
    itemCabecalho.addEventListener('mouseover', showDropdown2); // Usar a função renomeada

    itemCabecalho.addEventListener('mouseout', hideDropdown2); // Usar a função renomeada

    // Evento de carregamento da página para recuperar o CEP armazenado no localStorage
    document.addEventListener('DOMContentLoaded', () => {
    const storedCep = localStorage.getItem('cep');
    if (storedCep) {
        cepInput.value = storedCep;
        buscarEndereco(); // Atualiza a localização com o CEP armazenado
    }
    });

    // Centraliza a lógica de submissão do CEP
    function handleCepSubmission() {
    const cep = cepInput.value.trim();

    if (cep === '') {
        localizacaoTexto.textContent = 'Nenhum CEP inserido';
    } else if (cep.length !== 8 || !/^\d{8}$/.test(cep)) {
        localizacaoTexto.textContent = 'CEP inválido';
    } else {
        salvarCep(); // Salva o CEP no localStorage
        buscarEndereco(); // Realiza a pesquisa
        hideDropdown2(); // Fecha o dropdown
    }
    }

    // Adiciona evento de clique ao botão "Ok"
    okButton.addEventListener('click', handleCepSubmission);

    // Adiciona evento para pressionar "Enter" no campo de CEP
    cepInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault(); // Evita o envio do formulário
        handleCepSubmission(); // Chama a função centralizada
    }
    });

    // Limita o campo de CEP a 8 dígitos
    cepInput.addEventListener('input', () => {
    let cep = cepInput.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    cepInput.value = cep.slice(0, 8); // Limita o valor a 8 dígitos
    });

    // Evento de clique no botão "X" para limpar o campo de CEP
    clearButton.addEventListener('click', () => {
    cepInput.value = ''; // Limpa o campo de CEP
    localStorage.removeItem('cep'); // Remove o CEP do localStorage
    localizacaoTexto.textContent = 'Minha Região'; // Reseta o texto da localização
    });

    // Função para salvar o CEP no localStorage
    function salvarCep() {
    const cep = cepInput.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    if (cep.length === 8) {
        localStorage.setItem('cep', cep); // Salva o CEP se for válido
    }
    }

    // Função para buscar o endereço pelo CEP
    function buscarEndereco() {
    const cep = cepInput.value.replace(/\D/g, ''); // Remove caracteres não numéricos

    if (cep.length === 8) {
        const url = `https://viacep.com.br/ws/${cep}/json/`;

        fetch(url)
        .then(response => response.json())
        .then(data => {
            if (!data.erro) {
            const localizacao = `${data.logradouro}, ${data.bairro}`; // Monta o texto de localização
            localizacaoTexto.textContent = localizacao; // Atualiza o texto da localização
            } else {
            localizacaoTexto.textContent = 'Região não encontrada';
            }
        })
        .catch(error => {
            console.error('Erro ao buscar o endereço:', error);
            localizacaoTexto.textContent = 'Erro ao buscar a região';
        });
    } else {
        localizacaoTexto.textContent = 'CEP inválido';
    }
    }


    
    
    
    
    
    












    
    







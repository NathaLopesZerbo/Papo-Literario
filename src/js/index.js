
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
    const sidebarFavoritos = document.getElementById('fechar-abrirFavoritos');
    const sidebarCarrinhos = document.getElementById('fechar-abrirCarrinhos');
    const abrirLogin = document.getElementById('abrir-login');

    let cart = [];
    let favoritos = [];


    document.addEventListener('DOMContentLoaded', () => {
       
        const shouldOpenFavoritos = localStorage.getItem('openSidebarFavoritos');
    
        if (shouldOpenFavoritos === 'true') {
            localStorage.removeItem('openSidebarFavoritos'); 
            sidebarFavorito.classList.add('active-favorito');
            document.body.classList.add("no-scroll"); 
        }
    
       
        const shouldOpenCarrinho = localStorage.getItem('openSidebarCarrinho');
    
        if (shouldOpenCarrinho === 'true') {
            localStorage.removeItem('openSidebarCarrinho'); 
            sidebarCarrinho.classList.add('active-carrinho'); 
            overlay.style.display = 'flex'; 
            document.body.classList.add("no-scroll"); 
        }
    });
    
    
    

    $(document).ready(function(){
        $('.sub-btn').click(function(){
        $(this).next('.sub-menu').slideToggle();
        $(this).find('.dropdown').toggleClass('rotate');
        });
    });


    abrirLogin.addEventListener('click', function() {
        window.location.href = 'src/paginas/login.html'; 
    });

    

    sidebarFavoritos.addEventListener('click', function(){
        sidebar.classList.remove('active')
        overlay.style.display = "none"
        document.body.classList.remove("no-scroll");
        sidebarFavorito.classList.add('active-favorito');
    })

    sidebarCarrinhos.addEventListener('click', function(){
        sidebar.classList.remove('active')
        overlay.style.display = "none"
        sidebarCarrinho.classList.add('active-carrinho')
        overlay.style.display = 'flex'
        document.body.classList.add("no-scroll");
    })


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


    

   

function storeUsername(event) {
    event.preventDefault(); 
    const username = document.getElementById('username').value;
    localStorage.setItem('username', username);
    

    const currentCart = localStorage.getItem('cart');
    const currentFavoritos = localStorage.getItem('favoritos');
    
    if (!currentCart) {
        localStorage.setItem('cart', JSON.stringify([])); 
    }
    
    if (!currentFavoritos) {
        localStorage.setItem('favoritos', JSON.stringify([])); 
    }    

    window.location.href = '../../index.html';   
}

document.addEventListener('DOMContentLoaded', function() {
    const lastToastTime = localStorage.getItem('lastToastTime');
    const currentTime = new Date().getTime();
    const showToastInterval = 24 * 60 * 60 * 1000; 

    if (!lastToastTime || (currentTime - lastToastTime > showToastInterval)) {
        Toastify({
            text: "Seja Bem Vindo ao Papo Literário",
            duration: 4000, 
            gravity: "top", 
            position: "right", 
            backgroundColor: "#333", 
            stopOnFocus: true, 
            close: true, 
            className: "custom-toast" 
        }).showToast();

        // Atualiza a data da última exibição no localStorage
        localStorage.setItem('lastToastTime', currentTime);
    }
});




function initializePage() {
    const username = localStorage.getItem('username');
    const welcomeMessageElement = document.getElementById('welcome-message1');
    const welcomeMessageElement2 = document.getElementById('welcome-message');

    if (welcomeMessageElement && welcomeMessageElement2) {
        if (username) {
            welcomeMessageElement.textContent = `Olá, ${username}!`;
            welcomeMessageElement2.textContent = `Olá, ${username}!`;
            
           
            const storedCart = localStorage.getItem('cart');
            const storedFavoritos = localStorage.getItem('favoritos');
            
            if (storedCart) {
                cart = JSON.parse(storedCart);
                updateCarrinho();  
            }
            
            if (storedFavoritos) {
                favoritos = JSON.parse(storedFavoritos);
                updateFavoritos();  
            }
        } else {
            welcomeMessageElement.textContent = 'Login';
            welcomeMessageElement2.textContent = 'Login';
        }
    } else {
        console.error('Elemento com ID "welcome-message" não encontrado.');
    }
}

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

    cart = [];
    favoritos = [];
    updateCarrinho();
    updateFavoritos();
}


document.addEventListener('DOMContentLoaded', () => {
    initializePage();

    const sairFavoritosButton = document.querySelector('.sair-favoritos');
    const sairConta = document.querySelector('.sair-conta');
    if (sairFavoritosButton, sairConta) {
        sairFavoritosButton.addEventListener('click', logout);
        sairConta.addEventListener('click', logout);
    } else {
        console.error('Elemento com a classe "sair-favoritos" não encontrado.');
    }
});


    site.addEventListener('click', function(event){
        let parentButton = event.target.closest('#add-to-cart-btn');

        if(parentButton){   
            const name = parentButton.getAttribute('data-name');
            const image = parentButton.getAttribute('data-image');
            const price = parseFloat(parentButton.getAttribute('data-price'));

            addToCart(name, price, image);
        }
    });

    
    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }


    function loadCart() {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            cart = JSON.parse(storedCart);
            updateCarrinho();
        }
    }

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



    site.addEventListener('click', function (event){

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
        const livrosNaoEncontrados = document.querySelector('.livros-nao-encontrados'); // Nova div para livros não encontrados
        const tituloResultados = document.querySelector('.titulo-resultados'); // Seleciona o título de resultados, se existir
    
        const mensagemNenhumLivro = `
            <div class="livros-nao-encontrados"> 
                <img src="./src/img/icons/icone-livro-rasgado.png" alt="livro rasgado">
                <h1>Desculpe, livro não encontrado!</h1>
                <p>Verifique se tem algo de errado ou tente mais tarde</p>
            </div>
        `;
    
        // Limpa as seções de livros pesquisados e não encontrados
        livrosPesquisados.innerHTML = '';
    
        if (termoBusca === '') {
            // Se o campo de busca estiver vazio, restaura a visibilidade de todos os elementos no main
            mainSite.classList.remove('ocultar-main');
            livrosNaoEncontrados.style.display = 'none';  // Oculta a mensagem de erro
            livrosPesquisados.style.display = 'none';  // Esconde os livros pesquisados
            tituloResultados.style.display = 'none'; // Esconde o título de resultados
            return;
        }
    
        let encontrouLivro = false;
        const livroEspecifico = 'titulo-do-livro-desejado'; // Substitua pelo título exato do livro que deseja destacar
    
        // Verifica os livros
        Array.from(livros).forEach(livro => {
            const tituloLivro = livro.getAttribute('data-title');
            const autorLivro = livro.querySelector('p')?.textContent;
    
            const tituloLivroLower = tituloLivro ? tituloLivro.toLowerCase() : '';
            const autorLivroLower = autorLivro ? autorLivro.toLowerCase() : '';
    
            if (tituloLivroLower.includes(termoBusca) || autorLivroLower.includes(termoBusca)) {
                // Se encontrar um livro, clone e adicione ao resultado
                const livroClone = livro.cloneNode(true);
                livrosPesquisados.appendChild(livroClone);
                encontrouLivro = true;
            }
        });
    
        if (!encontrouLivro) {
            // Se não encontrou livros, oculta o conteúdo principal e exibe a mensagem de erro
            mainSite.classList.add('ocultar-main');  // Oculta o conteúdo principal do site
            livrosPesquisados.innerHTML = mensagemNenhumLivro;
            livrosPesquisados.style.display = 'block';  // Exibe a mensagem de erro
            livrosNaoEncontrados.style.display = 'block'; // Exibe a mensagem de erro
            tituloResultados.style.display = 'none'; // Esconde o título de resultados
        } else {
            // Se encontrou livros, oculta o conteúdo principal
            mainSite.classList.add('ocultar-main');  // Oculta o conteúdo principal do site
            livrosNaoEncontrados.style.display = 'none';  // Oculta a mensagem de erro
            livrosPesquisados.style.display = 'flex';  // Exibe os livros encontrados
    
            // Adiciona o título "Resultados Encontrados" apenas se o livro específico for pesquisado
            if (termoBusca.includes(livroEspecifico)) {
                tituloResultados.style.display = 'block'; // Exibe o título de resultados
            } else {
                tituloResultados.style.display = 'flex'; // Esconde o título se o livro específico não for pesquisado
            }
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



    const itemCabecalho = document.getElementById('item-cabecalho');
    const contentDropdown2 = document.getElementById('dropdown-content-2');
    const okButton = document.getElementById('ok-button');
    const clearButton = document.getElementById('clear-button');
    const cepInput = document.getElementById('cep');
    const localizacaoTexto = document.getElementById('localizacao-texto');

    let dropdownTimeout2; 
    // Função para mostrar o dropdown
    function showDropdown2() { // Renomeada para evitar conflito
    clearTimeout(dropdownTimeout2); // Cancela o timeout caso exista
    contentDropdown2.style.display = 'block'; // Mostra o dropdown
    }

    // Função para esconder o dropdown com atraso
    function hideDropdown2() { // Renomeada para evitar conflito
    dropdownTimeout2 = setTimeout(() => {
        contentDropdown2.style.display = 'none'; // Esconde o dropdown após o atraso
    }, 400); // Tempo de espera antes de esconder
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


    
    
    
    
    

    










    
    







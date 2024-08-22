
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
    event.preventDefault(); // Previne o envio padrão do formulário
    const username = document.getElementById('username').value;
    localStorage.setItem('username', username);
    window.location.href = '../../index.html'; // Redireciona para a página princi  pal
}

 const username = localStorage.getItem('username');
 if (username) {
     document.getElementById('welcome-message1').textContent = `Olá, ${username}!`;
 }

 function storeUsername(event) {
    event.preventDefault(); // Previne o envio padrão do formulário
    const username = document.getElementById('username').value;
    localStorage.setItem('username', username);
    window.location.href = '../../index.html'; // Redireciona para a página princi  pal
}

 const username1 = localStorage.getItem('username');
 if (username) {
     document.getElementById('welcome-message').textContent = `Olá, ${username}!`;
 }
 



// Carrinho

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}


function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCarrinho(); 
    }
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






const itemCabecalho = document.getElementById('item-cabecalho');
const contentDropdown = document.getElementById('dropdown-content');
const headerDropdown = document.getElementById('dropdown');
const okButton = document.getElementById('ok-button');
const clearButton = document.getElementById('clear-button');
const cepInput = document.getElementById('cep');
let dropdownDelay;

// Recupera o CEP armazenado no localStorage ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
  const storedCep = localStorage.getItem('cep');
  if (storedCep) {
    cepInput.value = storedCep;
    buscarEndereco(); // Atualiza a localização com o CEP armazenado
  }
});

function showDropdown() {
  clearTimeout(dropdownDelay);
  contentDropdown.style.display = 'block';
}

function hideDropdown() {
  dropdownDelay = setTimeout(() => {
    if (!isMouseInside) {
      buscarEndereco(); // Realiza a pesquisa
      contentDropdown.style.display = 'none'; // Fecha o dropdown
    }
  }, 3000); // Tempo de atraso em milissegundos
}

let isMouseInside = false;

itemCabecalho.addEventListener('mouseover', function() {
  isMouseInside = true;
  showDropdown();
});

contentDropdown.addEventListener('mouseover', function() {
  isMouseInside = true;
  clearTimeout(dropdownDelay);
  contentDropdown.style.display = 'block';
});

itemCabecalho.addEventListener('mouseout', function() {
  isMouseInside = false;
  hideDropdown();
});

contentDropdown.addEventListener('mouseout', function() {
  isMouseInside = false;
  hideDropdown();
});

// Adiciona evento de clique ao botão "Ok"
okButton.addEventListener('click', function() {
  salvarCep(); // Salva o CEP no localStorage
  buscarEndereco(); // Realiza a pesquisa
  contentDropdown.style.display = 'none'; // Fecha o dropdown
});

// Adiciona evento para pressionar Enter no campo de CEP
cepInput.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    event.preventDefault(); // Evita o envio do formulário padrão
    salvarCep(); // Salva o CEP no localStorage
    buscarEndereco(); // Realiza a pesquisa
    contentDropdown.style.display = 'none'; // Fecha o dropdown
  }
});

// Adiciona evento ao botão "X" para limpar o campo de CEP
clearButton.addEventListener('click', function() {
  cepInput.value = ''; // Limpa o campo de CEP
  localStorage.removeItem('cep'); // Remove o CEP do localStorage
  document.getElementById('localizacao-texto').textContent = 'Minha Região'; // Reseta o texto da localização
});



function displaySuggestions(suggestions) {
  suggestionsList.innerHTML = ''; // Limpa a lista de sugestões
  suggestions.forEach(suggestion => {
    const li = document.createElement('li');
    li.textContent = suggestion;
    li.addEventListener('click', function() {
      cepInput.value = suggestion;
      salvarCep(); // Salva o CEP no localStorage
      buscarEndereco(); // Realiza a pesquisa
      contentDropdown.style.display = 'none'; // Fecha o dropdown
    });
    suggestionsList.appendChild(li);
  });
}

function salvarCep() {
  const cep = cepInput.value.replace(/\D/g, '');
  if (cep.length === 8) {
    localStorage.setItem('cep', cep);
  }
}

function buscarEndereco() {
  const cep = document.getElementById('cep').value.replace(/\D/g, '');

  if (cep.length === 8) {
    const url = `https://viacep.com.br/ws/${cep}/json/`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (!data.erro) {
          // Exibe a rua e o bairro
          const localizacao = `${data.logradouro}, ${data.bairro}`;
          document.getElementById('localizacao-texto').textContent = localizacao;
        } else {
          document.getElementById('localizacao-texto').textContent = 'Região não encontrada';
        }
      })
      .catch(error => {
        console.error('Erro ao buscar o endereço:', error);
        document.getElementById('localizacao-texto').textContent = 'Erro ao buscar a região';
      });
  } else {
    document.getElementById('localizacao-texto').textContent = 'CEP inválido';
  }
}






  
  







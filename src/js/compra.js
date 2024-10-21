
 const modal = document.getElementById('modal')
 const openModal = document.getElementById('openModal')
 const cardCompra = document.getElementById('card-compra')
 const overlay = document.getElementById('overlay')
 const openSidebar = document.getElementById('menu-btn')
 const sidebar = document.getElementById('sidebar')
 const closeSidebar = document.getElementById('close-btn')
 const dropdown = document.getElementById('dropdown')
 const dropdownContent = document.getElementById('dropdownContent')


 document.getElementById('favoritos-link').addEventListener('click', function(e) {
  e.preventDefault();
  localStorage.setItem('openSidebarFavoritos', 'true');
  window.location.href = '../../index.html'; 
});

document.getElementById('carrinho-link').addEventListener('click', function(e) {
  e.preventDefault();
  localStorage.setItem('openSidebarCarrinho', 'true'); 
  window.location.href = '../../index.html'; 
});

document.querySelector('.carrinho-compra').addEventListener('click', function(e) {
  e.preventDefault(); 
  localStorage.setItem('openSidebarCarrinho', 'true'); 
  window.location.href = '../../index.html'; 
});


let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(name, price, image) {
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name,
            price,
            image,
            quantity: 1,
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
}

function handleCarrinhoClick(event) {
  event.preventDefault();

  const productButton = event.target.closest('#add-to-cart-btn');
  
  if (productButton) {
    
      const name = productButton.getAttribute('data-name');
      const price = parseFloat(productButton.getAttribute('data-price'));
      const image = productButton.getAttribute('data-image');
      
      addToCart(name, price, image);

      localStorage.setItem('openSidebarCarrinho', 'true');
      window.location.href = '../../index.html';
  }
}


document.querySelector('.compra').addEventListener('click', function(e) {
  handleCarrinhoClick(e); 
});

document.querySelector('.carrinho-compra').addEventListener('click', function(e) {
  handleCarrinhoClick(e); 
});



let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];


function addToFavoritos(nameFavoritos, priceFavoritos, imageFavoritos) {
    const existingFavoritos = favoritos.find(itemf => itemf.nameFavoritos === nameFavoritos);

    if (existingFavoritos) {
        existingFavoritos.quantidadeFavoritos += 1;
    } else {
        favoritos.push({
            imageFavoritos,
            nameFavoritos,
            priceFavoritos,
            quantidadeFavoritos: 1
        });
    }

    localStorage.setItem('favoritos', JSON.stringify(favoritos));
}


document.getElementById('add-to-favoritos-btn').addEventListener('click', function(e) {
    e.preventDefault(); 

    const nameFavoritos = this.getAttribute('data-name');
    const priceFavoritos = parseFloat(this.getAttribute('data-price'));
    const imageFavoritos = this.getAttribute('data-image');

    
    addToFavoritos(nameFavoritos, priceFavoritos, imageFavoritos);
    
    
    localStorage.setItem('openSidebarFavoritos', 'true');
    window.location.href = '../../index.html'; 
});



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

 openModal.addEventListener('click', function(){
    modal.style.display = 'flex'
    overlay.style.display = 'flex'
    document.body.classList.add("no-scroll");
 })


 overlay.addEventListener('click', function(event){
    if(event.target === overlay){
        sidebar.classList.remove('active');
        modal.style.display = 'none'
        overlay.style.display = "none";
        document.body.classList.remove("no-scroll"); 
    }
 })


 const itemCabecalho = document.getElementById('item-cabecalho');
 const contentDropdown = document.getElementById('dropdown-content1');
 const headerDropdown = document.getElementById('dropdown');
 const okButton = document.getElementById('ok-button');
 const clearButton = document.getElementById('clear-button');
 const cepInput = document.getElementById('cep');
 const inputFrete = document.getElementById('input-frete');
 const buttonFrete = document.getElementById('button-frete');
 const freteLocalizacao = document.getElementById('frete-localizacao');
 const valorFreteP = document.getElementById('valor-frete'); 
 const suggestionsList = document.getElementById('suggestions-list'); 
 let dropdownDelay;
 
 function showDropdown() {
   clearTimeout(dropdownDelay);
   contentDropdown.style.display = 'block';
 }
 
 function hideDropdown() {
   dropdownDelay = setTimeout(() => {
     if (!isMouseInside) {
       buscarEndereco(); 
       contentDropdown.style.display = 'none'; 
     }
   }, 400); 
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
 

 okButton.addEventListener('click', function() {
   salvarCep(); 
   buscarEndereco(); 
   contentDropdown.style.display = 'none'; 
 });
 
 buttonFrete.addEventListener('click', function() {
   salvarCep(); 
   buscarEndereco(); 
 });
 

 cepInput.addEventListener('keydown', function(event) {
   if (event.key === 'Enter') {
     event.preventDefault(); 
     salvarCep(); 
     buscarEndereco(); 
     contentDropdown.style.display = 'none'; 
   }
 });
 

 inputFrete.addEventListener('keydown', function(event) {
   if (event.key === 'Enter') {
     event.preventDefault(); 
     salvarCep(); 
     buscarEndereco(); 
   }
 });
 


 cepInput.addEventListener('input', function() {
   const cep = cepInput.value.replace(/\D/g, '');
   if (cep.length > 0) {
     const storedCeps = JSON.parse(localStorage.getItem('ceps')) || [];
     const suggestions = storedCeps.filter(storedCep => storedCep.startsWith(cep));
     displaySuggestions(suggestions);
   } else {
     if (suggestionsList) {
       suggestionsList.innerHTML = ''; 
     }
   }
 });
 

 inputFrete.addEventListener('input', function() {
   const cep = inputFrete.value.replace(/\D/g, '');
   if (cep.length > 0) {
     const storedCeps = JSON.parse(localStorage.getItem('ceps')) || [];
     const suggestions = storedCeps.filter(storedCep => storedCep.startsWith(cep));
     displaySuggestions(suggestions);
   }
 });
 
 function displaySuggestions(suggestions) {
   if (suggestionsList) {
     suggestionsList.innerHTML = ''; 
     suggestions.forEach(suggestion => {
       const li = document.createElement('li');
       li.textContent = suggestion;
       li.addEventListener('click', function() {
         cepInput.value = suggestion;
         inputFrete.value = suggestion;
         salvarCep(); 
         buscarEndereco(); 
         contentDropdown.style.display = 'none'; 
       });
       suggestionsList.appendChild(li);
     });
   }
 }
 
 function salvarCep() {
   const cep = cepInput.value.replace(/\D/g, '') || inputFrete.value.replace(/\D/g, '');
   if (cep.length === 8) {
     let storedCeps = JSON.parse(localStorage.getItem('ceps')) || [];
     if (!storedCeps.includes(cep)) {
       storedCeps.push(cep);
       localStorage.setItem('ceps', JSON.stringify(storedCeps));
     }
     localStorage.setItem('cep', cep);
   }
 }
 
 function buscarEndereco() {
   const cep = cepInput.value.replace(/\D/g, '') || inputFrete.value.replace(/\D/g, '');
 
   if (cep.length === 8) {
     const url = `https://viacep.com.br/ws/${cep}/json/`;
 
     fetch(url)
       .then(response => response.json())
       .then(data => {
         if (!data.erro) {
           // Exibe a rua e o bairro
           const localizacao = `${data.logradouro}, ${data.bairro}`;
           document.getElementById('localizacao-texto').textContent = localizacao;
           freteLocalizacao.textContent = localizacao; 
 
           
           atualizarFrete(cep); 
           inputFrete.style.display = 'none'; 
           buttonFrete.style.display = 'none'; 
           freteLocalizacao.style.display = 'inline'; 
         } else {
           document.getElementById('localizacao-texto').textContent = 'Região não encontrada';
           freteLocalizacao.textContent = 'Região não encontrada'; 
           freteLocalizacao.style.display = 'inline'; 
           valorFreteP.textContent = 'Calcular frete e prazo'; 
         }
       })
       .catch(error => {
         console.error('Erro ao buscar o endereço:', error);
         document.getElementById('localizacao-texto').textContent = 'Erro ao buscar a região';
         freteLocalizacao.textContent = 'Erro ao buscar a região'; 
         freteLocalizacao.style.display = 'inline'; 
         valorFreteP.textContent = 'Calcular frete e prazo'; 
       });
   } else {
     document.getElementById('localizacao-texto').textContent = 'CEP inválido';
     freteLocalizacao.textContent = 'CEP inválido'; 
     freteLocalizacao.style.display = 'inline';
     valorFreteP.textContent = 'Calcular frete e prazo'; 
   }
 }
 
 function atualizarFrete(cep) {
   let valorFrete;
   if (cep.startsWith('13')) {
     valorFrete = 6.00; 
   } else if (cep.startsWith('20')) {
     valorFrete = 25.00;
   } else if (cep.startsWith('30')) {
     valorFrete = 20.00;
   } else {
     valorFrete = 30.00; 
   }
 
   valorFreteP.textContent = `Frete: R$ ${valorFrete.toFixed(2)}`;
 }
 
 window.addEventListener('load', function() {
   const cepSalvo = localStorage.getItem('cep');
   if (cepSalvo) {
     cepInput.value = cepSalvo;
     buscarEndereco(); 
   }
 });
 
 const icons = document.querySelectorAll('.pagamentos-span i');
 const subBar = document.querySelector('.sub-barra');
 const boletoDescricao = document.querySelector('.boleto-descricao');
 const pixDescricao = document.querySelector('.pix-descricao');
 const cartaoDescricao = document.querySelector('.cartao-descricao'); 
 const cardModal = document.querySelector('.card-modal');
 

 const largeOffsets = {
     'fa-credit-card': { left: 0, height: 700 },  
     'fa-barcode': { left: 235, height: 300 },    
     'fa-pix': { left: 460, height: 300 }        
 };
 

 const smallOffsets = {
     'fa-credit-card': { left: 0, height: 700 },  
     'fa-barcode': { left: 130, height: 250 },    
     'fa-pix': { left: 261, height: 250 }
 };
 

 const extraSmallOffsets = {
     'fa-credit-card': { left: 0, height: 700 },  
     'fa-barcode': { left: 97, height: 240 },    
     'fa-pix': { left: 200, height: 240 }
 };
 

 function getOffsets() {
     if (window.matchMedia('(max-width: 390px)').matches) {
         return extraSmallOffsets;
     } else if (window.matchMedia('(max-width: 500px)').matches) {
         return smallOffsets;
     } else {
         return largeOffsets;
     }
 }
 
 function updateDescription(iconClass) {
     boletoDescricao.style.display = 'none';
     pixDescricao.style.display = 'none';
     cartaoDescricao.style.display = 'none';
 
     if (iconClass === 'fa-barcode') {
         boletoDescricao.style.display = 'block';
     } else if (iconClass === 'fa-pix') {
         pixDescricao.style.display = 'block'; 
     } else if (iconClass === 'fa-credit-card') {
         cartaoDescricao.style.display = 'block'; 
     }
 
     const offsets = getOffsets();
     const offset = offsets[iconClass] || { left: 0, height: 700 }; 
     subBar.style.left = `${offset.left}px`;
     cardModal.style.height = `${offset.height}px`; 
     subBar.style.backgroundColor = '#FF6F61'; 
 }
 

 document.querySelector('.fa-barcode').classList.add('active');
 updateDescription('fa-barcode');
 
 icons.forEach((icon) => {
     icon.addEventListener('click', function() {
         icons.forEach(i => i.classList.remove('active'));
         this.classList.add('active');
 
         let iconClass;
         if (this.classList.contains('fa-credit-card')) {
             iconClass = 'fa-credit-card';
         } else if (this.classList.contains('fa-barcode')) {
             iconClass = 'fa-barcode';
         } else if (this.classList.contains('fa-pix')) {
             iconClass = 'fa-pix';
         }
 
         updateDescription(iconClass); 
     });
 });
 

 window.addEventListener('resize', function() {
     const activeIcon = document.querySelector('.pagamentos-span i.active');
     if (activeIcon) {
         let iconClass = '';
         if (activeIcon.classList.contains('fa-credit-card')) {
             iconClass = 'fa-credit-card';
         } else if (activeIcon.classList.contains('fa-barcode')) {
             iconClass = 'fa-barcode';
         } else if (activeIcon.classList.contains('fa-pix')) {
             iconClass = 'fa-pix';
         }
         updateDescription(iconClass);
     }
 });
 
 


 
function trocarImagem(novaImagem) {
  const imagemPrincipal = document.getElementById("imagem-principal");
  imagemPrincipal.src = novaImagem;
}


const zoomContainer = document.querySelector('.zoom-container');
const zoomImg = document.querySelector('.zoom-img');

zoomContainer.addEventListener('mousemove', (e) => {
  const { left, top, width, height } = zoomContainer.getBoundingClientRect();
  const x = ((e.clientX - left) / width) * 100; 
  const y = ((e.clientY - top) / height) * 100; 
  zoomImg.style.transformOrigin = `${x}% ${y}%`; 
});























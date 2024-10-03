
 const modal = document.getElementById('modal')
 const openModal = document.getElementById('openModal')
 const cardCompra = document.getElementById('card-compra')
 const overlay = document.getElementById('overlay')
 const openSidebar = document.getElementById('menu-btn')
 const sidebar = document.getElementById('sidebar')
 const closeSidebar = document.getElementById('close-btn')
 const dropdown = document.getElementById('dropdown')
 const dropdownContent = document.getElementById('dropdownContent')

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
       buscarEndereco(); // Realiza a pesquisa
       contentDropdown.style.display = 'none'; // Fecha o dropdown
     }
   }, 400); // Tempo de atraso em milissegundos
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
 
 // Adiciona evento de clique ao botão "OK" do dropdown
 okButton.addEventListener('click', function() {
   salvarCep(); // Salva o CEP no localStorage
   buscarEndereco(); // Realiza a pesquisa
   contentDropdown.style.display = 'none'; // Fecha o dropdown
 });
 
 // Adiciona evento de clique ao botão "OK" da seção de frete
 buttonFrete.addEventListener('click', function() {
   salvarCep(); // Salva o CEP no localStorage
   buscarEndereco(); // Realiza a pesquisa
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
 
 // Adiciona evento para pressionar Enter no campo de frete
 inputFrete.addEventListener('keydown', function(event) {
   if (event.key === 'Enter') {
     event.preventDefault(); // Evita o envio do formulário padrão
     salvarCep(); // Salva o CEP no localStorage
     buscarEndereco(); // Realiza a pesquisa
   }
 });
 

 // Adiciona sugestões ao dropdown
 cepInput.addEventListener('input', function() {
   const cep = cepInput.value.replace(/\D/g, '');
   if (cep.length > 0) {
     const storedCeps = JSON.parse(localStorage.getItem('ceps')) || [];
     const suggestions = storedCeps.filter(storedCep => storedCep.startsWith(cep));
     displaySuggestions(suggestions);
   } else {
     if (suggestionsList) {
       suggestionsList.innerHTML = ''; // Limpa a lista se o campo estiver vazio
     }
   }
 });
 
 // Adiciona sugestões ao campo de frete
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
     suggestionsList.innerHTML = ''; // Limpa a lista de sugestões
     suggestions.forEach(suggestion => {
       const li = document.createElement('li');
       li.textContent = suggestion;
       li.addEventListener('click', function() {
         cepInput.value = suggestion;
         inputFrete.value = suggestion;
         salvarCep(); // Salva o CEP no localStorage
         buscarEndereco(); // Realiza a pesquisa
         contentDropdown.style.display = 'none'; // Fecha o dropdown
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
           freteLocalizacao.textContent = localizacao; // Atualiza o endereço na seção de frete
 
           // Calcula e exibe o valor do frete
           atualizarFrete(cep); // Passa o CEP para a função que calcula o frete
 
           // Atualiza o campo de entrada e o botão
           inputFrete.style.display = 'none'; // Oculta o campo de entrada
           buttonFrete.style.display = 'none'; // Oculta o botão "OK"
           freteLocalizacao.style.display = 'inline'; // Mostra o endereço
         } else {
           document.getElementById('localizacao-texto').textContent = 'Região não encontrada';
           freteLocalizacao.textContent = 'Região não encontrada'; // Atualiza mensagem de erro na seção de frete
           freteLocalizacao.style.display = 'inline'; // Mostra a mensagem de erro
           valorFreteP.textContent = 'Calcular frete e prazo'; // Reseta o texto do parágrafo
         }
       })
       .catch(error => {
         console.error('Erro ao buscar o endereço:', error);
         document.getElementById('localizacao-texto').textContent = 'Erro ao buscar a região';
         freteLocalizacao.textContent = 'Erro ao buscar a região'; // Atualiza mensagem de erro na seção de frete
         freteLocalizacao.style.display = 'inline'; // Mostra a mensagem de erro
         valorFreteP.textContent = 'Calcular frete e prazo'; // Reseta o texto do parágrafo
       });
   } else {
     document.getElementById('localizacao-texto').textContent = 'CEP inválido';
     freteLocalizacao.textContent = 'CEP inválido'; // Atualiza mensagem de CEP inválido na seção de frete
     freteLocalizacao.style.display = 'inline'; // Mostra a mensagem de erro
     valorFreteP.textContent = 'Calcular frete e prazo'; // Reseta o texto do parágrafo
   }
 }
 
 // Função para calcular o frete com base no CEP inserido
 function atualizarFrete(cep) {
   let valorFrete;
 
   // Simulação de valores de frete com base no CEP
   if (cep.startsWith('13')) {
     valorFrete = 6.00; // Frete para a região de São Paulo (exemplo)
   } else if (cep.startsWith('20')) {
     valorFrete = 25.00; // Frete para a região do Rio de Janeiro (exemplo)
   } else if (cep.startsWith('30')) {
     valorFrete = 20.00; // Frete para a região de Minas Gerais (exemplo)
   } else {
     valorFrete = 30.00; // Frete padrão para outras regiões
   }
 
   // Atualiza o valor do frete no elemento HTML
   valorFreteP.textContent = `Frete: R$ ${valorFrete.toFixed(2)}`;
 }
 
 // Inicializa o campo de frete com o CEP salvo, se existir
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
const cardModal = document.querySelector('.card-modal'); // Seleciona o modal para ajustar a altura

const offsets = {
    'fa-credit-card': { left: 0, height: 700 },  // Altura de 700px para o cartão
    'fa-barcode': { left: 235, height: 300 },    // Altura de 300px para o boleto
    'fa-pix': { left: 460, height: 300 }         // Altura de 300px para o Pix
};

// Função para atualizar as descrições, o subBar e a altura da modal
function updateDescription(iconClass) {
    // Ocultar todas as descrições inicialmente
    boletoDescricao.style.display = 'none';
    pixDescricao.style.display = 'none';
    cartaoDescricao.style.display = 'none';

    if (iconClass === 'fa-barcode') {
        boletoDescricao.style.display = 'block'; // Mostra a descrição do boleto
    } else if (iconClass === 'fa-pix') {
        pixDescricao.style.display = 'block'; // Mostra a descrição do Pix
    } else if (iconClass === 'fa-credit-card') {
        cartaoDescricao.style.display = 'block'; // Mostra a descrição do cartão
    }

    // Atualiza o offset da sub-barra e a altura do modal
    const offset = offsets[iconClass] || { left: 0, height: 700 }; 
    subBar.style.left = `${offset.left}px`;
    cardModal.style.height = `${offset.height}px`; // Atualiza a altura da modal
    subBar.style.backgroundColor = '#FF6F61'; // Cor fixa da sub-barra
}

// Definir o boleto como ativo inicialmente
document.querySelector('.fa-barcode').classList.add('active');
updateDescription('fa-barcode'); // Mostrar a descrição do boleto no início

// Adiciona evento de clique aos ícones
icons.forEach((icon) => {
    icon.addEventListener('click', function() {
        // Remove a classe 'active' de todos os ícones
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

        updateDescription(iconClass); // Atualiza a descrição, barra e altura
    });
});


 























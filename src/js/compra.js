
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
 const contentDropdown = document.getElementById('dropdown-content');
 const headerDropdown = document.getElementById('dropdown');
 const okButton = document.getElementById('ok-button');
 const clearButton = document.getElementById('clear-button');
 const cepInput = document.getElementById('cep');
 const inputFrete = document.getElementById('input-frete');
 const buttonFrete = document.getElementById('button-frete');
 const freteLocalizacao = document.getElementById('frete-localizacao');
 const valorFreteP = document.getElementById('valor-frete'); // Elemento para exibir o valor do frete
 const suggestionsList = document.getElementById('suggestions-list'); // Verifique se este ID está correto
 let dropdownDelay;
 let isMouseInside = false;
 
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
   }, 4000); // Tempo de atraso em milissegundos
 }
 
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
 
 // Adiciona evento ao botão "X" para limpar o campo de CEP
 clearButton.addEventListener('click', function() {
   cepInput.value = ''; // Limpa o campo de CEP
   inputFrete.value = ''; // Limpa o campo de frete
   localStorage.removeItem('cep'); // Remove o CEP do localStorage
   document.getElementById('localizacao-texto').textContent = 'Minha Região'; // Reseta o texto da localização
   freteLocalizacao.textContent = 'Minha Região'; // Reseta o texto da localização no frete
   valorFreteP.textContent = ''; // Limpa o valor do frete
   inputFrete.style.display = 'inline-block'; // Mostra o campo de entrada
   buttonFrete.style.display = 'inline-block'; // Mostra o botão "OK"
   freteLocalizacao.style.display = 'none'; // Oculta o endereço
   if (suggestionsList) {
     suggestionsList.innerHTML = ''; // Limpa a lista de sugestões
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
           calcularFrete(cep); // Passa o CEP completo para calcular o frete
 
           // Atualiza o campo de entrada e o botão
           inputFrete.style.display = 'none'; // Oculta o campo de entrada
           buttonFrete.style.display = 'none'; // Oculta o botão "OK"
           freteLocalizacao.style.display = 'inline'; // Mostra o endereço
         } else {
           document.getElementById('localizacao-texto').textContent = 'Região não encontrada';
           freteLocalizacao.textContent = 'Região não encontrada'; // Atualiza mensagem de erro na seção de frete
           freteLocalizacao.style.display = 'inline'; // Mostra a mensagem de erro
           valorFreteP.textContent = ''; // Limpa o valor do frete
         }
       })
       .catch(error => {
         console.error('Erro ao buscar o endereço:', error);
         document.getElementById('localizacao-texto').textContent = 'Erro ao buscar a região';
         freteLocalizacao.textContent = 'Erro ao buscar a região'; // Atualiza mensagem de erro na seção de frete
         freteLocalizacao.style.display = 'inline'; // Mostra a mensagem de erro
         valorFreteP.textContent = ''; // Limpa o valor do frete
       });
   } else {
     document.getElementById('localizacao-texto').textContent = 'CEP inválido';
     freteLocalizacao.textContent = 'CEP inválido'; // Atualiza mensagem de CEP inválido na seção de frete
     freteLocalizacao.style.display = 'inline'; // Mostra a mensagem de erro
     valorFreteP.textContent = ''; // Limpa o valor do frete
   }
 }
 
 // Função para calcular o frete
 function calcularFrete(cep) {
   // Simulação de cálculo de frete com base no CEP
   const tabelaFrete = {
     '01001000': 10.00,
     '02020000': 15.50,
     '03030000': 20.75,
     '13504731': 25.00, // Valor para o CEP 13504731
     // Adicione outros CEPs e valores aqui
   };
 
   const valorFrete = tabelaFrete[cep];
   if (valorFrete) {
     valorFreteP.textContent = `Frete: R$ ${valorFrete.toFixed(2)}`;
   } else {
     valorFreteP.textContent = 'Frete não disponível';
   }
 }
 
 // Inicializa o campo de frete com o CEP salvo, se existir
 function atualizarFrete() {
   const cep = localStorage.getItem('cep');
   if (cep) {
     cepInput.value = cep;
     inputFrete.value = cep;
     buscarEndereco(); // Realiza a pesquisa
   }
 }
 atualizarFrete();
 









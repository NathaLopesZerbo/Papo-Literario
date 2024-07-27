
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
 const cartTotal = document.getElementById('cart-total')
 const openSidebarCarrinho = document.getElementById('openSidebarCarrinho')
 const cartItemsContainer = document.getElementById('itens-carrinho')
 const closeSidebar = document.getElementById('close-btn')


 let cart = [];


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



site.addEventListener('click', function(event){

     let parentButton = event.target.closest('#add-to-cart-btn')

    if(parentButton){   
        const name = parentButton.getAttribute('data-name')
        const image = parentButton.getAttribute('data-image')
        const price = parseFloat(parentButton.getAttribute('data-price'))

        console.log(parentButton)
      
        // Adicionar no Carrinho
        addToCart(name, price, image);
    }

})

function addToCart(name, price, image){

    const existingItem = cart.find(item => item.name === name)

    if(existingItem){
       existingItem.quantity +=1;
    } else{
        cart.push({
        name,
        price,
        image,
        quantity: 1,
    })
}

    updateCarrinho()
}


function updateCarrinho(){
    cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach(item =>{
       const cartItemElement = document.createElement('div');

       cartItemElement.innerHTML = `
            <div class="item-carrinho">

                    <div class="img-titulo-carrinho">
                        <div class="img-item-carrinho">
                            <img src="${item.image}" alt="image-capa-livro">
                        </div>

                        <div class="titulo-item-carrinho">
                            <h1>${item.name}</h1>
                        </div>
                    </div>

                    <p>Qtd: ${item.quantity}</p>

                    <div class="lixeira-valor-livro">
                        <button class = "remove-from-cart-btn" data-name = "${item.name}">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                        <p>Valor: <span class = "valor-item-carrinho"> R$ ${item.price.toFixed(2)}</span></p>
                    </div>

                    <div class="separacao-carrinho"></div>
                </div>
   `

        total += item.price * item.quantity;
        cartItemsContainer.appendChild(cartItemElement)

    })

    cartTotal.textContent = total.toLocaleString('pt-BR',{
        style: 'currency',
        currency: 'BRL'
    });

    cartCounter.innerHTML = cart.length;
}

cartItemsContainer.addEventListener('click', function(event){
    if(event.target.classList.contains("remove-from-cart-btn")){
        const name = event.target.getAttribute('data-name')

        removeItemCart(name);
    }
})

function removeItemCart(name){
    const index = cart.findIndex(item => item.name === name);

    if(index !== -1){
        const item = cart[index];

        if(item.quantity > 1){
            item.quantity -=1;
            updateCarrinho();
            return;
        }
        cart.splice(index,1);
        updateCarrinho();
    }
}




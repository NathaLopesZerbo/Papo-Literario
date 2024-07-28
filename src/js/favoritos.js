
const overlay = document.getElementById('overlay')
const openSidebar = document.getElementById('menu-btn')
const sidebar = document.getElementById('sidebar')
const closeSidebar = document.getElementById('close-btn')
const dropdown = document.getElementById('dropdown')
const cartItemsFavoritos = document.getElementById('item-favoritos')
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



overlay.addEventListener('click', function(event){
   if(event.target === overlay){
       sidebar.classList.remove('active');
       overlay.style.display = "none";
       document.body.classList.remove("no-scroll"); 
   }
})


function updateFavoritos(){
    
   cartItemsFavoritos.innerHTML = '';
   let total = 0;

   favoritos.forEach(itemf => {
       const cartItemElementFavoritos = document.createElement("div");

       cartItemElementFavoritos.innerHTML = `
           <div class = "flex items-center justify-between">
               <div> 
                   <p class = "font-medium">${itemf.nameFavoritos}</p>
                   <p>Qtd: ${itemf.quantidadeFavoritos}</p>
                   <p class = "font-medium mt-2">R$ ${itemf.priceFavoritos.toFixed(2)}</p>
               </div>

               <button class = "bg-gray-400 px-4 py-1 rounded text-white remove-from-cart-btn" data-name = "${itemf.nameFavoritos}">Remover</button>
     
           </div>
       `
       cartItemsFavoritos.appendChild(cartItemElementFavoritos)

   })

}




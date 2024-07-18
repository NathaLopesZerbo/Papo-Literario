$(document).ready(function(){
    $('.menu-btn').click(function(){
        $('.sidebar').addClass('active');
        $('.overlay').addClass("cor");
        document.body.classList.add("no-scroll");
    });
    $('.close-btn').click(function(){
        $('.sidebar').removeClass('active');
        $('.overlay').removeClass("cor");
        document.body.classList.remove("no-scroll");
    })
})

$(document).ready(function(){
    $('.sub-btn').click(function(){
    $(this).next('.sub-menu').slideToggle();
    $(this).find('.dropdown').toggleClass('rotate');
    });
});


 const modal = document.getElementById('modal')
 const openModal = document.getElementById('openModal')
 const closeModal = document.getElementById('closeModal')
 const cardCompra = document.getElementById('card-compra')
 const overlay = document.getElementById('overlay')

 

 openModal.addEventListener('click',function(){
     modal.style.display = "flex";
     overlay.style.display = "flex";
     document.body.classList.add("no-scroll");
 })


 overlay.addEventListener('click', function(event){
     if(event.target === overlay){
         modal.style.display = "none";
         overlay.style.display = "none";
         document.body.classList.remove("no-scroll");
     }
 })



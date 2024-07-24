
 const modal = document.getElementById('modal')
 const openModal = document.getElementById('openModal')
 const cardCompra = document.getElementById('card-compra')
 const overlay = document.getElementById('overlay')
 const openSidebar = document.getElementById('menu-btn')
 const sidebar = document.getElementById('sidebar')
 const dropdown = document.getElementById('dropdown')
 const dropdownContent = document.getElementById('dropdownContent')
 const closeSidebar = document.getElementById('close-btn')

 $(document).ready(function(){
    $('.sub-btn').click(function(){
    $(this).next('.sub-menu').slideToggle();
    $(this).find('.dropdown').toggleClass('rotate');
    });
});


// let timeout;

// function showDropdown() {
//     clearTimeout(timeout);
//     dropdownContent.style.display = 'block';
// }

// dropdown.addEventListener('mouseover', showDropdown);
// dropdown.addEventListener('mouseout', hideDropdown);

// function hideDropdown() {
//     timeout = setTimeout(() => {
//         dropdownContent.style.display = 'none';
//     }, 100);
// }



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
        dropdownOpen.style.display = 'none'
        overlay.style.display = "none";
        document.body.classList.remove("no-scroll"); 
    }
 })





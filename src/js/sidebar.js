
// Abrir menu Sidebar
$(document).ready(function(){
    $('.menu-btn').click(function(){
        $('.sidebar').addClass('active');
        $('.overlay').addClass("cor");
    });
    $('.close-btn').click(function(){
        $('.sidebar').removeClass('active');
        $('.overlay').removeClass("cor");
    })
})


// Dropdown dentro do Sidebar
$(document).ready(function(){
    $('.sub-btn').click(function(){
    $(this).next('.sub-menu').slideToggle();
    $(this).find('.dropdown').toggleClass('rotate');
    });
});

$(document).ready(function(){
    $('.menu-btn').click(function(){
        $(this).find('')
    })
})



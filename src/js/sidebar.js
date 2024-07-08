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





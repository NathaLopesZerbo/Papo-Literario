$(document).ready(function(){
    $('.menu-btn').click(function(){
        $('.sidebar').addClass('active');
        $('.menu-btn').css("visibility", 'visible');
    });
    $('.close-btn').click(function(){
        $('.sidebar').removeClass('active');
        $('.menu-btn').css("visibility", 'visible');
    })
})
const swiper = new Swiper('.slider-wrapper', {
    loop: true,
    grabCursor: true,
    spaceBetween: true,

    navigation: {
      nextEl: '.button-prev',
      prevEl: '.button-next',
    },

    breakpoints: {
       0: {
         slidesPerView:1
       },
       768: {
         slidesPerView:2
       },
       1024: {
         slidesPerView:4
       },
    }
  });
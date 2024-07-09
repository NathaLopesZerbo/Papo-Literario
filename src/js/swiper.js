const swiper = new Swiper('.slider-wrapper', {
    loop: false,
    grabCursor: true,
    spaceBetween: false,

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

  
  const swiperCarrossel = new Swiper('.carrossel', {
    loop: true,

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

  });
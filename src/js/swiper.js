const swiper = new Swiper('.slider-wrapper', {
    loop: false,
    grabCursor: true,
    spaceBetween: 10,

    navigation: {
      nextEl: '.button-prev',
      prevEl: '.button-next',
    },

    breakpoints: {
       0: {
         slidesPerView:1,
       },
       768: {
         slidesPerView:3
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
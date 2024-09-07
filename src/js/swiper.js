const swiperCards = new Swiper('.slider-wrapper', {
  loop: false,
  navigation: {
      nextEl: '.button-prev',
      prevEl: '.button-next',
  },
  autoplay: {
      delay: 4000, // Avança os slides a cada 1 segundo
      disableOnInteraction: false, // Continua mesmo após interação
  },
  slidesPerGroup: 4, // Muda 4 slides a cada transição
  speed: 800, // Transição suave de 800 milissegundos (0.8 segundos)
  breakpoints: {
      0: {
          slidesPerView: 1, // Exibe 1 slide por vez em telas pequenas
      },
      768: {
          slidesPerView: 3, // Exibe 3 slides por vez em telas médias
      },
      1024: {
          slidesPerView: 4, // Exibe 4 slides por vez em telas grandes
      },
  }
});

const swiperCashbacks = new Swiper('.slider-wrapper', {
    loop: false,
    autoplay: {
        delay: 4000, 
        disableOnInteraction: false, 
    },
    slidesPerGroup: 4, 
    speed: 800, 
    breakpoints: {
        0: {
            slidesPerView: 1, 
        },
        768: {
            slidesPerView: 3, 
        },
        1024: {
            slidesPerView: 4, 
        },
    }
  });



  const swiperCarrossel = new Swiper('.carrossel', {
    loop: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    autoplay: {
        delay: 3000, 
        disableOnInteraction: false, 
    },
});



  const carrosseLivros = new Swiper('.mySwiper', {
      navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    breakpoints: {
      0: {
        slidesPerView:3,
      },
      768: {
        slidesPerView:4
      },
      1024: {
        slidesPerView:5
      },
   }

  });


  const carrosselAutores = new Swiper('.mySwiperAutores', {
    autoplay: {
        delay: 5000, // Avança 1 slide a cada 5 segundos
        disableOnInteraction: false, // Continua mesmo após interação
    },
    speed: 800, // Transição suave de 800 milissegundos (0.8 segundos)
    slidesPerGroup: 1, // Muda 1 slide a cada transição
    breakpoints: {
        0: {
            slidesPerView: 3, // Exibe 3 slides por vez em telas pequenas
        },
        768: {
            slidesPerView: 4, // Exibe 4 slides por vez em telas médias
        },
        1024: {
            slidesPerView: 3, // Exibe 3 slides por vez em telas grandes
        },
    }
});





  
const swiperCards = new Swiper('.slider-wrapper', {
  loop: false,
  navigation: {
      nextEl: '.button-prev',
      prevEl: '.button-next',
  },
  autoplay: {
      delay: 4000, 
      disableOnInteraction: false, 
  },
  slidesPerGroup: 4, 
  speed: 800, 
  breakpoints: {
      0: {
          slidesPerView: 3, 
      },
      768: {
          slidesPerView: 4, 
      },
      1024: {
          slidesPerView: 5, 
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
            slidesPerView: 2, 
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
      slidesPerView: 2, // Mostrar dois livros em telas pequenas
      spaceBetween: 10, // Espaço entre os slides
    },
    500: {
      slidesPerView: 2, // Manter dois livros para telas maiores que 500px
      spaceBetween: 20, 
    },
    690: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    971: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    1579: {
      slidesPerView: 4,
      spaceBetween: 30,
    },
    1580: {
      slidesPerView: 5,
      spaceBetween: 30,
    }
  }
});

window.addEventListener('resize', function() {
  carrosseLivros.update(); 
});

  
  
  
  
  


  const carrosselAutores = new Swiper('.mySwiperAutores', {
    autoplay: {
        delay: 5000, 
        disableOnInteraction: false, 
    },
    speed: 800, 
    slidesPerGroup: 1, 
    breakpoints: {
        768: {
            slidesPerView: 1, 
        },
        1024: {
            slidesPerView: 4, 
        },
    }
});





  


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
          spaceBetween: 20,
      },
      768: { 
          slidesPerView: 3, 
          spaceBetween: 10,
      },
      1440: { 
          slidesPerView: 4, 
          spaceBetween: 20,
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
      slidesPerView: 2, 
      spaceBetween: 20,
    },
    500: {
      slidesPerView: 2, 
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
      500: {
        slidesPerView: 1, 
      },
      768: {
          slidesPerView: 2, 
      },
      1024: {
          slidesPerView: 2, 
      },
      1480: {
          slidesPerView: 3, 
      },
  }
});


const carrosselTemas = new Swiper('.mySwiperTemas', {
  breakpoints: {
    500: {
      slidesPerView: 1, 
      spaceBetween:0
    },
    971: {
      slidesPerView: 2,
    },
    1580: {
      slidesPerView: 4,
    }
  }
});
  

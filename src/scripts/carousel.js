if (document.querySelector('[data-carousel]')) {
    
  let carousels = document.querySelectorAll('[data-carousel]');
  carousels.forEach(carousel => {
    if (carousel.querySelector('[data-carousel-btn=prev]') && carousel.querySelector('[data-carousel-btn=next]')) {

      let videos = carousel.closest('[data-carousel-video]').querySelectorAll('[data-video-slide]');

      let prev_button = carousel.querySelector('[data-carousel-btn=prev]');
      let next_button = carousel.querySelector('[data-carousel-btn=next]');
      
      let carousel_container = carousel.querySelector('[data-carousel-container]');
      let slideWidth = carousel_container.offsetWidth;
      let scrollPosition = carousel_container.scrollLeft;
      let currentSlide = Math.round(scrollPosition / slideWidth);
      console.log(currentSlide);
      
      if (carousel.querySelector('[data-carousel-navigation] a') && (carousel_container.querySelectorAll('[data-carousel-slide]').length == carousel.querySelectorAll('[data-carousel-navigation] a').length)) {
        let navigation = carousel.querySelector('[data-carousel-navigation]');
        let navigations = navigation.querySelectorAll('a');
        let navigation_active_color = navigation.getAttribute('data-active-color');
        let navigation_inactive_color = navigation.getAttribute('data-inactive-color');
        next_button.addEventListener('click', () => {
          currentSlide = Math.round(carousel_container.scrollLeft / slideWidth);
          navigations[(currentSlide + 1 + navigations.length) % navigations.length].click();
          // currentSlide = (currentSlide + 1 + navigations.length) % navigations.length;
        });
        prev_button.addEventListener('click', () => {
          currentSlide = Math.round(carousel_container.scrollLeft / slideWidth);
          navigations[(currentSlide - 1 + navigations.length) % navigations.length].click();
          // currentSlide = (currentSlide - 1 + navigations.length) % navigations.length;
        });
        navigations.forEach(navigation => {
          navigation.addEventListener('click', (event) => {
            const slide = document.querySelector(event.target.getAttribute('href'));
            if (!slide) return;
            if (slide.scrollIntoView) {
              event.preventDefault();
              slide.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" })
            }
            navigations.forEach(navigation => {
              navigation.classList.add(navigation_inactive_color);
              navigation.classList.remove(navigation_active_color);
            });
            navigation.classList.remove(navigation_inactive_color);
            navigation.classList.add(navigation_active_color);
          });
        });

        currentSlide = Math.round(carousel_container.scrollLeft / slideWidth);
        carousel_container.addEventListener('scroll', () => {
            newSlide = Math.round(carousel_container.scrollLeft / slideWidth);
            if (newSlide != currentSlide) {
              currentSlide = newSlide;
              navigations.forEach(navigation => {
                navigation.classList.add(navigation_inactive_color);
                navigation.classList.remove(navigation_active_color);
              });
              videos.forEach(video => {
                video.classList.add('opacity-0');
                video.classList.add('-z-20');
              });
              navigations[currentSlide].classList.remove(navigation_inactive_color);
              navigations[currentSlide].classList.add(navigation_active_color);
              videos[currentSlide].classList.remove('-z-20')
              setTimeout(function(){
                videos[currentSlide].classList.remove('opacity-0')
              }, 100);
            }
            
          });

        let lastActivityTime = Date.now();

        function updateActivityTime() {
          lastActivityTime = Date.now();
        }
        
        carousel.addEventListener('mousemove', () => {
          updateActivityTime();
        });

        function checkMouseActivity() {
          let currentTime = Date.now();
          let elapsedTime = currentTime - lastActivityTime;

          if (elapsedTime >= 4000) {
            if ((carousel.getBoundingClientRect().bottom < window.innerHeight) && (carousel.getBoundingClientRect().top > 0)) {
              next_button.click();
            }
          }
        }

        if(carousel.getAttribute('data-carousel-autoplay') == 'true') {
          setInterval(checkMouseActivity, 6500);
        }

        
      } else {
        next_button.addEventListener('click', () => {
          carousel_container.scrollBy(slideWidth, 0);
        });
        prev_button.addEventListener('click', () => {
          carousel_container.scrollBy(-slideWidth, 0);
        });
      }
    }
  })
}
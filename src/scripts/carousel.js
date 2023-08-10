if (document.querySelector('[data-carousel]')) {
    
  let carousels = document.querySelectorAll('[data-carousel]');
  carousels.forEach(carousel => {
    if (carousel.querySelector('[data-carousel-btn=prev]') && carousel.querySelector('[data-carousel-btn=next]')) {
      let prev_button = carousel.querySelector('[data-carousel-btn=prev]');
      let next_button = carousel.querySelector('[data-carousel-btn=next]');
      
      let carousel_container = carousel.querySelector('[data-carousel-container]');
      let slideWidth = carousel_container.offsetWidth;
      let scrollPosition = carousel_container.scrollLeft;
      let currentSlide = Math.round(scrollPosition / slideWidth);
      console.log(currentSlide);
      
      if (carousel.querySelector('[data-carousel-navigation] a') && (carousel_container.querySelectorAll('[data-carousel-slide]').length == carousel.querySelectorAll('[data-carousel-navigation] a').length)) {
        let navigations = carousel.querySelectorAll('[data-carousel-navigation] a');
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
            
            if (slide.scrollIntoViewIfNeeded) {
              event.preventDefault();
              slide.scrollIntoViewIfNeeded();
            } else if (slide.scrollIntoView) {
              event.preventDefault();
              slide.scrollIntoView();
            }
            navigations.forEach(navigation => {
              navigation.classList.add('bg-dark-grey-500');
              navigation.classList.remove('bg-purple-blue-500');
            });
            navigation.classList.remove('bg-dark-grey-500');
            navigation.classList.add('bg-purple-blue-500');
          });
        });

        carousel_container.addEventListener('scroll', () => {
          currentSlide = Math.round(carousel_container.scrollLeft / slideWidth);
          navigations.forEach(navigation => {
            navigation.classList.add('bg-dark-grey-500');
            navigation.classList.remove('bg-purple-blue-500');
          });
          navigations[currentSlide].classList.remove('bg-dark-grey-500');
          navigations[currentSlide].classList.add('bg-purple-blue-500');
        });
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
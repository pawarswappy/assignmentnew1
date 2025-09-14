// ================= CATEGORY STRIP =================
(function () {
  document.querySelectorAll('.category-strip').forEach(strip => {
    const track = strip.querySelector('.strip-track');
    const prev = strip.querySelector('.strip-btn.prev');
    const next = strip.querySelector('.strip-btn.next');

    function step() {
      const card = track.querySelector('.strip-card');
      if (!card) return 300;
      const gap = parseInt(getComputedStyle(track).gap) || 0;
      const w = card.getBoundingClientRect().width + gap;
      // scroll multiple cards depending on screen
      const per = window.innerWidth >= 1200 ? 5 :
        window.innerWidth >= 992 ? 4 :
          window.innerWidth >= 768 ? 3 : 2;
      return w * per;
    }

    function updateButtons() {
      // enable/disable based on current scroll
      const max = track.scrollWidth - track.clientWidth - 1;
      prev.disabled = track.scrollLeft <= 1;
      next.disabled = track.scrollLeft >= max;
    }

    function scrollByDir(dir) {
      track.scrollBy({ left: dir * step(), behavior: 'smooth' });
    }

    prev.addEventListener('click', () => scrollByDir(-1));
    next.addEventListener('click', () => scrollByDir(1));
    track.addEventListener('scroll', updateButtons);
    window.addEventListener('resize', updateButtons);

    // init
    updateButtons();
    window.addEventListener('load', updateButtons);

    // ===== AUTOPLAY =====
    let timer;
    function autoPlay() {
      timer = setInterval(() => {
        const max = track.scrollWidth - track.clientWidth;
        if (track.scrollLeft >= max - 5) {
          track.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          track.scrollBy({ left: step(), behavior: 'smooth' });
        }
      }, 3000);
    }
    function stopPlay() { clearInterval(timer); }
    autoPlay();
    track.addEventListener('mouseenter', stopPlay);
    track.addEventListener('mouseleave', autoPlay);
    track.addEventListener('touchstart', stopPlay);
    track.addEventListener('touchend', autoPlay);
  });
})();


// ================= RESTAURANT SECTION =================
(function () {
  document.querySelectorAll('.restaurant-section').forEach(section => {
    const track = section.querySelector('.restaurant-track');
    const prev = section.querySelector('.rest-btn.prev');
    const next = section.querySelector('.rest-btn.next');

    function step() {
      const card = track.querySelector('.restaurant-card');
      if (!card) return 300;
      const gap = parseInt(getComputedStyle(track).gap) || 0;
      const w = card.getBoundingClientRect().width + gap;
      return w * 1; // scroll 1 card per click
    }

    prev.addEventListener('click', () => track.scrollBy({ left: -step(), behavior: 'smooth' }));
    next.addEventListener('click', () => track.scrollBy({ left: step(), behavior: 'smooth' }));

    // Like button toggle
    track.querySelectorAll('.like-btn').forEach(btn => {
      btn.addEventListener('click', () => btn.classList.toggle('active'));
    });

    // ===== AUTOPLAY =====
    let timer;
    function autoPlay() {
      timer = setInterval(() => {
        const max = track.scrollWidth - track.clientWidth;
        if (track.scrollLeft >= max - 5) {
          track.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          track.scrollBy({ left: step(), behavior: 'smooth' });
        }
      }, 3500);
    }
    function stopPlay() { clearInterval(timer); }
    autoPlay();
    track.addEventListener('mouseenter', stopPlay);
    track.addEventListener('mouseleave', autoPlay);
    track.addEventListener('touchstart', stopPlay);
    track.addEventListener('touchend', autoPlay);
  });
})();


// ================= OFFER SLIDER =================
const slider = document.getElementById('offerSlider');

function getScrollAmount() {
  const card = slider.querySelector('.offer-card');
  if (!card) return 300; // fallback

  const cardWidth = card.getBoundingClientRect().width;
  const style = getComputedStyle(slider);
  const gap = parseInt(style.columnGap || style.gap || 0); // if using gap
  const totalCardWidth = cardWidth + gap;

  // how many cards fit in the viewport
  const visibleCards = Math.floor(slider.clientWidth / totalCardWidth);

  return totalCardWidth * (visibleCards || 1); // at least 1 card
}

function slideLeft() {
  slider.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
}

function slideRight() {
  slider.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
}

// ===== AUTOPLAY =====
(function () {
  let timer;
  function autoPlay() {
    timer = setInterval(() => {
      const max = slider.scrollWidth - slider.clientWidth;
      if (slider.scrollLeft >= max - 5) {
        slider.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        slideRight();
      }
    }, 4000);
  }
  function stopPlay() { clearInterval(timer); }
  autoPlay();
  slider.addEventListener('mouseenter', stopPlay);
  slider.addEventListener('mouseleave', autoPlay);
  slider.addEventListener('touchstart', stopPlay);
  slider.addEventListener('touchend', autoPlay);
})();

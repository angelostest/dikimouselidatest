// Φόρτωση του layout
fetch('partials/layout.html')
  .then(res => res.text())
  .then(html => {
    document.getElementById('layout1').innerHTML = html;

    // Φόρτωση layout JS
    const script = document.createElement('script');
    script.src = 'partials/layout_script.js';
    document.body.appendChild(script);

    // Εισαγωγή content στο main#content
    const main = document.getElementById('content');
    main.innerHTML = `
      <div class="home-intro">
        <h2>Καλωσήρθατε στον κόσμο των Pokémon!</h2>
        <p>Δείτε τα αγαπημένα σας Pokémon σε ένα όμορφο slider.</p>
      </div>
      <section class="poke-slider" aria-label="Pokémon slider">
        <div class="slides-wrapper"></div>
        <button class="prev" aria-label="Previous slide">‹</button>
        <button class="next" aria-label="Next slide">›</button>
        <div class="dots"></div>
      </section>
    `;

    // Αρχικοποίηση slider
    initSlider();
  })
  .catch(err => console.error('Σφάλμα:', err));


// ===================
// Slider JS
function initSlider() {
  const slider = document.querySelector('.poke-slider');
  const wrapper = slider.querySelector('.slides-wrapper');
  const dotsContainer = slider.querySelector('.dots');
  const prevBtn = slider.querySelector('.prev');
  const nextBtn = slider.querySelector('.next');

  const images = [
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png',
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png',
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/133.png'
  ];

  let current = 0;
  const slides = [];
  const dots = [];
  const AUTOPLAY_DELAY = 3500;
  let autoplayInterval = null;

  // Δημιουργία εικόνων & dots
  images.forEach((src, idx) => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = `Pokémon ${idx+1}`;
    if(idx===0) img.classList.add('active');
    wrapper.appendChild(img);
    slides.push(img);

    const dot = document.createElement('button');
    if(idx===0) dot.classList.add('active');
    dot.addEventListener('click', () => goTo(idx));
    dotsContainer.appendChild(dot);
    dots.push(dot);
  });

  function setActive(index, direction='right') {
    if(index===current) return;
    const prev = slides[current];
    const next = slides[index];
    if(direction==='right') next.classList.add('enter-from-right');
    else next.classList.add('enter-from-left');

    prev.classList.remove('active');
    void next.offsetWidth;
    next.classList.add('active');

    setTimeout(()=> {
      next.classList.remove('enter-from-right','enter-from-left');
    },650);

    dots[current].classList.remove('active');
    dots[index].classList.add('active');

    current=index;
  }

  function nextSlide(){ setActive((current+1)%slides.length,'right'); }
  function prevSlide(){ setActive((current-1+slides.length)%slides.length,'left'); }
  function goTo(i){ setActive(i,i>current?'right':'left'); restartAutoplay(); }

  function startAutoplay(){ stopAutoplay(); autoplayInterval=setInterval(nextSlide,AUTOPLAY_DELAY); }
  function stopAutoplay(){ if(autoplayInterval) clearInterval(autoplayInterval); autoplayInterval=null; }
  function restartAutoplay(){ stopAutoplay(); startAutoplay(); }

  nextBtn.addEventListener('click',()=>{ nextSlide(); restartAutoplay(); });
  prevBtn.addEventListener('click',()=>{ prevSlide(); restartAutoplay(); });
  slider.addEventListener('mouseenter', stopAutoplay);
  slider.addEventListener('mouseleave', startAutoplay);
  slider.addEventListener('focusin', stopAutoplay);
  slider.addEventListener('focusout', startAutoplay);

  startAutoplay();
}

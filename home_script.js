// -------------------- Φόρτωση layout --------------------
fetch('partials/layout.html')
  .then(res => res.text())
  .then(html => {
    document.getElementById('layout1').innerHTML = html;

    // Φόρτωση layout JS
    const script = document.createElement('script');
    script.src = 'partials/layout_script.js';
    document.body.appendChild(script);

    // Περιεχόμενο home μέσα στο main#content
    const main = document.getElementById('content');
    main.innerHTML = `
      <h2>Καλωσήρθατε στον κόσμο των Pokémon!</h2>
      <p>Δείτε τα αγαπημένα σας Pokémon σε ένα όμορφο slider:</p>

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
  .catch(err => console.error('Σφάλμα φόρτωσης layout:', err));


// -------------------- Slider JS --------------------
function initSlider() {
  const images = [
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png',
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png',
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/133.png'
  ];

  const slider = document.querySelector('.poke-slider');
  const wrapper = slider.querySelector('.slides-wrapper');
  const dotsContainer = slider.querySelector('.dots');
  const prevBtn = slider.querySelector('.prev');
  const nextBtn = slider.querySelector('.next');

  let current = 0;
  const slides = [];
  const dots = [];
  let autoplay = null;

  // Δημιουργία εικόνων & dots
  images.forEach((src, idx) => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = `Pokémon ${idx+1}`;
    if(idx === 0) img.classList.add('active');
    wrapper.appendChild(img);
    slides.push(img);

    const dot = document.createElement('button');
    if(idx === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goTo(idx));
    dotsContainer.appendChild(dot);
    dots.push(dot);
  });

  // -------------------- Λειτουργίες slider --------------------
  function setActive(idx) {
    if(idx === current) return;
    slides[current].classList.remove('active');
    slides[idx].classList.add('active');
    dots[current].classList.remove('active');
    dots[idx].classList.add('active');
    current = idx;
  }

  function nextSlide() { setActive((current+1) % slides.length); }
  function prevSlide() { setActive((current-1+slides.length) % slides.length); }
  function goTo(i) { setActive(i); restartAutoplay(); }

  function startAutoplay() {
    stopAutoplay();
    autoplay = setInterval(nextSlide, 3500);
  }
  function stopAutoplay() { if(autoplay) clearInterval(autoplay); }
  function restartAutoplay() { stopAutoplay(); startAutoplay(); }

  // -------------------- Events --------------------
  nextBtn.addEventListener('click', () => { nextSlide(); restartAutoplay(); });
  prevBtn.addEventListener('click', () => { prevSlide(); restartAutoplay(); });
  slider.addEventListener('mouseenter', stopAutoplay);
  slider.addEventListener('mouseleave', startAutoplay);

  startAutoplay();
}

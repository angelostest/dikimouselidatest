// Φόρτωση του layout
fetch('partials/layout.html')
  .then(res => res.text())
  .then(html => {
    document.getElementById('layout1').innerHTML = html;

    // Φόρτωση layout JS
    const script = document.createElement('script');
    script.src = 'partials/layout_script.js';
    document.body.appendChild(script);

const main = document.getElementById('content');
fetch('home.html')
  .then(res => res.text())
  .then(html => {
    main.innerHTML = html;

    // Δημιουργούμε τον slider μόνο εδώ
    const sliderContainer = document.getElementById('slider-container');
    const slider = document.createElement('section');
    slider.className = 'poke-slider';
    slider.innerHTML = `
      <div class="slides-wrapper"></div>
      <button class="prev">‹</button>
      <button class="next">›</button>
      <div class="dots"></div>
    `;
    sliderContainer.appendChild(slider);

    initSlider(); // τρέχουμε τη λειτουργία του slider
  });

  .catch(err => console.error('Σφάλμα:', err));


// ===================
// Slider JS
function initSlider() {
  const slider = document.querySelector('.poke-slider');
  const wrapper = slider.querySelector('.slides-wrapper');
  const dotsContainer = slider.querySelector('.dots');
  const prevBtn = slider.querySelector('.prev');
  const nextBtn = slider.querySelector('.next');

  // Καθαρίζουμε τυχόν προηγούμενα slides/dots
  wrapper.innerHTML = '';
  dotsContainer.innerHTML = '';

  const imageSources = [
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png',
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png',
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/133.png'
  ];

  let current = 0;
  const slides = [];
  const dots = [];
  let autoplayInterval = null;
  const AUTOPLAY_DELAY = 3500;

  // Δημιουργία εικόνων και dots
  imageSources.forEach((src, idx) => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = `Pokémon ${idx + 1}`;
    if(idx === 0) img.classList.add('active');
    wrapper.appendChild(img);
    slides.push(img);

    const dot = document.createElement('button');
    if(idx === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goTo(idx));
    dotsContainer.appendChild(dot);
    dots.push(dot);
  });

  function setActive(index, direction='right'){
    if(index === current) return;
    const prev = slides[current];
    const next = slides[index];

    if(direction === 'right') next.classList.add('enter-from-right');
    else next.classList.add('enter-from-left');

    prev.classList.remove('active');
    void next.offsetWidth; // force reflow
    next.classList.add('active');

    setTimeout(() => {
      next.classList.remove('enter-from-right','enter-from-left');
    },650);

    dots[current].classList.remove('active');
    dots[index].classList.add('active');

    current = index;
  }

  function nextSlide(){ setActive((current+1)%slides.length,'right'); }
  function prevSlide(){ setActive((current-1+slides.length)%slides.length,'left'); }
  function goTo(i){
    setActive(i,i>current?'right':'left');
    restartAutoplay();
  }

  function startAutoplay(){
    stopAutoplay();
    autoplayInterval = setInterval(nextSlide,AUTOPLAY_DELAY);
  }
  function stopAutoplay(){
    if(autoplayInterval) clearInterval(autoplayInterval);
    autoplayInterval = null;
  }
  function restartAutoplay(){ stopAutoplay(); startAutoplay(); }

  nextBtn.addEventListener('click',()=>{ nextSlide(); restartAutoplay(); });
  prevBtn.addEventListener('click',()=>{ prevSlide(); restartAutoplay(); });
  slider.addEventListener('mouseenter', stopAutoplay);
  slider.addEventListener('mouseleave', startAutoplay);
  slider.addEventListener('focusin', stopAutoplay);
  slider.addEventListener('focusout', startAutoplay);

  startAutoplay();
}

// ===================
// Προσαρμογή ύψους slider ανάλογα με την πρώτη εικόνα
function adjustSliderHeight(){
  const slider = document.querySelector('.poke-slider');
  const firstImg = slider.querySelector('.slides-wrapper img');
  if(firstImg && firstImg.complete){
    slider.style.height = firstImg.naturalHeight + 'px';
  }
}



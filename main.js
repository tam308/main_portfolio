// Mobile nav toggle
document.querySelector('.nav__toggle').addEventListener('click', function () {
  document.getElementById('navLinks').classList.toggle('is-open');
});
document.querySelectorAll('#navLinks a').forEach(function (a) {
  a.addEventListener('click', function () {
    document.getElementById('navLinks').classList.remove('is-open');
  });
});

// Back to top button
var toTop = document.getElementById('toTop');
if (toTop) {
  window.addEventListener('scroll', function () {
    toTop.classList.toggle('is-visible', window.scrollY > 400);
  });
  toTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Gallery navigation
document.querySelectorAll('.project__gallery').forEach(function (gallery) {
  var track = gallery.querySelector('.gallery__track');
  if (!track) return;
  var imgs = track.querySelectorAll('img');
  if (imgs.length < 2) return;

  gallery.classList.add('has-multi');

  var prev = document.createElement('button');
  prev.type = 'button';
  prev.className = 'gallery__nav gallery__nav--prev';
  prev.setAttribute('aria-label', 'Previous image');
  prev.innerHTML = '&lsaquo;';

  var next = document.createElement('button');
  next.type = 'button';
  next.className = 'gallery__nav gallery__nav--next';
  next.setAttribute('aria-label', 'Next image');
  next.innerHTML = '&rsaquo;';

  var dots = document.createElement('div');
  dots.className = 'gallery__dots';
  imgs.forEach(function (_img, i) {
    var dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'gallery__dot' + (i === 0 ? ' is-active' : '');
    dot.setAttribute('aria-label', 'Show image ' + (i + 1));
    dot.addEventListener('click', function () {
      track.scrollTo({ left: i * track.clientWidth, behavior: 'smooth' });
    });
    dots.appendChild(dot);
  });

  gallery.appendChild(prev);
  gallery.appendChild(next);
  gallery.appendChild(dots);

  prev.addEventListener('click', function () {
    track.scrollBy({ left: -track.clientWidth, behavior: 'smooth' });
  });
  next.addEventListener('click', function () {
    track.scrollBy({ left: track.clientWidth, behavior: 'smooth' });
  });

  var dotEls = dots.querySelectorAll('.gallery__dot');
  track.addEventListener('scroll', function () {
    var idx = Math.round(track.scrollLeft / track.clientWidth);
    dotEls.forEach(function (d, i) {
      d.classList.toggle('is-active', i === idx);
    });
  });
});

// Lightbox: click a gallery image to expand it
(function () {
  var lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.setAttribute('role', 'dialog');
  lightbox.setAttribute('aria-modal', 'true');

  var fullImg = document.createElement('img');
  fullImg.className = 'lightbox__img';
  fullImg.alt = '';

  var close = document.createElement('button');
  close.type = 'button';
  close.className = 'lightbox__close';
  close.setAttribute('aria-label', 'Close image');
  close.innerHTML = '&times;';

  lightbox.appendChild(fullImg);
  lightbox.appendChild(close);
  document.body.appendChild(lightbox);

  function open(src, alt) {
    fullImg.src = src;
    fullImg.alt = alt || '';
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function hide() {
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.gallery__track > img').forEach(function (img) {
    img.addEventListener('click', function () {
      open(img.currentSrc || img.src, img.alt);
    });
  });

  lightbox.addEventListener('click', function (e) {
    if (e.target !== fullImg) hide();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && lightbox.classList.contains('is-open')) hide();
  });
})();

// Reveal sections on scroll
var reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && reveals.length) {
  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });
  reveals.forEach(function (el) { obs.observe(el); });
} else {
  reveals.forEach(function (el) { el.classList.add('is-visible'); });
}

// Animated header
if (typeof FinisherHeader !== 'undefined') {
  new FinisherHeader({
    "count": 35,
    "size": { "min": 5, "max": 120, "pulse": 0.1 },
    "speed": {
      "x": { "min": 0, "max": 0.2 },
      "y": { "min": 0, "max": 0.4 }
    },
    "colors": {
      "background": "#1f2430",
      "particles": ["#ffe960", "#87ddfe", "#8481ff", "#fc7bfc", "#e2ffa5"]
    },
    "blending": "screen",
    "opacity": { "center": 0, "edge": 0.7 },
    "skew": -2,
    "shapes": ["c"]
  });
}

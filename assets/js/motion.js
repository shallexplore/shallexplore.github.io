(function () {
  if (!window.gsap || !window.Lenis) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  gsap.registerPlugin(ScrollTrigger);

  /* Speed controls */
  const REVEAL_DURATION = 0.8;
  const REVEAL_DISTANCE = 40;
  const REVEAL_STAGGER = 0.1;
  const COUNT_DURATION = 1.6;
  const LETTER_STAGGER = 0.05;

  /* Smooth scroll, synced with GSAP */
  const lenis = new Lenis({ lerp: 0.1 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);

  /* Anchor links */
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    const id = a.getAttribute('href');
    if (id.length < 2 && id !== '#top') return;
    a.addEventListener('click', (e) => {
      const target = id === '#top' ? 0 : document.querySelector(id);
      if (target === null) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: -70 });
    });
  });

  /* Hero name: split into letters (screen readers still read the full name) */
  const nameEl = document.querySelector('.hero-name');
  let nameTarget = '.hero-name';
  if (nameEl) {
    const text = nameEl.textContent;
    nameEl.setAttribute('aria-label', text.replace(/\u00a0/g, ' '));
    nameEl.innerHTML =
      '<span style="white-space:nowrap" aria-hidden="true">' +
      Array.from(text)
        .map((c) => {
          const ch = c === ' ' || c === '\u00a0' ? '&nbsp;' : c;
          return '<span class="char" style="display:inline-block">' + ch + '</span>';
        })
        .join('') +
      '</span>';
    nameTarget = nameEl.querySelectorAll('.char');
  }

  /* Hero intro */
  gsap.timeline({ defaults: { ease: 'power3.out' } })
    .from(nameTarget, { y: 50, opacity: 0, duration: 0.8, stagger: LETTER_STAGGER })
    .from('.hero-role', { y: 24, opacity: 0, duration: 0.7 }, '-=0.4')
    .from('.hero-sub', { y: 20, opacity: 0, duration: 0.6 }, '-=0.4')
    .from('.cta-row .btn', { y: 20, opacity: 0, duration: 0.6, stagger: 0.1 }, '-=0.3');

  /* Hero contour parallax */
  gsap.to('.contour-field', {
    yPercent: 20,
    ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
  });

  /* Scroll reveals, staggered in batches */
  const reveal = [
    '.about-lead', '.stat-row li',
    '.work-title', '.work-subhead', '.extra-card',
    '.explore-title', '.pillar',
    '.contact h2', '.contact-sub', '.contact-form'
  ].join(',');

  gsap.set(reveal, { opacity: 0, y: REVEAL_DISTANCE });
  ScrollTrigger.batch(reveal, {
    start: 'top 88%',
    once: true,
    onEnter: (els) =>
      gsap.to(els, {
        opacity: 1, y: 0, duration: REVEAL_DURATION,
        ease: 'power3.out', stagger: REVEAL_STAGGER, overwrite: true
      })
  });

  /* Stat count-up (only numbers; "HK · KTM · UK" is skipped automatically) */
  document.querySelectorAll('.stat-num').forEach((el) => {
    const m = el.textContent.trim().match(/^([\d,]+)(.*)$/);
    if (!m) return;
    const end = parseInt(m[1].replace(/,/g, ''), 10);
    const suffix = m[2];
    const useComma = m[1].includes(',');
    const obj = { v: 0 };
    el.textContent = '0' + suffix;
    ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      once: true,
      onEnter: () =>
        gsap.to(obj, {
          v: end,
          duration: COUNT_DURATION,
          ease: 'power2.out',
          onUpdate: () => {
            const n = Math.round(obj.v);
            el.textContent = (useComma ? n.toLocaleString('en-US') : n) + suffix;
          }
        })
    });
  });

  window.addEventListener('load', () => ScrollTrigger.refresh());
})();
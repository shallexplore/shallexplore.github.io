(function () {
  if (!window.gsap || !window.Lenis) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  gsap.registerPlugin(ScrollTrigger);

  /* Smooth scroll, synced with GSAP */
  const lenis = new Lenis({ lerp: 0.1 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);

  /* Anchor links (Work, Explore, Connect, buttons, skip link) */
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

  /* Hero intro */
  gsap.timeline({ defaults: { ease: 'power3.out' } })
    .from('.hero-name', { y: 40, opacity: 0, duration: 0.9 })
    .from('.hero-role', { y: 24, opacity: 0, duration: 0.7 }, '-=0.5')
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

  gsap.set(reveal, { opacity: 0, y: 40 });
  ScrollTrigger.batch(reveal, {
    start: 'top 88%',
    once: true,
    onEnter: (els) =>
      gsap.to(els, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.1, overwrite: true })
  });

  /* Recalculate after fonts and images load */
  window.addEventListener('load', () => ScrollTrigger.refresh());
})();
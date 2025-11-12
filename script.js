// Modern minimal JS for:
// - Mobile nav toggle
// - Scroll reveal using IntersectionObserver
// - Animate skill bars when visible
// - Simple contact form demo

document.addEventListener('DOMContentLoaded', function () {
  // YEAR in footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // Mobile nav toggle
  const navToggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('nav');
  navToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
  });

  // Smooth reveal + skill animation
  const revealElements = document.querySelectorAll('.reveal');
  const skillFills = document.querySelectorAll('.skill-fill');

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.12
  };

  const onIntersection = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');

        // If this element contains skill bars, animate them
        entry.target.querySelectorAll && entry.target.querySelectorAll('.skill-fill').forEach(fill => {
          const val = parseInt(fill.getAttribute('data-skill'), 10) || 0;
          // set width with a slight delay for nicer cascade
          setTimeout(() => {
            fill.style.width = val + '%';
          }, 120);
        });

        // if the target itself is a skill-fill (when skills in separate nodes)
        if (entry.target.classList && entry.target.classList.contains('skill-fill')) {
          const val = parseInt(entry.target.getAttribute('data-skill'), 10) || 0;
          entry.target.style.width = val + '%';
        }

        // unobserve reveal elements after activated for performance
        observer.unobserve(entry.target);
      }
    });
  };

  const revealObserver = new IntersectionObserver(onIntersection, observerOptions);
  revealElements.forEach(el => revealObserver.observe(el));

  // Also observe skill fills placed outside .reveal wrappers
  skillFills.forEach(fill => revealObserver.observe(fill));

  // Contact form demo handler
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();
      if (!name || !email || !message) {
        alert('Isi semua kolom dulu ya.');
        return;
      }
      // Demo: open mailto with prefilled subject/body (replace with real backend in production)
      const subject = encodeURIComponent('Pesan dari ' + name);
      const body = encodeURIComponent(`Nama: ${name}\nEmail: ${email}\n\n${message}`);
      window.location.href = `mailto:you@example.com?subject=${subject}&body=${body}`;
    });
  }

  // Accessibility: close mobile nav when clicking link
  document.querySelectorAll('#nav a').forEach(link => {
    link.addEventListener('click', () => {
      if (nav.classList.contains('open')) nav.classList.remove('open');
    });
  });
});
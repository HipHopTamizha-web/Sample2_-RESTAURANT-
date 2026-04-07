/* ============================================
   URBAN TANDOOR COLLECTIVE — Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ──────────────────────────────────────────
  // 1. NAVBAR SCROLL EFFECT
  // ──────────────────────────────────────────
  const navbar = document.querySelector('.navbar');

  const handleScroll = () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll();

  // ──────────────────────────────────────────
  // 2. MOBILE NAV TOGGLE
  // ──────────────────────────────────────────
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navLinks.classList.toggle('mobile-open');
      document.body.style.overflow = navLinks.classList.contains('mobile-open') ? 'hidden' : '';
    });

    // Close mobile menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('mobile-open');
        document.body.style.overflow = '';
      });
    });
  }

  // ──────────────────────────────────────────
  // 3. SMOOTH SCROLL FOR NAV LINKS
  // ──────────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ──────────────────────────────────────────
  // 4. MODAL SYSTEM
  // ──────────────────────────────────────────
  function showModal(title, message, icon = '✓') {
    const overlay = document.getElementById('modalOverlay');
    const modalTitle = document.getElementById('modalTitle');
    const modalMessage = document.getElementById('modalMessage');
    const modalIcon = document.getElementById('modalIcon');

    modalTitle.textContent = title;
    modalMessage.textContent = message;
    modalIcon.textContent = icon;
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    const overlay = document.getElementById('modalOverlay');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Close modal
  document.getElementById('modalCloseBtn')?.addEventListener('click', closeModal);
  document.getElementById('modalOverlay')?.addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeModal();
  });

  // ESC to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
      closeLightbox();
    }
  });

  // ──────────────────────────────────────────
  // 5. HERO "BOOK A TABLE" BUTTON
  // ──────────────────────────────────────────
  document.getElementById('heroBookBtn')?.addEventListener('click', () => {
    showModal(
      'Table Reserved Successfully!',
      'We\'ve saved a table for you at Urban Tandoor Collective. See you soon!',
      '🍽️'
    );
  });

  // ──────────────────────────────────────────
  // 6. MENU FILTER TABS
  // ──────────────────────────────────────────
  const filterBtns = document.querySelectorAll('.menu-filter-btn');
  const menuCards = document.querySelectorAll('.menu-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      menuCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = '';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // ──────────────────────────────────────────
  // 7. RESERVATION FORM
  // ──────────────────────────────────────────
  const reservationForm = document.getElementById('reservationForm');
  if (reservationForm) {
    reservationForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Basic validation
      const name = reservationForm.querySelector('#resName').value.trim();
      const phone = reservationForm.querySelector('#resPhone').value.trim();

      if (!name || !phone) {
        showModal(
          'Missing Information',
          'Please fill in at least your name and phone number.',
          '⚠️'
        );
        return;
      }

      showModal(
        'Reservation Confirmed!',
        `Thank you, ${name}! Your table at Urban Tandoor Collective has been reserved. We'll send a confirmation to your phone.`,
        '🎉'
      );

      reservationForm.reset();
    });
  }

  // ──────────────────────────────────────────
  // 8. GALLERY LIGHTBOX
  // ──────────────────────────────────────────
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const galleryItems = document.querySelectorAll('.gallery-item');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (img && lightbox) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeLightbox() {
    if (lightbox) {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  document.querySelector('.lightbox-close')?.addEventListener('click', closeLightbox);
  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // ──────────────────────────────────────────
  // 9. SCROLL REVEAL
  // ──────────────────────────────────────────
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ──────────────────────────────────────────
  // 10. PARALLAX EFFECT ON HERO
  // ──────────────────────────────────────────
  const heroBg = document.querySelector('.hero-bg img');
  if (heroBg) {
    window.addEventListener('scroll', () => {
      const scroll = window.pageYOffset;
      if (scroll < window.innerHeight) {
        heroBg.style.transform = `translateY(${scroll * 0.3}px) scale(1.1)`;
      }
    });
  }

  // ──────────────────────────────────────────
  // 11. NAV RESERVE BUTTON
  // ──────────────────────────────────────────
  document.querySelector('.nav-reserve-btn')?.addEventListener('click', (e) => {
    e.preventDefault();
    const reserveSection = document.getElementById('reservation');
    if (reserveSection) {
      const offset = 80;
      const top = reserveSection.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });

  // ──────────────────────────────────────────
  // 12. SET MINIMUM DATE FOR RESERVATION
  // ──────────────────────────────────────────
  const dateInput = document.getElementById('resDate');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
    dateInput.value = today;
  }

  // ──────────────────────────────────────────
  // 13. COUNTER ANIMATION (About section)
  // ──────────────────────────────────────────
  let counterAnimated = false;
  const counterEl = document.querySelector('.about-float-card .text h4');
  
  if (counterEl) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !counterAnimated) {
          counterAnimated = true;
          animateCounter(counterEl, 0, 8, 2000);
        }
      });
    }, { threshold: 0.5 });

    counterObserver.observe(counterEl);
  }

  function animateCounter(el, start, end, duration) {
    const range = end - start;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(start + range * eased);
      el.textContent = current + '+ Years';
      
      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  // ──────────────────────────────────────────
  // 14. WHATSAPP REDIRECTION MODAL
  // ──────────────────────────────────────────
  document.getElementById('whatsappBtn')?.addEventListener('click', () => {
    showModal(
      'Redirecting to WhatsApp',
      'You are now being redirected to our official WhatsApp channel for reservations and inquiries.',
      '💬'
    );
  });

});

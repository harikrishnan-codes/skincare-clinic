gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================================================
  // 1. MOBILE DRAWER NAVIGATION & SCROLL LOCK
  // ==========================================================================
  const menuToggle = document.getElementById('menuToggle');
  const drawerClose = document.getElementById('drawerClose');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const menuBackdrop = document.getElementById('menuBackdrop');
  const body = document.body;

  function openMenu() {
    if (!mobileDrawer) return;
    mobileDrawer.classList.add('is-open');
    if (menuBackdrop) menuBackdrop.classList.add('is-open');
    if (menuToggle) {
      menuToggle.classList.add('is-active');
      menuToggle.setAttribute('aria-expanded', 'true');
    }
    body.classList.add('nav-locked'); // Freezes background scroll
  }

  function closeMenu() {
    if (!mobileDrawer) return;
    mobileDrawer.classList.remove('is-open');
    if (menuBackdrop) menuBackdrop.classList.remove('is-open');
    if (menuToggle) {
      menuToggle.classList.remove('is-active');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
    body.classList.remove('nav-locked'); // Restores background scroll
  }

  if (menuToggle) {
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = mobileDrawer && mobileDrawer.classList.contains('is-open');
      isOpen ? closeMenu() : openMenu();
    });
  }

  if (drawerClose) {
    drawerClose.addEventListener('click', (e) => {
      e.stopPropagation();
      closeMenu();
    });
  }

  if (menuBackdrop) {
    menuBackdrop.addEventListener('click', closeMenu);
  }

  // Close drawer when any mobile link is clicked
  const mobileLinks = document.querySelectorAll('.mobile-drawer .mobile-link');
  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close drawer with ESC key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer && mobileDrawer.classList.contains('is-open')) {
      closeMenu();
    }
  });

  // ==========================================================================
  // 2. HEADER SHADOW ON SCROLL
  // ==========================================================================
  const header = document.getElementById('siteHeader');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 30) {
        header.classList.add('header-scrolled');
      } else {
        header.classList.remove('header-scrolled');
      }
    }, { passive: true });
  }

  // ==========================================================================
  // 3. UNIFIED PAGE-BASED NAVIGATION HIGHLIGHTER (HEADER & FOOTER)
  // ==========================================================================
  const allNavLinks = document.querySelectorAll(
    '.desktop-nav .nav-link, .mobile-drawer .mobile-link, .footer-links .footer-link'
  );

  // Extract clean current page filename
  let currentPage = window.location.pathname.split('/').pop().split('?')[0].split('#')[0];
  if (!currentPage || currentPage === '' || currentPage === '/') {
    currentPage = 'index.html';
  }

  let hasPageMatch = false;

  allNavLinks.forEach(link => {
    const rawHref = link.getAttribute('href') || '';
    const cleanHref = rawHref.split('/').pop().split('?')[0].split('#')[0];

    // Check if the navigation item matches the current page file
    if (cleanHref === currentPage) {
      link.classList.add('active');
      hasPageMatch = true;
    } else {
      link.classList.remove('active');
    }
  });

  // Fallback if at root or index
  if (!hasPageMatch && (currentPage === 'index.html' || currentPage === '')) {
    allNavLinks.forEach(link => {
      const rawHref = link.getAttribute('href') || '';
      if (rawHref === 'index.html' || rawHref === './' || rawHref === '/') {
        link.classList.add('active');
      }
    });
  }

  // ==========================================================================
  // 4. HERO SECTION GSAP REVEAL
  // ==========================================================================
  if (document.querySelector('.hero-section')) {
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    heroTl
      .from('.hero-pill-badge', { opacity: 0, y: 15, duration: 0.7, delay: 0.1 })
      .from('.hero-title', { opacity: 0, y: 30, duration: 0.9 }, '-=0.4')
      .from('.hero-desc', { opacity: 0, y: 20, duration: 0.7 }, '-=0.5')
      .from('.hero-btn-group .btn', { opacity: 0, y: 15, stagger: 0.12, duration: 0.6 }, '-=0.4')
      .from('.trust-stat', { opacity: 0, y: 15, stagger: 0.1, duration: 0.6 }, '-=0.4')
      .from('.visual-frame', { opacity: 0, scale: 0.95, y: 20, duration: 1, ease: 'expo.out' }, '-=1')
      .from('.floating-glass-card', { opacity: 0, y: 25, stagger: 0.15, duration: 0.7, ease: 'back.out(1.4)' }, '-=0.5');

    if (document.querySelector('.hero-img')) {
      gsap.to('.hero-img', {
        yPercent: 10,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        }
      });
    }
  }

  // ==========================================================================
  // 5. 3D COVERFLOW CAROUSEL
  // ==========================================================================
  const cards = document.querySelectorAll('.coverflow-card');
  const prevBtn = document.getElementById('coverflowPrev');
  const nextBtn = document.getElementById('coverflowNext');
  const dotsContainer = document.getElementById('coverflowDots');

  let currentIndex = 1;
  const totalCards = cards.length;

  if (cards.length > 0 && dotsContainer) {
    dotsContainer.innerHTML = '';
    cards.forEach((_, idx) => {
      const dot = document.createElement('button');
      dot.classList.add('coverflow-dot');
      if (idx === currentIndex) dot.classList.add('active');
      dot.setAttribute('aria-label', `Slide ${idx + 1}`);
      dot.addEventListener('click', () => updateCoverflow(idx));
      dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.coverflow-dot');

    function updateCoverflow(newIndex) {
      currentIndex = (newIndex + totalCards) % totalCards;

      cards.forEach((card, i) => {
        card.className = 'coverflow-card';

        if (i === currentIndex) {
          card.classList.add('active');
        } else if (i === (currentIndex - 1 + totalCards) % totalCards) {
          card.classList.add('prev-1');
        } else if (i === (currentIndex + 1) % totalCards) {
          card.classList.add('next-1');
        } else if (i < currentIndex) {
          card.classList.add('hidden-left');
        } else {
          card.classList.add('hidden-right');
        }
      });

      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentIndex);
      });
    }

    cards.forEach((card, idx) => {
      card.addEventListener('click', () => {
        if (currentIndex !== idx) updateCoverflow(idx);
      });
    });

    if (prevBtn) prevBtn.addEventListener('click', () => updateCoverflow(currentIndex - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => updateCoverflow(currentIndex + 1));

    updateCoverflow(currentIndex);
  }

  // ==========================================================================
  // 6. SPLIT-SCREEN TABS & INTERACTIVE SLIDER
  // ==========================================================================
  const pillarItems = document.querySelectorAll('.pillar-item');
  pillarItems.forEach(item => {
    item.addEventListener('click', () => {
      pillarItems.forEach(p => p.classList.remove('active'));
      item.classList.add('active');
    });
  });

  const sliderContainer = document.getElementById('beforeAfterSlider');
  const sliderBeforeWrap = document.getElementById('sliderBeforeWrap');
  const sliderHandle = document.getElementById('sliderHandle');

  if (sliderContainer && sliderBeforeWrap && sliderHandle) {
    let isSliding = false;

    function handleSlide(clientX) {
      const rect = sliderContainer.getBoundingClientRect();
      let offsetX = clientX - rect.left;

      const minX = rect.width * 0.05;
      const maxX = rect.width * 0.95;
      if (offsetX < minX) offsetX = minX;
      if (offsetX > maxX) offsetX = maxX;

      const percentage = (offsetX / rect.width) * 100;
      sliderBeforeWrap.style.width = `${percentage}%`;
      sliderHandle.style.left = `${percentage}%`;
    }

    sliderContainer.addEventListener('mousedown', (e) => {
      isSliding = true;
      handleSlide(e.clientX);
    });

    window.addEventListener('mouseup', () => { isSliding = false; });
    window.addEventListener('mousemove', (e) => {
      if (isSliding) handleSlide(e.clientX);
    });

    sliderContainer.addEventListener('touchstart', (e) => {
      isSliding = true;
      handleSlide(e.touches[0].clientX);
    }, { passive: true });

    window.addEventListener('touchend', () => { isSliding = false; });
    window.addEventListener('touchmove', (e) => {
      if (isSliding) handleSlide(e.touches[0].clientX);
    }, { passive: true });
  }

  // ==========================================================================
  // 7. SVG MATRIX FILTER SWITCHER
  // ==========================================================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const matrixTargets = document.querySelectorAll('.matrix-target');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterId = btn.dataset.filter;

      matrixTargets.forEach(img => {
        if (filterId === 'none') {
          img.style.filter = 'none';
        } else {
          img.style.filter = `url(#${filterId})`;
        }
      });
    });
  });

  // ==========================================================================
  // 8. MICRO-INTERACTION MORPHING LOGIC
  // ==========================================================================
  const morphTabs = document.querySelectorAll('.morph-tab-btn');
  const morphIndicator = document.getElementById('morphBubbleIndicator');
  const morphPath = document.getElementById('morphPath');
  const chamberConc = document.getElementById('chamberConcentration');
  const chamberPh = document.getElementById('chamberPh');

  const formulaCode = document.getElementById('formulaCode');
  const formulaTitle = document.getElementById('formulaTitle');
  const formulaDesc = document.getElementById('formulaDesc');
  const ing1 = document.getElementById('ing1');
  const ing2 = document.getElementById('ing2');
  const ing3 = document.getElementById('ing3');

  const morphStates = {
    hydrate: {
      path: "M 50,200 C 60,110 130,50 200,60 C 280,70 340,120 350,200 C 360,290 290,340 200,330 C 110,320 40,290 50,200 Z",
      colorStart: "#e8b4b8",
      colorEnd: "#c59b7b",
      conc: "840 mOsm/L",
      ph: "pH 5.4 BALANCED",
      code: "PROTOCOL HY-01",
      title: "Liposomal Hyaluronic Suspension",
      desc: "Combines five molecular weights of fermented non-animal hyaluronic acid with phytoceramides to flood cellular compartments and plump degraded channels.",
      ings: ["Low-MW Hyaluronate (1.8%)", "Snow Fungus Polysaccharide", "Ectoin Barrier Protector"]
    },
    clarify: {
      path: "M 70,170 C 80,70 200,40 270,80 C 330,120 360,230 320,300 C 260,370 140,360 80,300 C 40,240 60,220 70,170 Z",
      colorStart: "#244244",
      colorEnd: "#3d6568",
      conc: "420 mOsm/L",
      ph: "pH 4.8 ACTIVE",
      code: "PROTOCOL CL-02",
      title: "Glycolic & Willow Bark Complex",
      desc: "Buffered alpha and beta-hydroxy fractions micro-dissolve cellular cement within sebaceous canals, preventing acne papules while keeping skin calm.",
      ings: ["Buffered Glycolic Acid (7%)", "Organic Willow Salicin", "Centella Asiatica Extract"]
    },
    renew: {
      path: "M 90,200 C 80,100 160,60 230,70 C 310,80 340,160 320,240 C 300,320 220,350 150,330 C 70,300 100,270 90,200 Z",
      colorStart: "#c59b7b",
      colorEnd: "#e8b4b8",
      conc: "980 mOsm/L",
      ph: "pH 5.8 RESTORATIVE",
      code: "PROTOCOL RN-03",
      title: "Polynucleotide Matrix Booster",
      desc: "High-density peptide fragments derived from marine bio-technology trigger neo-collagenesis and tissue regeneration along deep wrinkle lines.",
      ings: ["PDRN Bio-Stimulator (2.5%)", "Copper Tripeptide-1", "Bio-Placental Growth Factors"]
    }
  };

  function updateIndicator(tab) {
    if (!morphIndicator || !tab) return;
    morphIndicator.style.width = `${tab.offsetWidth}px`;
    morphIndicator.style.transform = `translateX(${tab.offsetLeft - 6}px)`;
  }

  morphTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      morphTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      updateIndicator(tab);

      const target = tab.dataset.formula;
      const data = morphStates[target];

      if (morphPath) morphPath.setAttribute('d', data.path);

      const grad1 = document.querySelector('.gradient-stop-1');
      const grad2 = document.querySelector('.gradient-stop-2');
      if (grad1 && grad2) {
        grad1.setAttribute('stop-color', data.colorStart);
        grad2.setAttribute('stop-color', data.colorEnd);
      }

      if (chamberConc) chamberConc.textContent = data.conc;
      if (chamberPh) chamberPh.textContent = data.ph;
      if (formulaCode) formulaCode.textContent = data.code;
      if (formulaTitle) formulaTitle.textContent = data.title;
      if (formulaDesc) formulaDesc.textContent = data.desc;
      if (ing1) ing1.textContent = data.ings[0];
      if (ing2) ing2.textContent = data.ings[1];
      if (ing3) ing3.textContent = data.ings[2];
    });
  });

  const initialActive = document.querySelector('.morph-tab-btn.active');
  if (initialActive) {
    setTimeout(() => updateIndicator(initialActive), 150);
  }

  window.addEventListener('resize', () => {
    const active = document.querySelector('.morph-tab-btn.active');
    if (active) updateIndicator(active);
  });

  const actionBtn = document.getElementById('morphActionBtn');
  if (actionBtn) {
    actionBtn.addEventListener('click', () => {
      actionBtn.classList.add('state-loading');

      setTimeout(() => {
        actionBtn.classList.remove('state-loading');
        actionBtn.classList.add('state-success');

        setTimeout(() => {
          actionBtn.classList.remove('state-success');
        }, 4000);
      }, 1600);
    });
  }

  // ==========================================================================
  // 9. TESTIMONIALS CAROUSEL
  // ==========================================================================
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  const prevTestimonialBtn = document.getElementById('prevTestimonial');
  const nextTestimonialBtn = document.getElementById('nextTestimonial');
  const testimonialDotsContainer = document.getElementById('testimonialDots');
  const carouselContainer = document.getElementById('testimonialCarousel');

  let currentTestimonial = 0;
  const totalTestimonials = testimonialCards.length;
  let testimonialTimer = null;

  if (totalTestimonials > 0 && testimonialDotsContainer) {
    testimonialDotsContainer.innerHTML = '';
    testimonialCards.forEach((_, idx) => {
      const dot = document.createElement('button');
      dot.classList.add('testimonial-dot');
      if (idx === 0) dot.classList.add('active');
      dot.setAttribute('aria-label', `Go to review ${idx + 1}`);
      dot.addEventListener('click', () => {
        showTestimonial(idx);
        restartTimer();
      });
      testimonialDotsContainer.appendChild(dot);
    });

    const testDots = document.querySelectorAll('.testimonial-dot');

    function showTestimonial(index) {
      currentTestimonial = (index + totalTestimonials) % totalTestimonials;

      testimonialCards.forEach((card, idx) => {
        card.classList.toggle('active', idx === currentTestimonial);
      });

      testDots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentTestimonial);
      });
    }

    if (prevTestimonialBtn) {
      prevTestimonialBtn.addEventListener('click', () => {
        showTestimonial(currentTestimonial - 1);
        restartTimer();
      });
    }

    if (nextTestimonialBtn) {
      nextTestimonialBtn.addEventListener('click', () => {
        showTestimonial(currentTestimonial + 1);
        restartTimer();
      });
    }

    function startTimer() {
      testimonialTimer = setInterval(() => {
        showTestimonial(currentTestimonial + 1);
      }, 6500);
    }

    function stopTimer() {
      if (testimonialTimer) clearInterval(testimonialTimer);
    }

    function restartTimer() {
      stopTimer();
      startTimer();
    }

    if (carouselContainer) {
      carouselContainer.addEventListener('mouseenter', stopTimer);
      carouselContainer.addEventListener('mouseleave', startTimer);
    }

    startTimer();
  }

  // ==========================================================================
  // 10. FAQ ACCORDION INTERACTION
  // ==========================================================================
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    if (!trigger) return;

    trigger.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        const otherTrigger = otherItem.querySelector('.faq-trigger');
        if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
      });

      if (!isActive) {
        item.classList.add('active');
        trigger.setAttribute('aria-expanded', 'true');
      } else {
        trigger.setAttribute('aria-expanded', 'false');
      }

      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 460);
    });
  });

  // ==========================================================================
  // 11. FINAL CTA BOOKING FORM VALIDATION & DROPDOWN
  // ==========================================================================
  const form = document.getElementById('ctaBookingForm');
  const nameInput = document.getElementById('ctaName');
  const phoneInput = document.getElementById('ctaPhone');
  const submitBtn = document.getElementById('ctaSubmitBtn');

  const nameGroup = document.getElementById('nameGroup');
  const phoneGroup = document.getElementById('phoneGroup');
  const concernGroup = document.getElementById('concernGroup');

  const customDropdown = document.getElementById('customDropdown');
  const dropdownTrigger = document.getElementById('dropdownTrigger');
  const selectedText = document.getElementById('selectedText');
  const dropdownItems = document.querySelectorAll('.dropdown-item');
  const selectedConcernInput = document.getElementById('selectedConcern');

  if (nameInput) {
    nameInput.addEventListener('input', () => {
      nameInput.value = nameInput.value.replace(/[^A-Za-z\s]/g, '');
      if (nameInput.value.trim().length >= 2) {
        nameGroup.classList.remove('has-error');
      }
    });
  }

  if (phoneInput) {
    phoneInput.addEventListener('input', () => {
      phoneInput.value = phoneInput.value.replace(/[^0-9]/g, '');
      if (phoneInput.value.trim().length === 10) {
        phoneGroup.classList.remove('has-error');
      }
    });
  }

  if (customDropdown && dropdownTrigger) {
    function toggleDropdown(state) {
      const open = state !== undefined ? state : !customDropdown.classList.contains('is-open');
      customDropdown.classList.toggle('is-open', open);
      dropdownTrigger.setAttribute('aria-expanded', open ? 'true' : 'false');
    }

    dropdownTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleDropdown();
    });

    dropdownItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        const targetPage = item.dataset.value;
        const textLabel = item.querySelector('span').textContent;

        selectedConcernInput.value = targetPage;
        selectedText.textContent = textLabel;
        dropdownTrigger.classList.add('has-value');

        dropdownItems.forEach(i => i.classList.remove('is-selected'));
        item.classList.add('is-selected');

        concernGroup.classList.remove('has-error');
        toggleDropdown(false);
      });
    });

    document.addEventListener('click', (e) => {
      if (!customDropdown.contains(e.target)) {
        toggleDropdown(false);
      }
    });
  }

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      let isValid = true;

      const nameVal = nameInput.value.trim();
      const namePattern = /^[A-Za-z\s]{2,50}$/;
      if (!namePattern.test(nameVal)) {
        nameGroup.classList.add('has-error');
        isValid = false;
      } else {
        nameGroup.classList.remove('has-error');
      }

      const phoneVal = phoneInput.value.trim();
      const phonePattern = /^[0-9]{10}$/;
      if (!phonePattern.test(phoneVal)) {
        phoneGroup.classList.add('has-error');
        isValid = false;
      } else {
        phoneGroup.classList.remove('has-error');
      }

      const targetPage = selectedConcernInput.value.trim();
      if (!targetPage) {
        concernGroup.classList.add('has-error');
        isValid = false;
      } else {
        concernGroup.classList.remove('has-error');
      }

      if (!isValid) return;

      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <i class="fa-solid fa-circle-notch fa-spin"></i>
        <span>Routing Consultation...</span>
      `;

      try {
        const response = await fetch(targetPage, { method: 'HEAD' });
        if (response.ok) {
          window.location.href = targetPage;
        } else {
          window.location.href = 'error.html';
        }
      } catch (err) {
        window.location.href = 'error.html';
      }
    });
  }

  ScrollTrigger.refresh();
});